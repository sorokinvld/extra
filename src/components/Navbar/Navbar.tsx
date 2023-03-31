import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { Roboto } from "@next/font/google";
import { Lora } from "@next/font/google";
import { useRouter } from "next/router";
import Button from "../ui/Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import { useUser } from "@/lib/userProvider";
import { fetchUser } from "@/queries/fetchUser";
import UserBar from "../UserBar/UserBar";

interface Props {
  currentPage: string;
  home: string;
  hotels: string;
  trips: string;
  tours: string;
  contact: string;
  login: string;
  signup: string;
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
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

function Navbar({
  currentPage,
  home,
  hotels,
  trips,
  tours,
  contact,
  login,
  signup,
}: Props) {
  const links = [
    { id: 1, name: home, link: "/" },
    // { id: 2, name: hotels, link: "/hotels" },
    { id: 3, name: trips, link: "/trips" },
    { id: 4, name: tours, link: "/tours" },
    { id: 5, name: contact, link: "/contact" },
  ];
  const [selectedPage, setSelectedPage] = useState(currentPage);
  const { user, setUser } = useUser();

  const { push } = useRouter();

  useEffect(() => {
    const getMe = async () => {
      const [error, user] = await fetchUser();
      if (!error && user) {
        if (user == "your are not login") {
          setUser(null);
        } else {
          setUser(user);
        }
      } else {
        console.log(error);
      }
    };
    if (user == null) getMe();
  }, [setUser, user]);

  useEffect(() => {
    setSelectedPage(currentPage);
  }, [currentPage]);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => push("/")}>
        <span className={styles.secondarycolor}>
          <span className={robotoBold.className}>Extra Virgin</span>
        </span>
        <span className={styles.maincolor}>
          <span className={lora.className}>TRAVEL</span>
        </span>
      </div>
      <ul className={styles.list}>
        {links.map((link) => (
          <li
            key={link.id}
            onClick={() => setSelectedPage(link.name)}
            className={link.name === selectedPage ? styles.activeli : ""}
          >
            <Link href={link.link} className={roboto.className}>
              {link.name}
              <div className={styles.underlinehover} />
              {link.name === selectedPage ? (
                <div className={styles.underline} />
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.options}>
        <Dropdown />
      </div>
      {user != null ? (
        <div className={styles.buttons}>
          <UserBar />
        </div>
      ) : (
        <div className={styles.buttons}>
          <div onClick={() => push("/login")}>
            <Button label={login} />
          </div>
          <div className={styles.signup} onClick={() => push("/signup")}>
            {signup}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
