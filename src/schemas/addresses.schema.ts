import { z } from "zod";

const createSchemaAddressData = z.object({
  street: z.string(),
  zipCode: z.string().max(8),
  number: z.string().nullish(),
  city: z.string(),
  state: z.string().max(2),
});

const returnSchemaAddressData = createSchemaAddressData.extend({
  id: z.number(),
});

export { createSchemaAddressData, returnSchemaAddressData };
