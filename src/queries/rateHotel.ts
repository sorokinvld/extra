import axios from "axios";
import { getError } from "./errors";

const giveRate = async (
  hotelId: string | string[],
  userId: string,
  rate: number
) => {
  try {
    const rating = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ratingHotel/${hotelId}/${userId}/${rate}`
    );
    return rating.data;
  } catch (error: any) {
    getError(error);
  }
};

const deleteRate = async (hotelId: string | string[], userId: string) => {
  try {
    const deleterating = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ratingHotel/${hotelId}/${userId}`
    );
    return deleterating.data;
  } catch (error: any) {
    getError(error);
  }
};

export const rateHotel = async (
  hotelId: string | string[],
  userId: string,
  rate: number
) => {
  try {
    const req = await giveRate(hotelId, userId, rate);
    if (req == "only one rate ") {
      const req = await deleteRate(hotelId, userId);
      if (req == "deleted") {
        const req = await giveRate(hotelId, userId, rate);
        if (req != "only one rate ") {
          return "success";
        } else {
          return "error";
        }
      } else {
        return "error";
      }
    } else {
      return "success";
    }
  } catch (error: any) {
    getError(error);
  }
};
