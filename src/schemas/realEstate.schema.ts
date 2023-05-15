import { z } from "zod";

import {
  createSchemaAddressData,
  returnSchemaAddressData,
} from "./addresses.schema";
import { returnSchemaCategoryData } from "./category.schema";

export const createSchemaRealEstateData = z.object({
  value: z.number().or(z.string()),
  size: z.number().int().positive(),
  sold: z.boolean().optional().default(false),
  address: createSchemaAddressData,
  categoryId: z.number().optional().nullish(),
});

export const returnSchemaRealEstateData = createSchemaRealEstateData
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: returnSchemaAddressData,
    category: returnSchemaCategoryData,
  })
  .omit({ categoryId: true });
