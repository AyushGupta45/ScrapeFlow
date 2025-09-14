import { z } from "zod";

export const workflowInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().nullable().optional(),
});

export const workflowUpdateSchema = workflowInsertSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
  definition: z.string().min(1, { message: "Definition is required" }),
});
