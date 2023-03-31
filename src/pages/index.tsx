import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import Banner from "@/components/Banner/Banner";
import { Layout } from "@/components/Layout";
import Footer from "@/components/Footer/Footer";
import { Roboto, Lora } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import HotelCard from "@/components/HotelCard/HotelCard";
import Image from "next/image";
import TripCard from "@/components/TripCard/TripCard";
import { useRef, useState, useEffect } from "react";
import { useParallax } from "react-scroll-parallax";
import TourRight from "@/components/TourShowCaseRight/TourRight";
import TourLeft from "@/components/TourShowCaseLeft/TourLeft";
import AOS from "aos";
import { z } from "zod";
import image from "public/images/greece.jpg";
import swimage from "public/images/starwards.jpg";
import bgimage from "public/images/mountain-cutout.webp";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import MailchimpSubscribe from "react-mailchimp-subscribe";

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

export default function Home({ hotels, destinations, trips }: any) {
  const { t: nav } = useTranslation("navbar");
  const { t: sb } = useTranslation("searchbar");
  const { t } = useTranslation("home");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<boolean>(false);
  const [email, setEmail] = useState<SubcriptionSchemaType>({
    email: "",
  });
  const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

  const subscriptionSchema = z.object({
    email: z.string().email(),
  });

  type SubcriptionSchemaType = z.infer<typeof subscriptionSchema>;

  const handleScrollLeft = () => {
    scrollRef.current!.scrollBy(-382, 0);
  };
  const handleScrollRight = () => {
    scrollRef.current!.scrollBy(382, 0);
  };
  const handleScroll = () => {
    if (
      scrollRef.current!.scrollWidth - scrollRef.current!.scrollLeft ==
      scrollRef.current!.scrollWidth
    ) {
      setShown(false);
    } else {
      setShown(true);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const { ref } = useParallax<HTMLDivElement>({ speed: 20 });

  return (
    <>
      <Head>
        <title>Extra Virgin Travel</title>
        <meta
          name="description"
          content="a travel agency that ensures the service you'll need to make the best memories."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        currentPage={nav("home")}
        home={nav("home")}
        hotels={nav("hotels")}
        trips={nav("trips")}
        tours={nav("tours")}
        contact={nav("contact")}
        login={nav("login")}
        menu={nav("menu")}
        signup={nav("signup")}
      >
        <Banner
          headinglabel={t("headinglabel")}
          location={sb("location")}
          subLocation={sb("subLocation")}
          dates={sb("dates")}
          checkin={sb("checkin")}
          checkout={sb("checkout")}
          guests={sb("guests")}
          adult={sb("adult")}
          adults={sb("adults")}
          child={sb("child")}
          childrenn={sb("children")}
          room={sb("room")}
          rooms={sb("rooms")}
          guestAdults={sb("guestadults")}
          guestChildren={sb("guestchildren")}
          guestRooms={sb("guestrooms")}
          destinationNullError={sb("destinationnullerror")}
          searchLocation={sb("search")}
        />
        <main className={styles.main}>
          <section className={styles.section} id="parent">
            <h2
              className={robotoBold.className}
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-anchor="parent"
            >
              {t("destinationsec")}
            </h2>
            <div>
              <div className={styles.destinations}>
                {destinations
                  .slice(0, 4)
                  .map((destination: any, index: number) => (
                    <div
                      key={destination.id}
                      data-aos="fade-up"
                      data-aos-duration="400"
                      data-aos-delay={((Number(index) + 1) * 50).toString()}
                      data-aos-anchor="parent"
                    >
                      <div className={styles.destination}>
                        <svg height="24" viewBox="0 96 960 960" width="24">
                          <path
                            fill="currentColor"
                            d="M480 550q23 0 38.5-15.5T534 496q0-23-15.5-38.5T480 442q-23 0-38.5 15.5T426 496q0 23 15.5 38.5T480 550Zm0 367q126-108 196-222.5T746 504q0-121-77-197.5T480 230q-112 0-189 76.5T214 504q0 76 70 190.5T480 917Zm0 39Q331 822 258.5 707.5T186 504q0-138 89-220t205-82q116 0 205 82t89 220q0 89-72.5 203.5T480 956Zm0-452Z"
                          />
                        </svg>
                        <span className={robotoBold.className}>
                          {destination.name}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
              <div className={styles.destinations}>
                {destinations
                  .slice(4)
                  .map((destination: any, index: number) => (
                    <div
                      key={destination.id}
                      data-aos="fade-up"
                      data-aos-duration="400"
                      data-aos-delay={(
                        (Number(index) + 1) * 50 +
                        200
                      ).toString()}
                      data-aos-anchor="parent"
                    >
                      <div className={styles.destination}>
                        <svg height="24" viewBox="0 96 960 960" width="24">
                          <path
                            fill="currentColor"
                            d="M480 550q23 0 38.5-15.5T534 496q0-23-15.5-38.5T480 442q-23 0-38.5 15.5T426 496q0 23 15.5 38.5T480 550Zm0 367q126-108 196-222.5T746 504q0-121-77-197.5T480 230q-112 0-189 76.5T214 504q0 76 70 190.5T480 917Zm0 39Q331 822 258.5 707.5T186 504q0-138 89-220t205-82q116 0 205 82t89 220q0 89-72.5 203.5T480 956Zm0-452Z"
                          />
                        </svg>
                        <span className={robotoBold.className}>
                          {destination.name}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
          <section className={styles.recommendationsection}>
            <h2
              className={robotoBold.className}
              data-aos="fade-up"
              data-aos-duration="500"
            >
              {t("recommendationsec")}
            </h2>
            <span
              className={lora.className}
              data-aos="zoom-out"
              data-aos-duration="500"
            >
              <span>{t("recfirstquote")}</span>
              <span>{t("recsecondquote")}</span>
            </span>
            <div className={styles.recommended}>
              {hotels.slice(0, 3).map((hotel: any, index: number) => (
                <div
                  key={hotel.id}
                  data-aos="fade-up"
                  data-aos-duration="500"
                  data-aos-delay={((Number(index) + 1) * 100).toString()}
                >
                  <HotelCard
                    id={hotel.id}
                    rating={hotel.rating}
                    imageSrc={image.src}
                    name={hotel.name}
                    stars={hotel.stars}
                    location={hotel.location}
                    priceindinar={hotel.priceindinar}
                    priceineuro={hotel.priceineuro}
                    priceindollar={hotel.priceindollar}
                    pernight={t("pernight")}
                  />
                </div>
              ))}
            </div>
          </section>
          <section className={styles.tripsection}>
            <div className={styles.tripbackground} />
            <div className={styles.tripcontainer}>
              <h2
                className={robotoBold.className}
                data-aos="fade-up"
                data-aos-duration="500"
              >
                {t("tripsec")}
              </h2>
            </div>
            <div
              ref={scrollRef}
              className={styles.trips}
              onScroll={handleScroll}
            >
              <div className={styles.tripquote}>
                <span
                  className={robotoBold.className}
                  data-aos="fade-right"
                  data-aos-duration="500"
                >
                  {t("tripfirstquote")}
                </span>
                <span
                  className={lora.className}
                  data-aos="fade-right"
                  data-aos-duration="500"
                  data-aos-delay="50"
                >
                  {t("tripsecondquote")}
                </span>
                <span
                  className={lora.className}
                  data-aos="fade-right"
                  data-aos-duration="500"
                  data-aos-delay="100"
                >
                  {t("tripthirdquotefirst")}
                  <br />
                  {t("tripthirdquotesecond")}
                </span>
              </div>
              <div className={styles.tripcards}>
                {trips.map((trip: any, index: any) => (
                  <div
                    key={trip.id}
                    data-aos="fade-left"
                    data-aos-duration="500"
                    data-aos-delay={((Number(index) + 1) * 100).toString()}
                  >
                    <TripCard
                      image={image.src}
                      location={trip.location}
                      name={trip.name}
                      description={trip.description}
                      price={trip.price}
                      discover={t("discover")}
                      from={t("from")}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.button} onClick={handleScrollRight}>
                <button />
                <svg height="25" viewBox="0 96 960 960" width="25">
                  <path
                    fill="currentColor"
                    d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"
                  />
                </svg>
              </div>
              <div
                className={styles.buttonleft}
                onClick={handleScrollLeft}
                shown-state={shown ? "shown" : ""}
              >
                <button />
                <svg height="25" viewBox="0 96 960 960" width="25">
                  <path
                    fill="currentColor"
                    d="M561 816 320 575l241-241 43 43-198 198 198 198-43 43Z"
                  />
                </svg>
              </div>
            </div>
          </section>
          <section className={styles.toursection}>
            <div className={styles.tripcontainer}>
              <h2
                className={robotoBold.className}
                data-aos="fade-up"
                data-aos-duration="500"
              >
                {t("toursec")}
              </h2>
            </div>
            <TourRight
              image={swimage.src}
              tourname={"EXTRA VIRGIN STAR WARS TOUR"}
              tourdesc={
                "the 6-day Star Wars tour is the ideal tour for Saga lovers to travel in the footsteps of Georges Lucas and Skywalker in southern Tunisia! Between the island of Djerba, Tataouine Matmata and Tozeur, you will visit all the Star Wars filming locations! You will visit the Ksours which served as slave quarters, the House of Ben and that of Lars, you will discover the Igloo in the middle of the salt lake and the village Mos Espa considered the largest Star Wars site in Tunisia"
              }
              seemore={t("seemore")}
            />
            <TourLeft
              image={swimage.src}
              tourname={"EXTRA VIRGIN STAR WARS TOUR"}
              tourdesc={
                "the 6-day Star Wars tour is the ideal tour for Saga lovers to travel in the footsteps of Georges Lucas and Skywalker in southern Tunisia! Between the island of Djerba, Tataouine Matmata and Tozeur, you will visit all the Star Wars filming locations! You will visit the Ksours which served as slave quarters, the House of Ben and that of Lars, you will discover the Igloo in the middle of the salt lake and the village Mos Espa considered the largest Star Wars site in Tunisia"
              }
              seemore={t("seemore")}
            />
            <TourRight
              image={swimage.src}
              tourname={"EXTRA VIRGIN STAR WARS TOUR"}
              tourdesc={
                "the 6-day Star Wars tour is the ideal tour for Saga lovers to travel in the footsteps of Georges Lucas and Skywalker in southern Tunisia! Between the island of Djerba, Tataouine Matmata and Tozeur, you will visit all the Star Wars filming locations! You will visit the Ksours which served as slave quarters, the House of Ben and that of Lars, you will discover the Igloo in the middle of the salt lake and the village Mos Espa considered the largest Star Wars site in Tunisia"
              }
              seemore={t("seemore")}
            />
          </section>
          <MailchimpSubscribe
            url={MAILCHIMP_URL!}
            render={(props) => {
              const { subscribe, status } = props || {};
              return (
                <section className={styles.imagesection}>
                  <div className={styles.imagecontainer} ref={ref}>
                    <Image src={bgimage} alt="parallax background image" fill />
                  </div>
                  <div className={styles.imagecontainer}>
                    <Image
                      src="https://res.cloudinary.com/db57xeoce/image/upload/v1678365103/footer-clouds_bz84w7.png"
                      alt="cloud image"
                      fill
                    />
                    <h2
                      className={lora.className}
                      data-aos="zoom-out"
                      data-aos-duration="500"
                    >
                      {t("subsec")}
                    </h2>
                    <p
                      className={robotoBold.className}
                      data-aos="fade-right"
                      data-aos-duration="500"
                    >
                      {t("subquote")}
                    </p>
                    <input
                      value={email.email}
                      data-aos="fade-up"
                      data-aos-duration="200"
                      placeholder="Email"
                      type="email"
                      onChange={(e) => setEmail({ email: e.target.value })}
                    />
                    <p
                      className={styles.error}
                      data-aos="fade-up"
                      data-aos-duration="200"
                    >
                      <span className={robotoBold.className}>
                        {status === "error" && t("emailerror")}
                      </span>
                    </p>
                    <p
                      className={styles.success}
                      data-aos="fade-up"
                      data-aos-duration="200"
                    >
                      <span className={robotoBold.className}>
                        {status === "success" && t("successub")}
                      </span>
                    </p>
                    {status === "sending" ? (
                      <button
                        className={styles.imagebutton}
                        data-aos="fade-up"
                        data-aos-duration="200"
                        disabled={true}
                      >
                        <CircularProgress sx={{ color: "grey" }} size={25} />
                      </button>
                    ) : (
                      <button
                        className={styles.imagebutton}
                        data-aos="fade-up"
                        data-aos-duration="200"
                        onClick={() =>
                          subscribe({
                            EMAIL: email.email,
                          })
                        }
                      >
                        <span className={robotoBold.className}>{t("sub")}</span>
                      </button>
                    )}
                  </div>
                </section>
              );
            }}
          />
        </main>
      </Layout>
      <Footer
        companydesc={t("companydesc")}
        paymentdesc={t("paymentdesc")}
        browseheading={t("browseheading")}
        home={t("home")}
        hotels={t("hotels")}
        trips={t("trips")}
        excursions={t("excursions")}
        contact={t("contact")}
        services={t("services")}
        firstservice={t("firstservice")}
        secondservice={t("secondservice")}
        thirdservice={t("thirdservice")}
        address={t("address")}
        phone={t("phone")}
        email={t("email")}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const hotels = await axios
    .get(`http://localhost:5000/hotels`)
    .then((response) => response.data);
  const destinations = await axios
    .get(`http://localhost:5000/destination`)
    .then((response) => response.data);
  const trips = await axios
    .get(`http://localhost:5000/trips`)
    .then((response) => response.data);
  if (!locale) {
    return {
      props: {
        notFound: true,
      },
    };
  }
  if (!hotels) {
    return {
      notFound: true,
    };
  }
  if (!destinations) {
    return {
      notFound: true,
    };
  }
  if (!trips) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "navbar",
        "home",
        "searchbar",
      ])),
      hotels,
      destinations,
      trips,
    },
  };
};
