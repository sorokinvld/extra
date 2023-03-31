export type countriesTypes = {
  loading: boolean;
  countries: string[];
  errorMessage: string;
};

export const countriesDefaultValues: countriesTypes = {
  loading: true,
  countries: [],
  errorMessage: "",
};
