import { z } from "zod";

const defaultDate = Intl.DateTimeFormat("eu", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

export const searchFormSchema = z.object({
  destination: z.string().min(1),
  startDate: z.string().default(defaultDate),
  endDate: z.date().optional(),
  adults: z.string().min(1),
  children: z.string().optional(),
  rooms: z.string().min(1),
});

export type SearchFormSchemaType = z.infer<typeof searchFormSchema>;
