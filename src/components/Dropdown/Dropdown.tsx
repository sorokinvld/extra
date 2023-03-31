import React, { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.css";
import { Roboto } from "@next/font/google";
import { useRouter } from "next/router";
import { useCurrency } from "@/lib/currencyProvider";
import { closeOpenedComponent } from "@/lib/closeOpenedComponent";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

function Dropdown() {
  const { locale, push, pathname, asPath } = useRouter();
  const [openLanguage, setOpenLanguage] = useState<boolean>(false);
  const [openCurrency, setOpenCurrency] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currency, setCurrency } = useCurrency();

  const handleEuro = () => {
    setCurrency("Euro");
    localStorage.setItem("currency", "Euro");
    setOpenCurrency(!openCurrency);
  };
  const handleDollar = () => {
    setCurrency("Dollar");
    localStorage.setItem("currency", "Dollar");
    setOpenCurrency(!openCurrency);
  };
  const handleDinar = () => {
    setCurrency("Dinar");
    localStorage.setItem("currency", "Dinar");
    setOpenCurrency(!openCurrency);
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) =>
      closeOpenedComponent(e, dropdownRef, openCurrency, setOpenCurrency)
    );
    document.addEventListener("mousedown", (e) =>
      closeOpenedComponent(e, dropdownRef, openLanguage, setOpenLanguage)
    );

    return () => {
      document.removeEventListener("mousedown", (e) =>
        closeOpenedComponent(e, dropdownRef, openCurrency, setOpenCurrency)
      );
      document.removeEventListener("mousedown", (e) =>
        closeOpenedComponent(e, dropdownRef, openLanguage, setOpenLanguage)
      );
    };
  }, [openCurrency, openLanguage]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.currencywrapper}>
        <div
          className={styles.currency}
          onClick={() => {
            if (openLanguage) setOpenLanguage(false);
            setOpenCurrency(!openCurrency);
          }}
        >
          {currency == "Euro" && <span className={roboto.className}>€EUR</span>}
          {currency == "Dollar" && (
            <span className={roboto.className}>$USD</span>
          )}
          {currency == "Dinar" && <span className={roboto.className}>TND</span>}
          <svg
            height="24"
            width="24"
            className={openCurrency ? styles.downsvg : styles.upsvg}
          >
            <path
              fill="currentColor"
              d="M12 14.7 6.7 9.4l.7-.7 4.6 4.6 4.6-4.6.7.7Z"
            />
          </svg>
        </div>
        <div
          open-state={openCurrency ? "open" : ""}
          className={styles.currencies}
        >
          <div onClick={handleEuro}>
            <svg height="24" width="24" className={roboto.className}>
              {currency == "Euro" && (
                <path
                  fill="currentColor"
                  d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"
                />
              )}
            </svg>
            <span className={roboto.className}>€EUR</span>
          </div>
          <div onClick={handleDollar}>
            <svg height="24" width="24" className={roboto.className}>
              {currency == "Dollar" && (
                <path
                  fill="currentColor"
                  d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"
                />
              )}
            </svg>
            <span className={roboto.className}>$USD</span>
          </div>
          <div onClick={handleDinar}>
            <svg height="24" width="24" className={roboto.className}>
              {currency == "Dinar" && (
                <path
                  fill="currentColor"
                  d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"
                />
              )}
            </svg>
            <span className={roboto.className}>TND</span>
          </div>
        </div>
      </div>
      <div className={styles.languagewrapper}>
        <div
          className={styles.language}
          onClick={() => {
            if (openCurrency) setOpenCurrency(false);
            setOpenLanguage(!openLanguage);
          }}
        >
          <svg height="24" width="24" className={roboto.className}>
            <path
              fill="currentColor"
              d="M12 20.7q-1.8 0-3.387-.688-1.588-.687-2.763-1.862-1.175-1.175-1.863-2.763Q3.3 13.8 3.3 12t.687-3.388Q4.675 7.025 5.85 5.85t2.763-1.863Q10.2 3.3 12 3.3t3.388.687q1.587.688 2.762 1.863t1.863 2.762Q20.7 10.2 20.7 12q0 1.8-.687 3.387-.688 1.588-1.863 2.763-1.175 1.175-2.762 1.862Q13.8 20.7 12 20.7Zm0-.675q.95-1.2 1.55-2.325.6-1.125.975-2.55h-5.05q.425 1.525 1 2.65T12 20.025Zm-.875-.075q-.775-.825-1.425-2.138-.65-1.312-.95-2.662h-4.1q.9 2.05 2.625 3.325Q9 19.75 11.125 19.95Zm1.75 0q2.125-.2 3.85-1.475Q18.45 17.2 19.35 15.15h-4.1q-.425 1.375-1.075 2.687-.65 1.313-1.3 2.113Zm-8.5-5.5H8.6q-.125-.65-.175-1.262-.05-.613-.05-1.188t.05-1.188q.05-.612.175-1.262H4.375q-.175.525-.275 1.175Q4 11.375 4 12q0 .625.1 1.275.1.65.275 1.175Zm4.925 0h5.4q.125-.65.175-1.238.05-.587.05-1.212t-.05-1.213q-.05-.587-.175-1.237H9.3q-.125.65-.175 1.237-.05.588-.05 1.213 0 .625.05 1.212.05.588.175 1.238Zm6.1 0h4.225q.175-.525.275-1.175.1-.65.1-1.275 0-.625-.1-1.275-.1-.65-.275-1.175H15.4q.125.65.175 1.262.05.613.05 1.188t-.05 1.188q-.05.612-.175 1.262Zm-.15-5.6h4.1q-.925-2.1-2.587-3.325-1.663-1.225-3.888-1.5.775.95 1.4 2.225.625 1.275.975 2.6Zm-5.775 0h5.05q-.425-1.5-1.037-2.688Q12.875 4.975 12 3.975q-.875 1-1.488 2.187Q9.9 7.35 9.475 8.85Zm-4.825 0h4.1q.35-1.325.975-2.6.625-1.275 1.4-2.225-2.25.275-3.9 1.512Q5.575 6.775 4.65 8.85Z"
            />
          </svg>
          {locale == "en" && <span className={roboto.className}>English</span>}
          {locale == "fr" && <span className={roboto.className}>Français</span>}
          {locale == "ar" && <span className={roboto.className}>العربية</span>}
          <svg
            height="24"
            width="24"
            className={openLanguage ? styles.downsvg : styles.upsvg}
          >
            <path
              fill="currentColor"
              d="M12 14.7 6.7 9.4l.7-.7 4.6 4.6 4.6-4.6.7.7Z"
            />
          </svg>
        </div>
        <div
          open-state={openLanguage ? "open" : ""}
          className={styles.languages}
        >
          <div
            onClick={() => {
              push(pathname, asPath, { locale: "en" });
              setOpenLanguage(!openLanguage);
            }}
          >
            <svg height="24" width="24" className={roboto.className}>
              {locale == "en" && (
                <path
                  fill="currentColor"
                  d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"
                />
              )}
            </svg>
            <span className={roboto.className}>English</span>
          </div>
          <div
            onClick={() => {
              push(pathname, asPath, { locale: "fr" });
              setOpenLanguage(!openLanguage);
            }}
          >
            <svg height="24" width="24" className={roboto.className}>
              {locale == "fr" && (
                <path
                  fill="currentColor"
                  d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"
                />
              )}
            </svg>
            <span className={roboto.className}>Français</span>
          </div>

          <div
            onClick={() => {
              push(pathname, asPath, { locale: "ar" });
              setOpenLanguage(!openLanguage);
            }}
          >
            <svg height="24" width="24" className={roboto.className}>
              {locale == "ar" && (
                <path
                  fill="currentColor"
                  d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"
                />
              )}
            </svg>
            <span className={roboto.className}>العربية</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
