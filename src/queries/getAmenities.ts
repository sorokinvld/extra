import axios from "axios";
import { getError } from "./errors";

export const getAmenities = async (
  setAmenities: (arg0: any) => void,
  setLoading: (arg0: boolean) => void,
  setError: (arg0: any) => void
) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getAmenities`
    );
    setAmenities(res.data);
    setLoading(false);
  } catch (error: any) {
    setError(getError(error));
  }
};
