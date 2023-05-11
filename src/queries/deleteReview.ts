import axios from "axios";
import { getError } from "./errors";
import { getReviews } from "./getReviews";

export const deleteReviews = async (
  userId: string | string[],
  reviewId: string | string[],
  setLoading: (arg0: any) => void,
  setReviews: (arg0: any) => void
) => {
  setLoading(true);
  try {
    const reviews = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviewsHotel/${reviewId}/${userId}`
    );
    if (reviews.data == "OK") {
      getReviews(userId, setReviews, setLoading);
    } else {
      setLoading(false);
    }
  } catch (error: any) {
    getError(error);
  }
};
