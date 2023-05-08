import React from "react";
import styles from "./MobileOptions.module.css";
import { Roboto, Lora } from "@next/font/google";
import { useRouter } from "next/router";
import { useCurrency } from "@/lib/currencyProvider";
import { useUser } from "@/lib/userProvider";
import Image from "next/image";
import axios from "axios";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const robotoBold = Roboto({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});
const lora = Lora({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface Props {
  languages: string;
  currencies: string;
  login: string;
  signup: string;
  ph: string;
  fav: string;
  rev: string;
  lg: string;
}

function MobileOptions({
  languages,
  currencies,
  login,
  signup,
  ph,
  fav,
  rev,
  lg,
}: Props) {
  const { locale, push, pathname, asPath } = useRouter();
  const { currency, setCurrency } = useCurrency();
  const { user, setUser } = useUser();

  const handleEuro = () => {
    setCurrency("Euro");
    localStorage.setItem("currency", "Euro");
  };
  const handleDollar = () => {
    setCurrency("Dollar");
    localStorage.setItem("currency", "Dollar");
  };
  const handleDinar = () => {
    setCurrency("Dinar");
    localStorage.setItem("currency", "Dinar");
  };

  const handleLogout = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/session/logout`,
        {
          withCredentials: true,
        }
      );
      if ((res.data = "success")) {
        setUser(null);
        push(asPath);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.secondarycolor}>
            <span className={robotoBold.className}>Extra Virgin</span>
          </span>
          <span className={styles.maincolor}>
            <span className={lora.className}>TRAVEL</span>
          </span>
        </div>
        {user != null && (
          <div className={styles.userwrapper}>
            <div
              className={styles.user}
              onClick={() => {
                push("/usersettings");
              }}
            >
              <div className={styles.userimage}>
                <Image
                  src={user.imageurl}
                  alt={"user image"}
                  width={50}
                  height={50}
                />
              </div>
              <div className={styles.details}>
                <h1>{user.username}</h1>
                <p>{user.email}</p>
              </div>
            </div>
            <div className={styles.useroptions}>
              <span className={lora.className}>{ph}</span>
              <span className={lora.className}>{fav}</span>
              <span className={lora.className}>{rev}</span>
            </div>
          </div>
        )}
        <div className={styles.languagewrapper}>
          <div className={styles.language}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path
                fill="currentColor"
                d="M12 20.7q-1.8 0-3.387-.688-1.588-.687-2.763-1.862-1.175-1.175-1.863-2.763Q3.3 13.8 3.3 12t.687-3.388Q4.675 7.025 5.85 5.85t2.763-1.863Q10.2 3.3 12 3.3t3.388.687q1.587.688 2.762 1.863t1.863 2.762Q20.7 10.2 20.7 12q0 1.8-.687 3.387-.688 1.588-1.863 2.763-1.175 1.175-2.762 1.862Q13.8 20.7 12 20.7Zm0-.675q.95-1.2 1.55-2.325.6-1.125.975-2.55h-5.05q.425 1.525 1 2.65T12 20.025Zm-.875-.075q-.775-.825-1.425-2.138-.65-1.312-.95-2.662h-4.1q.9 2.05 2.625 3.325Q9 19.75 11.125 19.95Zm1.75 0q2.125-.2 3.85-1.475Q18.45 17.2 19.35 15.15h-4.1q-.425 1.375-1.075 2.687-.65 1.313-1.3 2.113Zm-8.5-5.5H8.6q-.125-.65-.175-1.262-.05-.613-.05-1.188t.05-1.188q.05-.612.175-1.262H4.375q-.175.525-.275 1.175Q4 11.375 4 12q0 .625.1 1.275.1.65.275 1.175Zm4.925 0h5.4q.125-.65.175-1.238.05-.587.05-1.212t-.05-1.213q-.05-.587-.175-1.237H9.3q-.125.65-.175 1.237-.05.588-.05 1.213 0 .625.05 1.212.05.588.175 1.238Zm6.1 0h4.225q.175-.525.275-1.175.1-.65.1-1.275 0-.625-.1-1.275-.1-.65-.275-1.175H15.4q.125.65.175 1.262.05.613.05 1.188t-.05 1.188q-.05.612-.175 1.262Zm-.15-5.6h4.1q-.925-2.1-2.587-3.325-1.663-1.225-3.888-1.5.775.95 1.4 2.225.625 1.275.975 2.6Zm-5.775 0h5.05q-.425-1.5-1.037-2.688Q12.875 4.975 12 3.975q-.875 1-1.488 2.187Q9.9 7.35 9.475 8.85Zm-4.825 0h4.1q.35-1.325.975-2.6.625-1.275 1.4-2.225-2.25.275-3.9 1.512Q5.575 6.775 4.65 8.85Z"
              />
            </svg>
            <span className={roboto.className}>{languages}</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path
                fill="currentColor"
                d="M12 14.7 6.7 9.4l.7-.7 4.6 4.6 4.6-4.6.7.7Z"
              />
            </svg>
          </div>
          <div className={styles.languages}>
            <div
              onClick={() => {
                push(pathname, pathname, { locale: "en" });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                {locale == "en" && (
                  <path
                    fill="currentColor"
                    d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"
                  />
                )}
              </svg>
              <span className={roboto.className}>English</span>
              <span />
            </div>
            <div
              onClick={() => {
                push(pathname, pathname, { locale: "fr" });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                {locale == "fr" && (
                  <path
                    fill="currentColor"
                    d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"
                  />
                )}
              </svg>
              <span className={roboto.className}>Français</span>
              <span />
            </div>
            <div
              onClick={() => {
                push(pathname, undefined, { locale: "ar" });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                {locale == "ar" && (
                  <path
                    fill="currentColor"
                    d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"
                  />
                )}
              </svg>
              <span className={roboto.className}>العربية</span>
              <span />
            </div>
          </div>
        </div>
        <div className={styles.currencywrapper}>
          <div className={styles.currency}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path
                fill="currentColor"
                d="M13.35 12.25q-.725 0-1.213-.488-.487-.487-.487-1.212t.487-1.213q.488-.487 1.213-.487.725 0 1.212.487.488.488.488 1.213 0 .725-.488 1.212-.487.488-1.212.488ZM7.4 15.5q-.625 0-1.062-.438Q5.9 14.625 5.9 14V7.1q0-.625.438-1.063Q6.775 5.6 7.4 5.6h11.9q.625 0 1.063.437.437.438.437 1.063V14q0 .625-.437 1.062-.438.438-1.063.438Zm.7-.7h10.5q0-.625.438-1.063.437-.437 1.062-.437V7.8q-.625 0-1.062-.437Q18.6 6.925 18.6 6.3H8.1q0 .625-.438 1.063Q7.225 7.8 6.6 7.8v5.5q.625 0 1.062.437.438.438.438 1.063Zm9.75 3.4H4.7q-.625 0-1.062-.438Q3.2 17.325 3.2 16.7V8.55h.7v8.15q0 .3.25.55.25.25.55.25h13.15ZM7.4 14.8h-.8V6.3h.8q-.325 0-.562.237-.238.238-.238.563V14q0 .325.238.562.237.238.562.238Z"
              />
            </svg>
            <span className={roboto.className}>{currencies}</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path
                fill="currentColor"
                d="M12 14.7 6.7 9.4l.7-.7 4.6 4.6 4.6-4.6.7.7Z"
              />
            </svg>
          </div>
          <div className={styles.currencies}>
            <div onClick={handleEuro}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                {currency == "Euro" && (
                  <path
                    fill="currentColor"
                    d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"
                  />
                )}
              </svg>
              <span className={roboto.className}>€EUR</span>
              <span />
            </div>
            <div onClick={handleDollar}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                {currency == "Dollar" && (
                  <path
                    fill="currentColor"
                    d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"
                  />
                )}
              </svg>
              <span className={roboto.className}>$USD</span>
              <span />
            </div>
            <div onClick={handleDinar}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                {currency == "Dinar" && (
                  <path
                    fill="currentColor"
                    d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"
                  />
                )}
              </svg>
              <span className={roboto.className}>TND</span>
              <span />
            </div>
          </div>
        </div>
        {user != null ? (
          <button className={styles.button} onClick={handleLogout}>
            <span className={roboto.className}>{lg}</span>
          </button>
        ) : (
          <>
            <button
              className={styles.button}
              onClick={() => {
                push("/login");
              }}
            >
              <span className={roboto.className}>{login}</span>
            </button>
            <button
              className={styles.button}
              onClick={() => {
                push("/signup");
              }}
            >
              <span className={roboto.className}>{signup}</span>
            </button>
          </>
        )}
      </div>
      <div className={styles.error}>
        <div className={roboto.className}>404 - Page not found.</div>
      </div>
    </>
  );
}

export default MobileOptions;
