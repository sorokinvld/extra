import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type currContextType = {
  currency: string;
  setCurrency: Dispatch<SetStateAction<string>>;
};
const currContextDefaultValues: currContextType = {
  currency: "",
  setCurrency: () => {},
};

const CurrContext = createContext<currContextType>(currContextDefaultValues);

export function useCurrency() {
  return useContext(CurrContext);
}

interface Props {
  children: ReactNode;
}

export function CurrencyProvider({ children }: Props) {
  const [currency, setCurrency] = useState<string>("");

  useEffect(() => {
    const currentCurrency = localStorage.getItem("currency");
    if (currentCurrency != null) {
      if (
        currentCurrency === "Euro" ||
        currentCurrency === "Dollar" ||
        currentCurrency === "Dinar"
      ) {
        setCurrency(currentCurrency);
      } else {
        setCurrency("Euro");
      }
    } else {
      setCurrency("Euro");
    }
  }, []);

  const value = {
    currency,
    setCurrency,
  };
  return <CurrContext.Provider value={value}>{children}</CurrContext.Provider>;
}
