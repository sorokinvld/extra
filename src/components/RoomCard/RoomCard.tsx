import React from "react";
import styles from "./RoomCard.module.css";
import { Roboto, Lora } from "@next/font/google";

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
  price: string;
  availability: string;
  availabilityt: string;
  reserve: string;
  night: string;
}

function RoomCard({
  reserve,
  availabilityt,
  availability,
  night,
  name,
  price,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={robotoBold.className}>{name}</span>
      </div>
      <div className={styles.amenities}>
        <div className={styles.amenitieslist}>
          <div className={styles.amenitiesitem}>
            <span className={loraBold.className}>
              {availabilityt} : {availability}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.price}>
          <span className={robotoBold.className}>{price}</span>
          <span className={lora.className}>{night}</span>
        </div>
        <button>{reserve}</button>
      </div>
    </div>
  );
}

export default RoomCard;
