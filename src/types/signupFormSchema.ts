import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input/input";

export const signupFormSchema = z.object({
  username: z.string().min(5).max(14),
  email: z.string().email(),
  password: z.string().min(8),
  country: z.string().min(1),
  phone: z.string().refine((value: string) => {
    if (value != null) {
      return isValidPhoneNumber(value);
    } else {
      return false;
    }
  }),
});

export type SignupFormSchemaType = z.infer<typeof signupFormSchema>;
