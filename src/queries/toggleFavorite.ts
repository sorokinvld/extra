import axios from "axios";
import { getError } from "./errors";

export const toggleFavorite = async (userId: string, hotelId: string) => {
  try {
    const favorite = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/favorite/${hotelId}/${userId}`
    );
    if (favorite.data == "only one favorite ") {
      const favorite = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/favorite/${hotelId}/${userId}`
      );
      if (favorite.data == " favorited Deleted") {
        return "success";
      }
      return "something went wrong";
    } else {
      return "success";
    }
  } catch (error: any) {
    getError(error);
  }
};
