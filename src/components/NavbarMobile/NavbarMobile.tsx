import React, { useState, useEffect, useRef } from "react";
import styles from "./NavbarMobile.module.css";
import Link from "next/link";
import { Roboto } from "@next/font/google";

interface Props {
  currentPage: string;
  home: string;
  hotels: string;
  trips: string;
  tours: string;
  contact: string;
  menu: string;
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
});

function NavbarMobile({
  currentPage,
  home,
  hotels,
  trips,
  tours,
  contact,
  menu,
}: Props) {
  const links = [
    { id: 1, name: home, link: "/" },
    // { id: 2, name: hotels, link: "/hotels" },
    { id: 3, name: trips, link: "/trips" },
    { id: 4, name: tours, link: "/tours" },
    { id: 5, name: contact, link: "/contact" },
    { id: 6, name: menu, link: "/menu" },
  ];
  const [selectedPage, setSelectedPage] = useState<string>(currentPage);

  useEffect(() => {
    setSelectedPage(currentPage);
  }, [currentPage]);

  return (
    <nav className={styles.nav}>
      {links.map((link) => (
        <li key={link.id} onClick={() => setSelectedPage(link.name)}>
          {link.name === selectedPage ? (
            <div className={styles.overline} />
          ) : null}
          {link.name === home && (
            <Link href={link.link} className={styles.icon}>
              <svg height="48" width="48">
                {link.name === selectedPage ? (
                  <path
                    fill="currentColor"
                    d="M9 41V18.5L24 7.2l15 11.3V41H27.8V27.6h-7.6V41Z"
                  />
                ) : (
                  <path
                    fill="currentColor"
                    d="M11.7 38.3h8.25V26.45h8.1V38.3h8.25V19.85L24 10.5l-12.3 9.35Zm-1.1 1.1V19.3L24 9.15 37.4 19.3v20.1H26.95V27.55h-5.9V39.4Zm13.4-15Z"
                  />
                )}
              </svg>
              <span className={roboto.className}>{link.name}</span>
            </Link>
          )}
          {link.name === hotels && (
            <Link href={link.link} className={styles.icon}>
              <svg height="48" width="48">
                {link.name === selectedPage ? (
                  <path
                    fill="currentColor"
                    d="M4.6 35.4V10.8h1.1v17.35h17.8V14.9h14.75q2.1 0 3.625 1.525T43.4 20.05V35.4h-1.1v-6.15H5.7v6.15Zm9.25-11.85q-1.45 0-2.475-1-1.025-1-1.025-2.5 0-1.45 1.025-2.45 1.025-1 2.475-1 1.45 0 2.475 1 1.025 1 1.025 2.5 0 1.45-1.025 2.45-1.025 1-2.475 1Zm10.75 4.6h17.7v-8.1q0-1.65-1.2-2.85-1.2-1.2-2.85-1.2H24.6Zm-10.75-5.7q1 0 1.7-.7t.7-1.7q0-.95-.7-1.65t-1.7-.7q-1 0-1.7.7t-.7 1.65q0 1 .7 1.7t1.7.7Zm0 0q-1 0-1.7-.7t-.7-1.7q0-.95.7-1.65t1.7-.7q1 0 1.7.7t.7 1.65q0 1-.7 1.7t-1.7.7ZM24.6 16h13.65q1.65 0 2.85 1.2 1.2 1.2 1.2 2.85v8.1H24.6Z"
                  />
                ) : (
                  <path
                    fill="currentColor"
                    d="M4.6 35.4V10.8h1.1v17.35h17.8V14.9h14.75q2.1 0 3.625 1.525T43.4 20.05V35.4h-1.1v-6.15H5.7v6.15Zm9.25-11.85q-1.45 0-2.475-1-1.025-1-1.025-2.5 0-1.45 1.025-2.45 1.025-1 2.475-1 1.45 0 2.475 1 1.025 1 1.025 2.5 0 1.45-1.025 2.45-1.025 1-2.475 1Zm10.75 4.6h17.7v-8.1q0-1.65-1.2-2.85-1.2-1.2-2.85-1.2H24.6Zm-10.75-5.7q1 0 1.7-.7t.7-1.7q0-.95-.7-1.65t-1.7-.7q-1 0-1.7.7t-.7 1.65q0 1 .7 1.7t1.7.7Zm0-2.4ZM24.6 16v12.15Z"
                  />
                )}
              </svg>
              <span className={roboto.className}>{link.name}</span>
            </Link>
          )}
          {link.name === trips && (
            <Link href={link.link} className={styles.icon}>
              <svg height="48" width="48">
                {link.name === selectedPage ? (
                  <path
                    fill="currentColor"
                    d="m31.95 42-5.2-8.8H20.2q-.45 0-.75-.3t-.3-.75q0-.45.3-.75t.75-.3h6.55l5.2-8.8h.4l-2.6 8.8h7.4l1.5-2h.25l-.9 3.05.9 3.05h-.25l-1.5-2h-7.4l2.6 8.8Zm-16.3-16.3 2.6-8.8h-7.4l-1.5 2H9.1l.9-3.05-.9-3.05h.25l1.5 2h7.4L15.65 6h.4l5.2 8.8h6.55q.45 0 .75.3t.3.75q0 .45-.3.75t-.75.3h-6.55l-5.2 8.8Z"
                  />
                ) : (
                  <path
                    fill="currentColor"
                    d="M18.45 42.3v-1.05l4-2.9V25.1L5.3 30.15V28.9l17.15-10.1V6.85q0-.65.45-1.1.45-.45 1.1-.45.65 0 1.1.45.45.45.45 1.1V18.8L42.7 28.9v1.25L25.55 25.1v13.15l4 3v1.05L24 40.65Z"
                  />
                )}
              </svg>
              <span className={roboto.className}>{link.name}</span>
            </Link>
          )}
          {link.name === tours && (
            <Link href={link.link} className={styles.icon}>
              <svg height="48" width="48">
                {link.name === selectedPage ? (
                  <path
                    fill="currentColor"
                    d="M11.3 42.7V5.3h1.1v4.05h27.7l-3.5 8.6 3.5 8.6H12.4V42.7Zm13.75-22.15q1.05 0 1.8-.75t.75-1.85q0-1.1-.75-1.85T25 15.35q-1.05 0-1.8.75t-.75 1.85q0 1.1.75 1.85t1.85.75Z"
                  />
                ) : (
                  <path
                    fill="currentColor"
                    d="M11.3 42.7V5.3h1.1v4.05h27.7l-3.5 8.6 3.5 8.6H12.4V42.7Zm1.1-32.25v15Zm12.65 10.1q1.05 0 1.8-.75t.75-1.85q0-1.1-.75-1.85T25 15.35q-1.05 0-1.8.75t-.75 1.85q0 1.1.75 1.85t1.85.75Zm-12.65 4.9h26.05l-3-7.5 3-7.5H12.4Z"
                  />
                )}
              </svg>
              <span className={roboto.className}>{link.name}</span>
            </Link>
          )}
          {link.name === contact && (
            <Link href={link.link} className={styles.icon}>
              <svg height="48" width="48">
                {link.name === selectedPage ? (
                  <path
                    fill="currentColor"
                    d="M24 26.8q1.15 0 1.925-.775.775-.775.775-1.925t-.775-1.925Q25.15 21.4 24 21.4t-1.925.775q-.775.775-.775 1.925t.775 1.925q.775.775 1.925.775Zm-6.7 6.4h13.4v-.05q0-.85-.45-1.4-.45-.55-1.2-.9-1.15-.5-2.425-.775T24 29.8q-1.35 0-2.625.275t-2.425.775q-.75.35-1.2.9-.45.55-.45 1.4Zm17.4 8.2H13.3q-1.15 0-1.925-.775-.775-.775-.775-1.925V9.3q0-1.15.775-1.925Q12.15 6.6 13.3 6.6h13.6l10.5 10.5v21.6q0 1.15-.775 1.925-.775.775-1.925.775Z"
                  />
                ) : (
                  <path
                    fill="currentColor"
                    d="M24 26.8q1.15 0 1.925-.775.775-.775.775-1.925t-.775-1.925Q25.15 21.4 24 21.4t-1.925.775q-.775.775-.775 1.925t.775 1.925q.775.775 1.925.775Zm-6.7 6.4h13.4v-.05q0-.85-.45-1.4-.45-.55-1.2-.9-1.15-.5-2.425-.775T24 29.8q-1.35 0-2.625.275t-2.425.775q-.75.35-1.2.9-.45.55-.45 1.4Zm17.4 8.2H13.3q-1.15 0-1.925-.775-.775-.775-.775-1.925V9.3q0-1.15.775-1.925Q12.15 6.6 13.3 6.6h13.6l10.5 10.5v21.6q0 1.15-.775 1.925-.775.775-1.925.775Zm0-1.1q.6 0 1.1-.5.5-.5.5-1.1V17.6l-9.9-9.9H13.3q-.6 0-1.1.5-.5.5-.5 1.1v29.4q0 .6.5 1.1.5.5 1.1.5Zm-23 0V7.7v32.6Z"
                  />
                )}
              </svg>
              <span className={roboto.className}>{link.name}</span>
            </Link>
          )}
          {link.name === menu && (
            <Link href="/menu" className={styles.icon}>
              <svg height="48" width="48">
                {link.name === selectedPage ? (
                  <path
                    fill="currentColor"
                    d="M7.55 34.1V33h23.4v1.1Zm32.1-2.1-8-8 8-8.05.8.8-7.2 7.25 7.2 7.2Zm-32.1-7.5v-1.1h17.4v1.1Zm0-9.5v-1.1h23.4V15Z"
                  />
                ) : (
                  <path
                    fill="currentColor"
                    d="M7.3 34.1V33h33.4v1.1Zm0-9.55v-1.1h33.4v1.1Zm0-9.55v-1.1h33.4V15Z"
                  />
                )}
              </svg>
              <span className={roboto.className}>{link.name}</span>
            </Link>
          )}
        </li>
      ))}
    </nav>
  );
}

export default NavbarMobile;
