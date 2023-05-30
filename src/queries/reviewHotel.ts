import axios from "axios";
import { getError } from "./errors";

const giveReview = async (
  hotelId: string | string[],
  userId: string,
  review: string
) => {
  try {
    const areview = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviewsHotels/${hotelId}/${userId}`,
      { comment: review }
    );
    return areview.data;
  } catch (error: any) {
    getError(error);
  }
};

const deleteReview = async (hotelId: string | string[], userId: string) => {
  try {
    const deletereview = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviewsHotel/${hotelId}/${userId}`
    );
    return deletereview.data;
  } catch (error: any) {
    getError(error);
  }
};

export const reviewHotel = async (
  hotelId: string | string[],
  userId: string,
  review: string
) => {
  try {
    const req = await giveReview(hotelId, userId, review);
    if (req == "only one review") {
      try {
        const req = await deleteReview(hotelId, userId);
        if (req == "deleted") {
          const req = await giveReview(hotelId, userId, review);
          if (req != "only one review") {
            return "success";
          } else {
            return "error";
          }
        }
      } catch (error: any) {
        getError(error);
      }
    } else {
      return "success";
    }
  } catch (error: any) {
    getError(error);
  }
};
