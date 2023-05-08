import React from "react";
import { Lora } from "@next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./TourRight.module.css";
import { useParallax } from "react-scroll-parallax";

const lora = Lora({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface Props {
  id: string;
  image: string;
  tourname: string;
  tourdesc: string;
  seemore: string;
}

function TourRight({ id, image, tourname, tourdesc, seemore }: Props) {
  const { ref } = useParallax<HTMLDivElement>({ speed: 3 });
  const { push } = useRouter();

  return (
    <div className={styles.tours}>
      <div
        className={styles.tourimage}
        ref={ref}
        data-aos="zoom-out"
        data-aos-duration="500"
      >
        <Image src={image} alt={tourname} fill sizes="100%" />
      </div>
      <div className={styles.tourdetails}>
        <div
          className={styles.tourname}
          data-aos="fade-right"
          data-aos-duration="500"
        >
          <span className={lora.className}>{tourname}</span>
        </div>
        <div
          className={styles.tourdesc}
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-delay="200"
        >
          <span className={lora.className}>{tourdesc}</span>
        </div>
        <div className={styles.link} onClick={() => push(`/tours/${id}`)}>
          <span
            className={lora.className}
            data-aos="fade-right"
            data-aos-duration="500"
            data-aos-delay="200"
          >
            <span>{seemore}</span>
            <svg height="24" viewBox="0 96 960 960" width="24">
              <path
                fill="currentColor"
                d="m480 896-42-43 247-247H160v-60h525L438 299l42-43 320 320-320 320Z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TourRight;
