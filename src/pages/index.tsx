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
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { useRouter } from "next/router";
import { useUser } from "@/utils/userProvider";
import { useRecommendation } from "@/hooks/useRecommendation";

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

export default function Home({ hotels, destinations, trips, tours }: any) {
  const { t: nav } = useTranslation("navbar");
  const { t: sb } = useTranslation("searchbar");
  const { t } = useTranslation("home");
  const emailPlaceholder = t("email");
  const { locale } = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<boolean>(false);
  const [email, setEmail] = useState<SubcriptionSchemaType>({
    email: "",
  });
  const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
  const { user } = useUser();

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

  const { recommendation, loading, error } = useRecommendation();

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
        welcome={nav("welcome")}
        ph={nav("ph")}
        fav={nav("fav")}
        rev={nav("rev")}
        lg={nav("lg")}
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
          destinationinvalid={sb("destinationinvalid")}
          destinationinvalidError={sb("destinationinvaliderror")}
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
                      key={destination._id}
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
                        {locale == "en" && (
                          <span className={robotoBold.className}>
                            {destination.city_en}, {destination.country_en}
                          </span>
                        )}
                        {locale == "fr" && (
                          <span className={robotoBold.className}>
                            {destination.city_fr}, {destination.country_fr}
                          </span>
                        )}
                        {locale == "ar" && (
                          <span className={robotoBold.className}>
                            {destination.city_ar}, {destination.country_ar}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
              <div className={styles.destinations}>
                {destinations
                  .slice(4, 6)
                  .map((destination: any, index: number) => (
                    <div
                      key={destination._id}
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
                        {locale == "en" && (
                          <span className={robotoBold.className}>
                            {destination.city_en}, {destination.country_en}
                          </span>
                        )}
                        {locale == "fr" && (
                          <span className={robotoBold.className}>
                            {destination.city_fr}, {destination.country_fr}
                          </span>
                        )}
                        {locale == "ar" && (
                          <span className={robotoBold.className}>
                            {destination.city_ar}, {destination.country_ar}
                          </span>
                        )}
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
            {user ? (
              <div className={styles.recommended}>
                {loading ? (
                  <div className={styles.loading}>
                    <CircularProgress sx={{ color: "#2d8172" }} />
                  </div>
                ) : (
                  <>
                    {error ? (
                      <div className={styles.loading}>
                        <span className={lora.className}>{error}</span>
                      </div>
                    ) : (
                      <>
                        {recommendation?.map((hotel: any, index: number) => (
                          <div
                            key={JSON.parse(JSON.stringify(hotel._id)).$oid}
                            data-aos="fade-up"
                            data-aos-duration="500"
                            data-aos-delay={(
                              (Number(index) + 1) *
                              100
                            ).toString()}
                          >
                            {locale == "en" && (
                              <HotelCard
                                id={hotel._id}
                                rating={"9"}
                                imageSrc={hotel.image}
                                name={hotel.name_en}
                                stars={hotel.star}
                                location={"Sousse"}
                                country={"Tunisia"}
                              />
                            )}
                            {locale == "fr" && (
                              <HotelCard
                                id={hotel._id}
                                rating={"9"}
                                imageSrc={hotel.image}
                                name={hotel.name_fr}
                                stars={hotel.star}
                                location={"Sousse"}
                                country={"Tunisia"}
                              />
                            )}
                            {locale == "ar" && (
                              <HotelCard
                                id={hotel._id}
                                rating={"9"}
                                imageSrc={hotel.image}
                                name={hotel.name_ar}
                                stars={hotel.star}
                                location={"Sousse"}
                                country={"Tunisia"}
                              />
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            ) : (
              <>
                {loading ? (
                  <div className={styles.loading}>
                    <CircularProgress />
                  </div>
                ) : (
                  <div className={styles.recommended}>
                    {hotels.slice(0, 3).map((hotel: any, index: number) => (
                      <div
                        key={hotel._id}
                        data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-delay={((Number(index) + 1) * 100).toString()}
                      >
                        {locale == "en" && (
                          <HotelCard
                            id={hotel._id}
                            rating={"9"}
                            imageSrc={hotel.image}
                            name={hotel.name_en}
                            stars={hotel.star}
                            location={"Sousse"}
                            country={"Tunisia"}
                          />
                        )}
                        {locale == "fr" && (
                          <HotelCard
                            id={hotel._id}
                            rating={"9"}
                            imageSrc={hotel.image}
                            name={hotel.name_fr}
                            stars={hotel.star}
                            location={"Sousse"}
                            country={"Tunisia"}
                          />
                        )}
                        {locale == "ar" && (
                          <HotelCard
                            id={hotel._id}
                            rating={"9"}
                            imageSrc={hotel.image}
                            name={hotel.name_ar}
                            stars={hotel.star}
                            location={"Sousse"}
                            country={"Tunisia"}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
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
                {trips.Product.map((trip: any, index: any) => (
                  <div
                    key={trip._id}
                    data-aos="fade-left"
                    data-aos-duration="500"
                    data-aos-delay={((Number(index) + 1) * 100).toString()}
                  >
                    {locale == "en" && (
                      <TripCard
                        id={trip._id}
                        image={trip.image}
                        location={trip.location}
                        name={trip.title_en}
                        description={trip.desc_en}
                        priceDt={trip.priceDt}
                        priceEuro={trip.priceEuro}
                        priceDollar={trip.priceEuro}
                        discover={t("discover")}
                        from={t("from")}
                      />
                    )}
                    {locale == "fr" && (
                      <TripCard
                        id={trip._id}
                        image={trip.image}
                        location={trip.location}
                        name={trip.title_fr}
                        description={trip.desc_fr}
                        priceDt={trip.priceDt}
                        priceEuro={trip.priceEuro}
                        priceDollar={trip.priceEuro}
                        discover={t("discover")}
                        from={t("from")}
                      />
                    )}
                    {locale == "ar" && (
                      <TripCard
                        id={trip._id}
                        image={trip.image}
                        location={trip.location}
                        name={trip.title_ar}
                        description={trip.desc_ar}
                        priceDt={trip.priceDt}
                        priceEuro={trip.priceEuro}
                        priceDollar={trip.priceEuro}
                        discover={t("discover")}
                        from={t("from")}
                      />
                    )}
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
            {tours.Product.map((tour: any, index: any) => {
              if (index % 2 == 0) {
                return (
                  <div key={tour._id}>
                    {locale == "en" && (
                      <TourRight
                        id={tour._id}
                        image={tour.image}
                        tourname={tour.title_en}
                        tourdesc={tour.desc_en}
                        seemore={t("seemore")}
                      />
                    )}
                    {locale == "fr" && (
                      <TourRight
                        id={tour._id}
                        image={tour.image}
                        tourname={tour.title_fr}
                        tourdesc={tour.desc_fr}
                        seemore={t("seemore")}
                      />
                    )}
                    {locale == "ar" && (
                      <TourRight
                        id={tour._id}
                        image={tour.image}
                        tourname={tour.title_ar}
                        tourdesc={tour.desc_ar}
                        seemore={t("seemore")}
                      />
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={tour._id}>
                    {locale == "en" && (
                      <TourLeft
                        id={tour._id}
                        image={tour.image}
                        tourname={tour.title_en}
                        tourdesc={tour.desc_en}
                        seemore={t("seemore")}
                      />
                    )}
                    {locale == "fr" && (
                      <TourLeft
                        id={tour._id}
                        image={tour.image}
                        tourname={tour.title_fr}
                        tourdesc={tour.desc_fr}
                        seemore={t("seemore")}
                      />
                    )}
                    {locale == "ar" && (
                      <TourLeft
                        id={tour._id}
                        image={tour.image}
                        tourname={tour.title_ar}
                        tourdesc={tour.desc_ar}
                        seemore={t("seemore")}
                      />
                    )}
                  </div>
                );
              }
            })}
          </section>
          <MailchimpSubscribe
            url={MAILCHIMP_URL!}
            render={(props) => {
              const { subscribe, status } = props || {};
              return (
                <section className={styles.imagesection}>
                  <div className={styles.imagecontainer} ref={ref}>
                    <Image
                      src="https://res.cloudinary.com/db57xeoce/image/upload/v1678365301/mountain-cutout-2_hd8mmu.jpg"
                      alt="parallax background image"
                      fill
                    />
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
                      placeholder={emailPlaceholder}
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
    .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getHotel`)
    .then((response) => response.data);
  const destinations = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getDestination`)
    .then((response) => response.data);
  const trips = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getProductwithEvents/Trips`)
    .then((response) => response.data);
  const tours = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getProductwithEvents/Tours`)
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
      ...(await serverSideTranslations(
        locale,
        ["navbar", "home", "searchbar"],
        require("../../i18next.config")
      )),
      hotels,
      destinations,
      trips,
      tours,
    },
    revalidate: 10,
  };
};
