import React from "react";
import styles from "./RoomCard.module.css";
import { Roboto, Lora } from "@next/font/google";
import { useCurrency } from "@/utils/currencyProvider";
import { useUser } from "@/utils/userProvider";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

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
const loraBold = Lora({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

interface Props {
  id: string;
  name: string;
  priceineuro: number;
  priceindollar: number;
  priceindinar: number;
  category: string;
  reserve: string;
  total: string;
  image: string;
}

function RoomCard({
  id,
  reserve,
  category,
  total,
  name,
  priceineuro,
  priceindollar,
  priceindinar,
  image,
}: Props) {
  const { currency } = useCurrency();
  const { user } = useUser();
  const { query, push } = useRouter();
  const handleBook = () => {
    if (user) {
      if (currency == "Dinar") {
        toast.error("We don't support payment in Dinar yet!");
      } else if (currency == "Euro") {
        const paymentData = {
          amount: priceineuro as number,
          currency: "EUR" as string,
          roomId: id as string,
          userId: user._id as string,
          start_date: query.startDate as string,
          end_date: query.endDate as string,
          image: image as string,
        };
        axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/create-room-checkout-session`,
            paymentData
          )
          .then((res) => {
            if (res.data.sessionurl) {
              window.location.href = res.data.sessionurl;
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Something went wrong try again!");
          });
      } else {
        const paymentData = {
          amount: priceindollar as number,
          currency: "USD" as string,
          roomId: id as string,
          userId: user._id as string,
          start_date: query.startDate as string,
          end_date: query.endDate as string,
          image: image as string,
        };
        axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/create-room-checkout-session`,
            paymentData
          )
          .then((res) => {
            if (res.data.sessionurl) {
              window.location.href = res.data.sessionurl;
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Something went wrong try again!");
          });
      }
    } else {
      push("/login");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={robotoBold.className}>{name}</span>
      </div>
      <div className={styles.amenities}>
        <div className={styles.amenitieslist}>
          <div className={styles.amenitiesitem}>
            <span className={loraBold.className}>{category}</span>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.price}>
          {priceineuro && (
            <>
              {currency === "Euro" && (
                <span className={robotoBold.className}>
                  €{Math.round(priceineuro)}
                </span>
              )}
            </>
          )}
          {priceindollar && (
            <>
              {currency === "Dollar" && (
                <span className={robotoBold.className}>
                  ${Math.round(priceindollar)}
                </span>
              )}
            </>
          )}
          {priceindinar && (
            <>
              {currency === "Dinar" && (
                <span className={robotoBold.className}>{priceindinar}DT</span>
              )}{" "}
            </>
          )}
          <span className={lora.className}>{total}</span>
        </div>
        <button onClick={handleBook}>{reserve}</button>
      </div>
    </div>
  );
}

export default RoomCard;
