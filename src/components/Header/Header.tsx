import React from "react";
import styles from "./Header.module.css";
import Navbar from "../Navbar/Navbar";
import NavbarMobile from "../NavbarMobile/NavbarMobile";

interface Props {
  currentPage: string;
  home: string;
  hotels: string;
  trips: string;
  tours: string;
  contact: string;
  login: string;
  menu: string;
  signup: string;
}

function Header({
  currentPage,
  home,
  hotels,
  trips,
  tours,
  contact,
  login,
  menu,
  signup,
}: Props) {
  return (
    <header className={styles.header}>
      <Navbar
        currentPage={currentPage}
        home={home}
        hotels={hotels}
        trips={trips}
        tours={tours}
        contact={contact}
        login={login}
        signup={signup}
      />
      <NavbarMobile
        currentPage={currentPage}
        home={home}
        hotels={hotels}
        trips={trips}
        tours={tours}
        contact={contact}
        menu={menu}
      />
    </header>
  );
}

export default Header;
