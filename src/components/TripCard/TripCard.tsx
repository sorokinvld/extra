import React from "react";
import styles from "./TripCard.module.css";
import Image from "next/image";
import { Roboto, Lora } from "@next/font/google";
import { useCurrency } from "@/utils/currencyProvider";
import { useRouter } from "next/router";

const robotoBold = Roboto({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

const lora = Lora({ subsets: ["latin"], weight: "500" });

interface Props {
  id: string;
  image: string;
  location: string;
  name: string;
  description: string;
  price: string;
  discover: string;
  from: string;
}

function TripCard({
  id,
  image,
  location,
  name,
  description,
  price,
  discover,
  from,
}: Props) {
  const { currency } = useCurrency();
  const { push } = useRouter();

  return (
    <div className={styles.container}>
      <Image src={image} alt={name} fill sizes={"100%"} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.location}>
          <div className={styles.icon}>
            <svg height="24" viewBox="0 96 960 960" width="24">
              <path
                fill="currentColor"
                d="M480.089 566Q509 566 529.5 545.411q20.5-20.588 20.5-49.5Q550 467 529.411 446.5q-20.588-20.5-49.5-20.5Q451 426 430.5 446.589q-20.5 20.588-20.5 49.5Q410 525 430.589 545.5q20.588 20.5 49.5 20.5ZM480 976Q319 839 239.5 721.5T160 504q0-150 96.5-239T480 176q127 0 223.5 89T800 504q0 100-79.5 217.5T480 976Z"
              />
            </svg>
          </div>
          <span className={robotoBold.className}>{location}</span>
        </div>
        <div className={styles.details}>
          <span className={robotoBold.className}>{name}</span>
          <span className={lora.className}>{description}</span>
          <div className={styles.options}>
            <button onClick={() => push(`/trips/${id}`)}>
              <span className={robotoBold.className}>{discover}</span>
            </button>
            <div className={styles.price}>
              <span className={lora.className}>{from}</span>
              {currency === "Euro" && (
                <span className={robotoBold.className}>€{price}</span>
              )}
              {currency === "Dollar" && (
                <span className={robotoBold.className}>${price}</span>
              )}
              {currency === "Dinar" && (
                <span className={robotoBold.className}>{price}DT</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripCard;
