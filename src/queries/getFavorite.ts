import axios from "axios";
import { getError } from "./errors";

export const getFavorite = async (
  userId: string,
  setFavorites: (arg0: any) => void,
  setLoading: (arg0: any) => void
) => {
  setLoading(true);
  try {
    const favorites = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/Userfavorite/${userId}`
    );
    if (favorites.data.length > 0) {
      setFavorites(favorites.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  } catch (error: any) {
    getError(error);
  }
};
