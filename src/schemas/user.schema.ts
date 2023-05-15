import { z } from "zod";

export const createSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z
    .string()
    .min(4, "Password must contain at least 4 characters")
    .max(120),
  admin: z.boolean().optional().default(false),
});

export const returnSchema = createSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
    isActive: z.boolean(),
  })
  .omit({ password: true });

export const allSchema = returnSchema.array();

export const updateSchema = createSchema.partial().omit({ admin: true });

