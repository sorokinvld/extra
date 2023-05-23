import axios from "axios";
import { getError } from "./errors";

export const addFavorite = async (
  hotelId: string | string[],
  userId: string,
  setLoading: (arg0: any) => void
) => {
  setLoading(true);
  try {
    const rating = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/favorite/${hotelId}/${userId}`
    );
    if (rating.data == "Deleted") {
      setLoading(false);
      return "Success";
    } else {
      return "Error";
    }
  } catch (error: any) {
    getError(error);
  }
};
