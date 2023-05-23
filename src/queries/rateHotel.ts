import axios from "axios";
import { getError } from "./errors";

export const rateHotel = async (
  hotelId: string | string[],
  userId: string,
  rate: number,
  setLoading: (arg0: any) => void
) => {
  setLoading(true);
  try {
    const rating = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ratingHotel/${hotelId}/${userId}/${rate}`
    );
    if (rating.data != "only one rate ") {
      setLoading(false);
      return "Success";
    } else {
      const deleterating = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ratingHotel/${hotelId}/${userId}`
      );
      if (deleterating.data == "deleted") {
        const rating = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ratingHotel/${hotelId}/${userId}/${rate}`
        );
        if (rating.data != "only one rate ") {
          setLoading(false);
        } else {
          return "Error";
        }
      } else {
        return "Error";
      }
    }
  } catch (error: any) {
    getError(error);
  }
};
