import { countriesTypes } from "../types/countriesTypes";
import axios from "axios";

export const fetchCountries = async (
  countryState: countriesTypes,
  setCountryState: (arg0: countriesTypes) => void
) => {
  try {
    const dataUrl = `https://restcountries.com/v3.1/all`;
    const response = await axios.get(dataUrl);
    setCountryState({
      ...countryState,
      countries: response.data,
      loading: false,
    });
  } catch (error) {
    setCountryState({
      ...countryState,
      loading: false,
      errorMessage: "Sorry Something went wrong, please refresh the page!",
    });
  }
};
