import React from "react";
import styles from "./ReviewCard.module.css";
import Image from "next/image";
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

interface Props {
  image: string;
  name: string;
  date: string;
  review: string;
}

function ReviewCard({ image, name, date, review }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles.userimage}>
          <Image src={image} alt={name + "picture"} width={50} height={50} />
        </div>
        <div className={styles.userdetails}>
          <div className={robotoBold.className}>{name}</div>
          <div className={lora.className}>{date}</div>
        </div>
      </div>
      <div className={styles.review}>
        <span className={lora.className}>{review}</span>
      </div>
    </div>
  );
}

export default ReviewCard;
