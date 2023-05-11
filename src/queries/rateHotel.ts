import axios from "axios";
import { getError } from "./errors";
import { toast } from "react-toastify";

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
      toast.success("rating successful");
    } else {
      setLoading(false);
      toast.error("You can only rate once");
    }
  } catch (error: any) {
    getError(error);
  }
};
