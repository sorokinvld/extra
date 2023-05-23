import axios from "axios";
import { getError } from "./errors";

export const getHotel = async (
  hotelId: string | string[],
  setHotel: (arg0: any) => void,
  setLoading: (arg0: any) => void
) => {
  setLoading(true);
  try {
    const hotel = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/Hotel/${hotelId}`
    );
    if (hotel.data != "Not Found") {
      setHotel(hotel.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  } catch (error: any) {
    getError(error);
  }
};
