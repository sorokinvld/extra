import axios from "axios";
import { getError } from "./errors";

export const getHotels = async (
  setHotels: (arg0: any) => void,
  destination: string | string[] | undefined,
  startDate: string | string[] | undefined,
  endDate: string | string[] | undefined,
  adults: string | string[] | undefined,
  children: string | string[] | undefined,
  setLoading: (arg0: boolean) => void
) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/Hotels?page=1&search=${destination}&start_date=${startDate}&end_date=${endDate}&adult=${adults}&child=${children}`
    );
    setHotels(res.data);
    setLoading(false);
  } catch (error: any) {
    console.log(getError(error));
  }
};
