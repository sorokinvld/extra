import axios from "axios";
import { getError } from "./errors";

export const checkFavoriteState = async (
  userId: string,
  hotelId: string,
  setState: (arg0: any) => void
) => {
  try {
    const favorites = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/favoritecheck/${hotelId}/${userId}`
    );
    if (favorites.data == "already favorited") {
      setState(true);
    } else {
      setState(false);
    }
  } catch (error: any) {
    getError(error);
  }
};

export const checkFavoriteStateBool = async (
  userId: string,
  hotelId: string
) => {
  try {
    const favorites = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/favoritecheck/${hotelId}/${userId}`
    );
    if (favorites.data == "already favorited") {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    getError(error);
  }
};
