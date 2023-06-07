import React from "react";
import styles from "./RoomCard.module.css";
import { Roboto, Lora } from "@next/font/google";
import { useCurrency } from "@/utils/currencyProvider";

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
  name: string;
  priceineuro: number;
  priceindollar: number;
  priceindinar: number;
  category: string;
  reserve: string;
  total: string;
}

function RoomCard({
  reserve,
  category,
  total,
  name,
  priceineuro,
  priceindollar,
  priceindinar,
}: Props) {
  const { currency } = useCurrency();
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
        <button>{reserve}</button>
      </div>
    </div>
  );
}

export default RoomCard;
