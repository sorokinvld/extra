import axios from "axios";
import { getError } from "./errors";

export const fetchProducts = async (
  userid: any,
  setRooms: (arg0: any) => void,
  setLoading: (arg0: any) => void
) => {
  setLoading(true);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/UserProductpurchase/${userid}`
    );
    if (response.data.length > 0) {
      setRooms(response.data);
      setLoading(false);
    }
    setLoading(false);
  } catch (error: any) {
    getError(error);
    setLoading(false);
  }
};
