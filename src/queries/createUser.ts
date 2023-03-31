import axios from "axios";
import { SignupFormSchemaType } from "@/types/signupFormSchema";
import { getError } from "./errors";

export const createUser = async (data: SignupFormSchemaType) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/register`,
      data
    );
    return response.data;
  } catch (error: any) {
    getError(error);
  }
};
