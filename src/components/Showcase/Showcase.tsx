import React from "react";
import styles from "./Showcase.module.css";
import Image from "next/image";
import { Roboto, Lora } from "@next/font/google";
import Link from "next/link";

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
  id: string;
  position?: string;
  image: string;
  title: string;
  desc: string;
  seemore: string;
}

function Showcase({ id, image, title, desc, seemore, position }: Props) {
  return (
    <div className={styles.container} showcase-position={position}>
      <div className={styles.rightsection}>
        <Image src={image} alt={title} fill sizes="100%" priority />
      </div>
      <div className={styles.leftsection}>
        <h2 className={robotoBold.className}>{title}</h2>
        <p className={lora.className}>{desc}</p>
        <div className={styles.link}>
          <Link href={`/trips/${id}`}>
            <span className={lora.className}>
              <span>{seemore}</span>
              <svg height="24" viewBox="0 96 960 960" width="24">
                <path
                  fill="currentColor"
                  d="m480 896-42-43 247-247H160v-60h525L438 299l42-43 320 320-320 320Z"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Showcase;
