import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import { Roboto } from "@next/font/google";
import { Lora } from "@next/font/google";
import Image from "next/image";
import payment from "public/images/paiement.png";
import iata from "public/images/logo-iata.png";

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
  weight: "500",
  display: "swap",
});

interface Props {
  companydesc: string;
  paymentdesc: string;
  browseheading: string;
  home: string;
  hotels: string;
  trips: string;
  excursions: string;
  contact: string;
  services: string;
  firstservice: string;
  secondservice: string;
  thirdservice: string;
  address: string;
  phone: string;
  email: string;
}

function Footer({
  companydesc,
  paymentdesc,
  browseheading,
  home,
  hotels,
  trips,
  excursions,
  contact,
  services,
  firstservice,
  secondservice,
  thirdservice,
  address,
  phone,
  email,
}: Props) {
  return (
    <footer className={styles.footeralign}>
      <div className={styles.footerfirstsection}>
        <div className={styles.company}>
          <div className={styles.logo}>
            <span className={styles.secondarycolor}>
              <span className={robotoBold.className}>Extra Virgin</span>
            </span>
            <span className={styles.maincolor}>
              <span className={lora.className}>TRAVEL</span>
            </span>
          </div>
          <div className={styles.companydesc}>
            <p className={roboto.className}>{companydesc}</p>
            <a
              href="https://www.iata.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={iata} alt={"iata"} />
            </a>
            <p className={roboto.className}>{paymentdesc}</p>
            <div className={styles.paymentimage}>
              <Image src={payment} alt={"payment methods"} />
            </div>
          </div>
        </div>
        <div className={styles.browse}>
          <div className={styles.browseheading}>
            <span className={roboto.className}>{browseheading}</span>
          </div>
          <div className={styles.links}>
            <ul>
              <li>
                <Link href="/" className={roboto.className}>
                  {home}
                </Link>
              </li>
              <li>
                <Link href="/hotels" className={roboto.className}>
                  {hotels}
                </Link>
              </li>
              <li>
                <Link href="/trips" className={roboto.className}>
                  {trips}
                </Link>
              </li>
              <li>
                <Link href="/excursions" className={roboto.className}>
                  {excursions}
                </Link>
              </li>
              <li>
                <Link href="/contact" className={roboto.className}>
                  {contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.services}>
          <div className={styles.servicesheading}>
            <div className={roboto.className}>{services}</div>
            <div className={styles.serviceslist}>
              <ul>
                <li className={roboto.className}>{firstservice}</li>
                <li className={roboto.className}>{secondservice}</li>
                <li className={roboto.className}>{thirdservice}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.contact}>
          <div className={styles.contactheading}>
            <div className={roboto.className}>{contact}</div>
          </div>
          <div className={styles.contactlist}>
            <ul>
              <li className={roboto.className}>
                {address} : <br />
                Imm Jebli Centre, Av de Carthage,
                <br /> Rte de Gremda km 0.5, Mezanine bur N°4, 3027 Sfax El
                Jadida
              </li>
              <li className={roboto.className}>
                {phone} : <br />
                +216 72 032 183
              </li>
              <li className={roboto.className}>
                {email} : <br />
                extravirgintravel@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.dev}>
        <p className={lora.className}>
          Copyright © 2023. Devs:{" "}
          <a
            href="https://github.com/Muhamedissaoui"
            target="_blank"
            rel="noopener noreferrer"
          >
            Issaoui Muhamed Aziz{" "}
          </a>
          /{" "}
          <a
            href="https://github.com/Muhamedissaoui"
            target="_blank"
            rel="noopener noreferrer"
          >
            Touati Aymen
          </a>
          .
        </p>
        <a
          title="facebook page"
          href="https://www.facebook.com/extravirgintravel"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg name="facebook" viewBox="0 0 50 50" width="20px" height="20px">
            <path
              fill="currentColor"
              d="M 25 3 C 12.861562 3 3 12.861562 3 25 C 3 36.019135 11.127533 45.138355 21.712891 46.728516 L 22.861328 46.902344 L 22.861328 29.566406 L 17.664062 29.566406 L 17.664062 26.046875 L 22.861328 26.046875 L 22.861328 21.373047 C 22.861328 18.494965 23.551973 16.599417 24.695312 15.410156 C 25.838652 14.220896 27.528004 13.621094 29.878906 13.621094 C 31.758714 13.621094 32.490022 13.734993 33.185547 13.820312 L 33.185547 16.701172 L 30.738281 16.701172 C 29.349697 16.701172 28.210449 17.475903 27.619141 18.507812 C 27.027832 19.539724 26.84375 20.771816 26.84375 22.027344 L 26.84375 26.044922 L 32.966797 26.044922 L 32.421875 29.564453 L 26.84375 29.564453 L 26.84375 46.929688 L 27.978516 46.775391 C 38.71434 45.319366 47 36.126845 47 25 C 47 12.861562 37.138438 3 25 3 z M 25 5 C 36.057562 5 45 13.942438 45 25 C 45 34.729791 38.035799 42.731796 28.84375 44.533203 L 28.84375 31.564453 L 34.136719 31.564453 L 35.298828 24.044922 L 28.84375 24.044922 L 28.84375 22.027344 C 28.84375 20.989871 29.033574 20.060293 29.353516 19.501953 C 29.673457 18.943614 29.981865 18.701172 30.738281 18.701172 L 35.185547 18.701172 L 35.185547 12.009766 L 34.318359 11.892578 C 33.718567 11.811418 32.349197 11.621094 29.878906 11.621094 C 27.175808 11.621094 24.855567 12.357448 23.253906 14.023438 C 21.652246 15.689426 20.861328 18.170128 20.861328 21.373047 L 20.861328 24.046875 L 15.664062 24.046875 L 15.664062 31.566406 L 20.861328 31.566406 L 20.861328 44.470703 C 11.816995 42.554813 5 34.624447 5 25 C 5 13.942438 13.942438 5 25 5 z"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
