import React from "react";
import Image from "next/image";
import styles from "./Banner.module.css";
import { Lora } from "@next/font/google";
import Searchbar from "../Searchbar/Searchbar";

interface Props {
  headinglabel: string;
  location: string;
  subLocation: string;
  dates: string;
  checkin: string;
  checkout: string;
  guests: string;
  adult: string;
  adults: string;
  child: string;
  childrenn: string;
  room: string;
  rooms: string;
  guestAdults: string;
  guestChildren: string;
  guestRooms: string;
  destinationNullError: string;
  searchLocation: string;
}

const lora = Lora({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

function Banner({
  headinglabel,
  location,
  subLocation,
  dates,
  checkin,
  checkout,
  guests,
  adult,
  adults,
  child,
  childrenn,
  room,
  rooms,
  guestAdults,
  guestChildren,
  guestRooms,
  destinationNullError,
  searchLocation,
}: Props) {
  return (
    <div className={styles.bannerwrapper}>
      <Image
        src="https://res.cloudinary.com/db57xeoce/image/upload/v1676816922/banner-colored_smsrq3.png"
        alt="Extra Virgin Travel Banner"
        fill
        priority
      />
      <div className={styles.hero}>
        <h1 className={lora.className}>{headinglabel}</h1>
        <div className={styles.searchbar}>
          <Searchbar
            location={location}
            subLocation={subLocation}
            dates={dates}
            checkin={checkin}
            checkout={checkout}
            guests={guests}
            adult={adult}
            adults={adults}
            child={child}
            childrenn={childrenn}
            room={room}
            rooms={rooms}
            guestAdult={guestAdults}
            guestChildren={guestChildren}
            guestRooms={guestRooms}
            destinationNullError={destinationNullError}
            searchLocation={searchLocation}
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
