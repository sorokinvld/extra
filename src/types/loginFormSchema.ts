import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  remember: z.boolean().default(false),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
