import axios from "axios";
import { getError } from "./errors";

export const reviewHotel = async (
  hotelId: string | string[],
  userId: string,
  review: string,
  setLoading: (arg0: any) => void
) => {
  setLoading(true);
  try {
    const rating = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviewsHotels/${hotelId}/${userId}`,
      { comment: review }
    );
    if (rating.data) {
      setLoading(false);
      return "success";
    } else {
      setLoading(false);
      return "error";
    }
  } catch (error: any) {
    getError(error);
  }
};
