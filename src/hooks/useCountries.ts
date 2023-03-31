import { useEffect, useState } from "react";
import { fetchCountries } from "../queries/fetchCountries";
import { countriesDefaultValues, countriesTypes } from "@/types/countriesTypes";

export const useCountries = () => {
  const [countryState, setCountryState] = useState<countriesTypes>(
    countriesDefaultValues
  );
  useEffect(() => {
    fetchCountries(countryState, setCountryState);
  }, [countryState]);
  const { loading, errorMessage, countries } = countryState;

  let sortedCountries = countries.sort(function (a: any, b: any) {
    if (a.name.common < b.name.common) {
      return -1;
    }
    if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  });
  return {
    loading,
    errorMessage,
    countries,
    sortedCountries,
  };
};
