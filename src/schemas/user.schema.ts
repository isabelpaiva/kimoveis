import { z } from "zod";

const createSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z
    .string()
    .min(4, "Password must contain at least 4 characters")
    .max(120),
  admin: z.boolean().optional().default(false),
});

const returnSchema = createSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
    isActive: z.boolean(),
  })
  .omit({ password: true });

const allSchema = returnSchema.array();

const updateSchema = createSchema.partial().omit({ admin: true });

export { createSchema, returnSchema, allSchema, updateSchema };
