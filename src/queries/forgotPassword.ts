import axios from "axios";
import { getError } from "./errors";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const forgotPassword = async (data: ForgotPasswordSchema) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgotpassword`,
      data
    );
    return response.data;
  } catch (error: any) {
    getError(error);
  }
};
