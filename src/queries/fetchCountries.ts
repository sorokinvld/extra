import { countriesTypes } from "../types/countriesTypes";
import axios from "axios";

export const fetchCountries = async (
  setCountryState: (arg0: countriesTypes) => void
) => {
  try {
    const dataUrl = `/api/staticdata`;
    const response = await axios.get(dataUrl);
    setCountryState({
      countries: JSON.parse(response.data),
      loading: false,
      errorMessage: "",
    } as countriesTypes);
  } catch (error) {
    setCountryState({
      loading: false,
      errorMessage: "Sorry Something went wrong, please refresh the page!",
      countries: [],
    } as countriesTypes);
  }
};
