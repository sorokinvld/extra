import React, { useState, useEffect, useRef } from "react";
import styles from "./UserBar.module.css";
import { Roboto } from "@next/font/google";
import { useRouter } from "next/router";
import { useUser } from "@/lib/userProvider";
import { closeOpenedComponent } from "@/lib/closeOpenedComponent";
import Image from "next/image";
import axios from "axios";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

function UserBar() {
  const { push, asPath } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setUser, user } = useUser();

  useEffect(() => {
    document.addEventListener("mousedown", (e) =>
      closeOpenedComponent(e, dropdownRef, open, setOpen)
    );

    return () => {
      document.removeEventListener("mousedown", (e) =>
        closeOpenedComponent(e, dropdownRef, open, setOpen)
      );
    };
  }, [open]);

  const handleLogout = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/session/logout`,
        {
          withCredentials: true,
        }
      );
      if ((res.data = "success")) {
        setUser(null);
        push(asPath);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.userwrapper}>
        <div
          className={styles.user}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <span className={roboto.className}>Welcome, {user.username}</span>
          <svg
            height="24"
            width="24"
            className={open ? styles.downsvg : styles.upsvg}
          >
            <path
              fill="currentColor"
              d="M12 14.7 6.7 9.4l.7-.7 4.6 4.6 4.6-4.6.7.7Z"
            />
          </svg>
        </div>
        <div open-state={open ? "open" : ""} className={styles.useroptions}>
          <div
            className={styles.userimage}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div
              className={styles.overlay}
              shown-state={hovered ? "true" : ""}
            />
            <svg
              height="35"
              viewBox="0 96 960 960"
              width="35"
              shown-state={hovered ? "true" : ""}
            >
              <path
                fill="currentColor"
                d="M194.872 915.999q-25.788 0-44.176-18.388-18.387-18.388-18.387-44.176v-554.87q0-25.788 18.387-44.176 18.388-18.388 44.176-18.388h371.64v165.794h80.411v80.666h165.383v370.974q0 25.788-18.388 44.176t-44.176 18.388h-554.87Zm67.437-151.077h423.073L556.819 593.591 441.128 743.128l-81.897-104.204-96.922 125.998Zm435.128-332.974v-80.667h-80.411v-50.255h80.411v-80.41h50.254v80.41h80.411v50.255h-80.411v80.667h-50.254Z"
              />
            </svg>
            <Image
              src={user.imageurl}
              alt={"user image"}
              width={50}
              height={50}
            />
          </div>
          <div className={styles.options}>
            <span className={roboto.className}>Purchase history</span>
            <span className={roboto.className}>Favorites</span>
            <span className={roboto.className}>Reviews</span>
            <span className={roboto.className} onClick={handleLogout}>
              Log out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBar;
