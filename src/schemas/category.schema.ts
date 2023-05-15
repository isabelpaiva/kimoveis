import { z } from "zod";

const createSchemaCategoryData = z.object({
  name: z.string(),
});

const returnSchemaCategoryData = createSchemaCategoryData.extend({
  id: z.number(),
});

const allSchemaCategoryData = returnSchemaCategoryData.array();

export {
  createSchemaCategoryData,
  returnSchemaCategoryData,
  allSchemaCategoryData,
};
