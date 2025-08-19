import { z } from "zod";

export const workflowInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
});

export const agentsUpdateSchema = workflowInsertSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
});
