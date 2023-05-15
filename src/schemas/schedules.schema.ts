import { z } from "zod";

const createSchemaScheduleData = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

const returnSchemaScheduleData = createSchemaScheduleData.extend({
  id: z.number(),
  userId: z.number(),
});

export { createSchemaScheduleData, returnSchemaScheduleData };
