import { z } from "zod";

export const rangeSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  key: z.string().optional(),
});

export type RangeSchemaType = z.infer<typeof rangeSchema>;
