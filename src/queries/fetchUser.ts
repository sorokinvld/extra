import axios, { AxiosResponse } from "axios";
import { getError } from "./errors";

export type QueryResponse<T> = [error: string | null, data: T | null];

export const refreshTokens = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sessions/refresh`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error: any) {
    return getError(error);
  }
};

const handleRequest = async (
  request: () => Promise<AxiosResponse>
): Promise<AxiosResponse> => {
  try {
    return await request();
  } catch (error: any) {
    if (error?.response?.status == 403) {
      try {
        try {
          const res = await refreshTokens();
          if (res != 404) {
            return await request();
          }
        } catch (error: any) {
          getError(error);
        }
      } catch (innerError: any) {
        throw getError(innerError);
      }
    }

    throw getError(error);
  }
};

export const fetchUser = async () => {
  try {
    const request = () =>
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
        withCredentials: true,
      });
    const { data } = await handleRequest(request);
    return [null, data];
  } catch (error: any) {
    return [error, null];
  }
};
