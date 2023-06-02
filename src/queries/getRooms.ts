import axios from "axios";
import { getError } from "./errors";

export const getRooms = async (
  setRooms: (arg0: any) => void,
  startDate: string | string[] | undefined,
  endDate: string | string[] | undefined,
  adults: string | string[] | undefined,
  children: string | string[] | undefined,
  hotelId: string,
  setLoading: (arg0: boolean) => void,
  setError: (arg0: any) => void
) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/searchRoom?currentpage=1&start_date=${startDate}&end_date=${endDate}&child=${children}&adult=${adults}&hotelid=${hotelId}`
    );
    setRooms(res.data);
    setLoading(false);
  } catch (error: any) {
    setError(getError(error));
  }
};
