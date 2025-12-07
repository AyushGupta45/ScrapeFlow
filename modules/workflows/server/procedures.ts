import { db } from "@/db";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { executionPhase, workflow, workflowExecution } from "@/db/schema";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constants";
import { workflowInsertSchema, workflowUpdateSchema } from "../schema";

import {
  TaskType,
  WorkflowDefinition,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowStatus,
  ExecutionPhaseStatus,
  ExecutionTrigger,
} from "../types";
import { CreateFlowNode } from "../ui/components/canvas_nodes/create-node-flow";
import { FlowToExecutionPlan } from "../lib/execution-plan";
import { TaskRegistry } from "../ui/tasks/registry";

export const workflowsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(workflowInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const existing = await db
        .select()
        .from(workflow)
        .where(
          and(
            eq(workflow.userId, ctx.auth.user.id),
            eq(workflow.name, input.name)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You already have a workflow with this name",
        });
      }

      const initialDefinition: WorkflowDefinition = {
        nodes: [],
        edges: [],
      };

      initialDefinition.nodes.push(
        CreateFlowNode({ nodetype: TaskType.LAUNCH_BROWSER })
      );

      const [createdWorkflow] = await db
        .insert(workflow)
        .values({
          name: input.name,
          description: input.description,
          userId: ctx.auth.user.id,
          definition: JSON.stringify(initialDefinition),
          status: WorkflowStatus.DRAFT,
        })
        .returning();

      return createdWorkflow;
    }),
  update: protectedProcedure
    .input(workflowUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const [updatedWorkflow] = await db
        .update(workflow)
        .set(input)
        .where(
          and(eq(workflow.id, input.id), eq(workflow.userId, ctx.auth.user.id))
        )
        .returning();

      if (!updatedWorkflow) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workflow not found",
        });
      }

      return updatedWorkflow;
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const data = await db
        .select(getTableColumns(workflow))
        .from(workflow)
        .where(
          and(eq(workflow.id, input.id), eq(workflow.userId, ctx.auth.user.id))
        )
        .limit(1);

      if (!data.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workflow not found",
        });
      }

      return data[0];
    }),

  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize } = input;

      const data = await db
        .select(getTableColumns(workflow))
        .from(workflow)
        .where(eq(workflow.userId, ctx.auth.user.id))
        .orderBy(desc(workflow.createdAt), desc(workflow.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const [total] = await db
        .select({ count: count() })
        .from(workflow)
        .where(eq(workflow.userId, ctx.auth.user.id));

      const totalPages = Math.ceil(total.count / pageSize);

      return {
        items: data,
        total: total.count,
        totalPages,
      };
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const [removedWorkflow] = await db
        .delete(workflow)
        .where(
          and(eq(workflow.id, input.id), eq(workflow.userId, ctx.auth.user.id))
        )
        .returning();

      if (!removedWorkflow) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workflow not found",
        });
      }

      return removedWorkflow;
    }),

  run: protectedProcedure
    .input(
      z.object({
        workflowId: z.string(),
        flowDefinition: z.string().optional(),
      })
    )

    .mutation(async ({ input, ctx }) => {
      if (!input.workflowId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workflow ID is required",
        });
      }

      const [workflowToRun] = await db
        .select()
        .from(workflow)
        .where(
          and(
            eq(workflow.id, input.workflowId),
            eq(workflow.userId, ctx.auth.user.id)
          )
        )
        .limit(1);

      if (!workflowToRun) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workflow not found",
        });
      }

      let executionPlan: WorkflowExecutionPlan;

      if (!input.flowDefinition) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Flow definition is not defined",
        });
      }

      const flow = JSON.parse(input.flowDefinition);
      const result = FlowToExecutionPlan(flow.nodes, flow.edges);
      if (result.error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Flow definition is not valid",
        });
      }
      if (!result.executionPlan) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No execution plan generated",
        });
      }

      executionPlan = result.executionPlan;

      // 1. Insert execution
      const [workflow_execution] = await db
        .insert(workflowExecution)
        .values({
          workflowId: workflowToRun.id,
          userId: ctx.auth.user.id,
          status: WorkflowExecutionStatus.PENDING,
          startedAt: new Date(),
          trigger: ExecutionTrigger.MANUAL,
          // definition: workflowDefinition,
        })
        .returning();

      // 2. Prepare phases data
      const execution_phase = await db
        .insert(executionPhase)
        .values(
          executionPlan.flatMap((phase) =>
            phase.nodes.map((node) => ({
              workflowExecutionId: workflow_execution.id,
              userId: ctx.auth.user.id,
              status: ExecutionPhaseStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            }))
          )
        )
        .returning();

      return {
        ...workflow_execution,
        execution_phase,
      };
    }),
});
