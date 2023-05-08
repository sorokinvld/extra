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
  reserve: string;
  night: string;
}

function RoomCard({ reserve, night, name, price }: Props) {
  const amenities = [
    "Wifi",
    "Queen bed",
    "Free breakfast",
    "Free self-parking",
  ];
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={robotoBold.className}>{name}</span>
      </div>
      <div className={styles.amenities}>
        <div className={styles.amenitieslist}>
          {amenities.map((amenity: any, index: number) => (
            <div key={index} className={styles.amenitiesitem}>
              <svg height="24" width="24" className={robotoBold.className}>
                <path
                  fill="currentColor"
                  d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"
                />
              </svg>
              <span className={loraBold.className}>{amenity}</span>
            </div>
          ))}
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
