import { LoginFormSchemaType } from "./../types/loginFormSchema";
import axios from "axios";
import { getError } from "./errors";

export const loginUser = async (data: LoginFormSchemaType) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sessions`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    getError(error);
  }
};
