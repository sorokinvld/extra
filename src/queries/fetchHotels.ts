import axios from "axios";
import { getError } from "./errors";

export const fetchHotels = async (
  destination: any,
  setHotels: (arg0: any) => void
) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/hotels?location=${destination}`
    );
    setHotels(response.data);
  } catch (error: any) {
    getError(error);
  }
};
