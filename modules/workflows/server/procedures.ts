import { db } from "@/db";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { workflow } from "@/db/schema";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constants";
import { workflowInsertSchema } from "../schema";

export const workflowsRouter = createTRPCRouter({
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

      const [createdWorkflow] = await db
        .insert(workflow)
        .values({
          name: input.name,
          description: input.description,
          userId: ctx.auth.user.id,
          definition: "{}",
          status: "draft",
        })
        .returning();

      return createdWorkflow;
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
});
