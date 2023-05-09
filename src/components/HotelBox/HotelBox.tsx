import React from "react";
import styles from "./HotelBox.module.css";
import Image from "next/image";
import { useState } from "react";
import { Roboto, Lora } from "@next/font/google";
import { useRouter } from "next/router";
import { useCurrency } from "@/utils/currencyProvider";
import Link from "next/link";
import { useUser } from "@/utils/userProvider";

interface Props {
  id: string;
  image: string;
  rating: string;
  name: string;
  desc: string;
  location: string;
  stars: string;
  priceindinar: string;
  priceineuro: string;
  priceindollar: string;
  night: string;
  total: string;
}

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

function HotelBox({
  id,
  image,
  rating,
  name,
  desc,
  location,
  stars,
  priceindinar,
  priceineuro,
  priceindollar,
  night,
  total,
}: Props) {
  const [liked, setLiked] = useState<boolean>(false);
  const { currency } = useCurrency();
  const { query } = useRouter();
  const newQuery = {
    startDate: query.startDate,
    endDate: query.endDate,
    adults: query.adults,
    children: query.children,
    rooms: query.rooms,
  };
  const { user } = useUser();

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Link
          href={{
            pathname: `/hotels/${id}`,
            query: newQuery,
          }}
        >
          <Image src={image} alt={name} fill sizes={"100%"} priority />
        </Link>
        {user != null ? (
          <div className={styles.heart} heart-active={liked ? "true" : ""}>
            <div className={styles.heartbtn} onClick={() => setLiked(!liked)} />
          </div>
        ) : null}
        <div className={styles.rating}>
          <span className={robotoBold.className}>{rating}</span>
        </div>
      </div>
      <Link
        href={{
          pathname: `/hotels/${id}`,
          query: newQuery,
        }}
      >
        <div className={styles.details}>
          <div className={styles.title}>
            <h2 className={robotoBold.className}>{name}</h2>
            <div className={styles.stars}>
              <svg height="20" viewBox="0 96 960 960" width="20">
                <path
                  fill="currentColor"
                  d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                />
              </svg>
              <span className={robotoBold.className}>{stars}</span>
            </div>
          </div>
          <div className={styles.location}>
            <span className={lora.className}>{location}</span>
          </div>
          <p className={lora.className}>{desc}</p>
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
            <span className={lora.className}>{night}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelBox;
