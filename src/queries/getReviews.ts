import axios from "axios";
import { getError } from "./errors";

export const getReviews = async (
  userId: string | string[],
  setReviews: (arg0: any) => void,
  setLoading: (arg0: any) => void
) => {
  setLoading(true);
  try {
    const reviews = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/UserReview/${userId}`
    );
    if (reviews.data.length > 0) {
      setReviews(reviews.data);
      setLoading(false);
    } else {
      setReviews([]);
      setLoading(false);
    }
  } catch (error: any) {
    getError(error);
  }
};
