import React from "react";
import styles from "./HotelCard.module.css";
import Image from "next/image";
import { Roboto, Lora } from "@next/font/google";
import { useState } from "react";
import { useCurrency } from "@/lib/currencyProvider";
import Link from "next/link";
import { useUser } from "@/lib/userProvider";

const robotoBold = Roboto({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

interface Props {
  id: string;
  rating: string;
  imageSrc: string;
  name: string;
  stars: string;
  location: string;
  priceindinar: string;
  priceineuro: string;
  priceindollar: string;
  pernight: string;
}

function HotelCard({
  id,
  rating,
  imageSrc,
  name,
  stars,
  location,
  priceindinar,
  priceineuro,
  priceindollar,
  pernight,
}: Props) {
  const [liked, setLiked] = useState<boolean>(false);
  const { currency } = useCurrency();
  const { user } = useUser();

  return (
    <div className={styles.container}>
      <div className={styles.imagecontainer}>
        <div className={styles.rating}>
          <span className={robotoBold.className}>{rating}</span>
        </div>
        {user != null ? (
          <div className={styles.heart} heart-active={liked ? "true" : ""}>
            <div className={styles.heartbtn} onClick={() => setLiked(!liked)} />
          </div>
        ) : null}
        <Link href={`/hotels/${id}`}>
          <Image src={imageSrc} alt={name} fill sizes={"100%"} />
        </Link>
      </div>
      <Link href={`/hotels/${id}`}>
        <div className={styles.details}>
          <div className={styles.title}>
            <span className={robotoBold.className}>{name}</span>
            <div className={styles.stars}>
              <span className={robotoBold.className}>{stars}</span>
              <svg height="20" viewBox="0 96 960 960" width="20">
                <path
                  fill="currentColor"
                  d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                />
              </svg>
            </div>
          </div>
          <div className={styles.location}>
            <span className={robotoBold.className}>{location}</span>
          </div>
          <div className={styles.options}>
            <div className={styles.price}>
              {currency === "Euro" && (
                <span className={robotoBold.className}>€{priceineuro}</span>
              )}
              {currency === "Dollar" && (
                <span className={robotoBold.className}>${priceindollar}</span>
              )}
              {currency === "Dinar" && (
                <span className={robotoBold.className}>{priceindinar}DT</span>
              )}
              <span className={lora.className}>{pernight}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCard;
