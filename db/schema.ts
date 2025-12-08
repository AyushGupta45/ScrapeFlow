import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { stat } from "fs";
import { nanoid } from "nanoid";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const credentials = pgTable("credentials", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  value: text("value").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const workflowStatus = pgEnum("workflow_status", ["draft", "published"]);
export const workflowExecutionStatus = pgEnum("workflow_execution_status", [
  "PENDING",
  "RUNNING",
  "COMPLETED",
  "FAILED",
]);
export const executionPhaseStatus = pgEnum("execution_phase_status", [
  "CREATED",
  "PENDING",
  "RUNNING",
  "COMPLETED",
  "FAILED",
]);

export const executionTrigger = pgEnum("execution_trigger", [
  "MANUAL",
  "SCHEDULED",
]);

export const workflow = pgTable("workflow", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  definition: text("definition").notNull(),
  executionPlan: text("execution_plan"),
  cron: text("cron"),
  status: workflowStatus("status").notNull(),
  lastRunAt: timestamp("last_run_at"),
  lastRunId: text("last_run_id"),
  lastRunStatus: text("last_run_status"),
  nextRunAt: timestamp("next_run_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const workflowExecution = pgTable("workflow_execution", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  workflowId: text("workflow_id")
    .notNull()
    .references(() => workflow.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  trigger: executionTrigger("trigger").notNull(),
  status: workflowExecutionStatus("status").notNull(),
  definition: text("definition").default("{}"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
});

export const executionPhase = pgTable("execution_phase", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  workflowExecutionId: text("workflow_execution_id")
    .notNull()
    .references(() => workflowExecution.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: executionPhaseStatus("status").notNull(),
  number: integer("number").notNull(),
  node: text("node").notNull(),
  name: text("name").notNull(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  inputs: text("inputs"),
  outputs: text("outputs"),
});

export const executionLog = pgTable("execution_log", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  logLevel: text("log_level").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  executionPhaseId: text("execution_phase_id")
    .notNull()
    .references(() => executionPhase.id, { onDelete: "cascade" }),
});

// export const workflowRelations = relations(workflow, ({ many }) => ({
//   executions: many(workflowExecution),
// }));

// export const workflowExecutionRelations = relations(
//   workflowExecution,
//   ({ one, many }) => ({
//     workflow: one(workflow, {
//       fields: [workflowExecution.workflowId],
//       references: [workflow.id],
//     }),
//     phases: many(executionPhase),
//   })
// );

// export const executionPhaseRelations = relations(
//   executionPhase,
//   ({ one, many }) => ({
//     execution: one(workflowExecution, {
//       fields: [executionPhase.workflowExecutionId],
//       references: [workflowExecution.id],
//     }),
//     logs: many(executionLog),
//   })
// );

// export const executionLogRelations = relations(executionLog, ({ one }) => ({
//   executionPhase: one(executionPhase, {
//     fields: [executionLog.executionPhaseId],
//     references: [executionPhase.id],
//   }),
// }));

// export const workflow = pgTable("workflow", {
//   id: text("id")
//     .primaryKey()
//     .$defaultFn(() => nanoid()),
//   userId: text("user_id")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),
//   name: text("name").notNull(),
//   description: text("description"),
//   definition: text("definition").notNull(),

//   // These were missing before:
//   executionPlan: text("execution_plan"),
//   cron: text("cron"),
//   status: text("status").notNull(), // You can also use an Enum here if you want

//   // Run History & Scheduling
//   lastRunAt: timestamp("last_run_at"),
//   lastRunId: text("last_run_id"),
//   lastRunStatus: text("last_run_status"),
//   nextRunAt: timestamp("next_run_at"),

//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// export const workflowRelations = relations(workflow, ({ many }) => ({
//   executions: many(WorkflowExecution),
// }));

// export const WorkflowExecution = pgTable("workflow_execution", {
//   id: text("id")
//     .primaryKey()
//     .$defaultFn(() => nanoid()),
//   workflowId: text("workflow_id")
//     .notNull()
//     .references(() => workflow.id, { onDelete: "cascade" }),
//   userId: text("user_id"),
//   status: text("status").notNull(),
//   definition: text("definition").default("{}"),
//   trigger: text("trigger").notNull(),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   startedAt: timestamp("started_at"),
//   completedAt: timestamp("completed_at"),
// });

// export const workflowExecutionRelations = relations(
//   WorkflowExecution,
//   ({ one, many }) => ({
//     workflow: one(workflow, {
//       fields: [WorkflowExecution.workflowId],
//       references: [workflow.id],
//     }),
//     phases: many(ExecutionPhase),
//   })
// );

// export const ExecutionPhase = pgTable("execution_phase", {
//   id: text("id")
//     .primaryKey()
//     .$defaultFn(() => nanoid()),
//   workflowExecutionId: text("workflow_execution_id")
//     .notNull()
//     .references(() => WorkflowExecution.id, { onDelete: "cascade" }),
//   userId: text("user_id"),
//   status: text("status").notNull(),
//   number: integer("number").notNull(),
//   node: text("node").notNull(),
//   name: text("name").notNull(),
//   startedAt: timestamp("started_at"),
//   completedAt: timestamp("completed_at"),
//   inputs: text("inputs"),
//   outputs: text("outputs"),
// });

// export const executionPhaseRelations = relations(ExecutionPhase, ({ one }) => ({
//   execution: one(WorkflowExecution, {
//     fields: [ExecutionPhase.workflowExecutionId],
//     references: [WorkflowExecution.id],
//   }),
// }));
