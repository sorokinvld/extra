import React, { useEffect } from "react";
import styles from "./HotelCard.module.css";
import Image from "next/image";
import { Roboto, Lora } from "@next/font/google";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/utils/userProvider";
import { checkFavoriteState } from "@/queries/checkFavoriteState";
import { toggleFavorite } from "@/queries/toggleFavorite";

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
  country: string;
}

function HotelCard({
  id,
  rating,
  imageSrc,
  name,
  stars,
  location,
  country,
}: Props) {
  const [liked, setLiked] = useState<boolean>(false);
  const { user } = useUser();
  const { push } = useRouter();

  useEffect(() => {
    if (user) {
      if (JSON.parse(JSON.stringify(id)).$oid != undefined) {
        checkFavoriteState(
          user._id,
          JSON.parse(JSON.stringify(id)).$oid,
          setLiked
        );
      } else {
        checkFavoriteState(user._id, id, setLiked);
      }
    }
  }, [id, user, user?._id]);

  const handleLike = async () => {
    const favorite = await toggleFavorite(
      user._id,
      JSON.parse(JSON.stringify(id)).$oid
    );
    if (favorite == "success") {
      setLiked(!liked);
    }
  };

  const handlePush = () => {
    if (JSON.parse(JSON.stringify(id)).$oid != undefined) {
      push(`hotels/${JSON.parse(JSON.stringify(id)).$oid}`);
    } else {
      push(`hotels/${id}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imagecontainer}>
        <div className={styles.rating}>
          <span className={robotoBold.className}>{rating}</span>
        </div>
        {user != null ? (
          <div className={styles.heart} heart-active={liked ? "true" : ""}>
            <div className={styles.heartbtn} onClick={handleLike} />
          </div>
        ) : null}
        <div className={styles.image} onClick={handlePush}>
          <Image src={imageSrc} alt={name} fill sizes={"100%"} />
        </div>
      </div>
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
          <span className={lora.className}>
            {location}, {country}
          </span>
        </div>
        <div className={styles.options}>
          <div className={styles.price}>
            <span className={robotoBold.className}></span>
            <span className={lora.className}></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
