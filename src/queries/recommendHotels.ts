import axios from "axios";
import { getError } from "./errors";

export const recommendHotels = async (
  userId: string,
  setRecommendations: (arg0: any) => void,
  setLoading: (arg0: boolean) => void,
  setError: (arg0: any) => void
) => {
  try {
    const hotels = await axios.get(
      `${process.env.NEXT_PUBLIC_AI_URL}/api/recommendation?id=${userId}`
    );
    setRecommendations(hotels.data);
    setLoading(false);
  } catch (error: any) {
    setError(getError(error));
  }
};
