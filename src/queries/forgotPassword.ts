import axios from "axios";
import { getError } from "./errors";

export const forgotPassword = async (data: any) => {
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
