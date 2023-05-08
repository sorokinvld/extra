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

interface Props {
  welcome: string;
  ph: string;
  fav: string;
  rev: string;
  lg: string;
}

function UserBar({ welcome, ph, fav, rev, lg }: Props) {
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
          <span className={roboto.className}>
            {welcome}, {user.username}
          </span>
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
            onClick={() => push("/usersettings")}
          >
            <div
              className={styles.overlay}
              shown-state={hovered ? "true" : ""}
            />
            <Image
              src={user.imageurl}
              alt={"user image"}
              width={50}
              height={50}
            />
          </div>
          <div className={styles.options}>
            <span
              className={roboto.className}
              onClick={() => push("/purchasehistory")}
            >
              {ph}
            </span>
            <span className={roboto.className}>{fav}</span>
            <span className={roboto.className}>{rev}</span>
            <span className={roboto.className} onClick={handleLogout}>
              {lg}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBar;
