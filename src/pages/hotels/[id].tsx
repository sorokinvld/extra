import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Hotel.module.css";
import axios from "axios";
import { Roboto, Lora } from "@next/font/google";
import Image from "next/image";
import { useState } from "react";
import ReserveBar from "@/components/Reservebar/Reservebar";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import HotelMap from "@/components/HotelMap/HotelMap";
import { Link } from "react-scroll";
import { useRouter } from "next/router";
import RoomCard from "@/components/RoomCard/RoomCard";
import Footer from "@/components/Footer/Footer";
import Modal from "@/components/Modal/Modal";
import Carousel from "@/components/Carousel/Carousel";

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

export default function Hotel({ data, params }: any) {
  const { t } = useTranslation("hotel");
  const { t: ft } = useTranslation("footer");
  const { t: nav } = useTranslation("navbar");
  const { t: sb } = useTranslation("searchbar");
  const { query, isFallback, locale } = useRouter();
  const images = ["1", "2", "3", "4", "5", "6"];
  const rooms = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const reviews = 7;
  const [hovered, setHovered] = useState<number>(-1);
  const [selected, setSelected] = useState<number>(-1);
  const [showReviewsModal, setShowReviewsModal] = useState<boolean>(false);
  const [showImagesModal, setShowImagesModal] = useState<boolean>(false);

  if (isFallback) {
    return <div>Loading please wait...</div>;
  }

  const stars = Number(data.star);
  return (
    <>
      <Head>
        <title>{data.name_en}</title>
        <meta
          name="description"
          content={data.name_en + " hotel page. " + data.desc_en}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        currentPage={""}
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
        <main className={styles.container}>
          <p className={lora.className}>
            <Link
              to="reviews"
              spy={true}
              smooth={false}
              offset={-100}
              duration={500}
            >
              {reviews} {t("reviews")}
            </Link>{" "}
            ·{" "}
            <Link
              to="map"
              spy={true}
              smooth={false}
              offset={-230}
              duration={500}
            >
              {data.location}
            </Link>
          </p>
          {locale == "en" && (
            <h1 className={robotoBold.className}>{data.name_en}</h1>
          )}
          {locale == "fr" && (
            <h1 className={robotoBold.className}>{data.name_fr}</h1>
          )}
          {locale == "ar" && (
            <h1 className={robotoBold.className}>{data.name_ar}</h1>
          )}
          <div className={styles.stars}>
            {Array.from({ length: stars }).map((_, index: number) => (
              <svg height="20" viewBox="0 96 960 960" width="20" key={index}>
                <path
                  fill="currentColor"
                  d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                />
              </svg>
            ))}
          </div>
          <section className={styles.images}>
            {images.map((mock: any, index: number) => {
              if (index < 5)
                return (
                  <div
                    className={styles.image}
                    first-image={index == 0 ? "true" : ""}
                    last-first-col-image={index == 2 ? "true" : ""}
                    last-image={index == 4 ? "true" : ""}
                    key={index}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(-1)}
                    onClick={() => {
                      setSelected(index);
                      setShowImagesModal(true);
                    }}
                  >
                    <div
                      className={styles.overlay}
                      shown-state={hovered == index ? "true" : ""}
                    />
                    <Image
                      src={data.image}
                      alt={mock + "hotel images"}
                      fill
                      priority
                      sizes={"100%"}
                    />
                  </div>
                );
            })}
            <button
              className={styles.imagebtn}
              onClick={() => {
                setSelected(0);
                setShowImagesModal(true);
              }}
            >
              <span className={robotoBold.className}>{t("showallphotos")}</span>
            </button>
          </section>
          <section className={styles.mobileimages}>
            <Carousel slides={images.length} selected={0}>
              {images.map((mock: any, index: number) => {
                return (
                  <div key={index} className={styles.imageshowcase}>
                    <Image
                      src={data.image}
                      alt={mock + "hotel images"}
                      width={1000}
                      height={500}
                      priority
                    />
                  </div>
                );
              })}
            </Carousel>
          </section>
          <section className={styles.buttoncontainer}>
            <h2 className={robotoBold.className}>{t("skip")}</h2>
            <Link
              to="rooms"
              spy={true}
              smooth={false}
              offset={-120}
              duration={500}
            >
              <button className={styles.reserveroombtn}>
                <span className={robotoBold.className}>{t("reserveroom")}</span>
              </button>
            </Link>
          </section>
          <section className={styles.hoteldetails}>
            <h2 className={robotoBold.className}>{t("know")}</h2>
            <div className={styles.hoteldesc}>
              {locale == "en" && (
                <span className={lora.className}>{data.desc_en}</span>
              )}
              {locale == "fr" && (
                <span className={lora.className}>{data.desc_fr}</span>
              )}
              {locale == "ar" && (
                <span className={lora.className}>{data.desc_ar}</span>
              )}
            </div>
            <div className={styles.amenities}>
              <span className={robotoBold.className}>{t("amenities")}</span>
              <div className={styles.amenitieslist}>
                {data.amentites.map((amenity: any, index: number) => (
                  <div key={index} className={styles.amenitiesitem}>
                    <svg
                      height="24"
                      width="24"
                      className={robotoBold.className}
                    >
                      <path
                        fill="currentColor"
                        d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"
                      />
                    </svg>
                    {locale == "en" && (
                      <span className={lora.className}>{amenity.title_en}</span>
                    )}
                    {locale == "fr" && (
                      <span className={lora.className}>{amenity.title_fr}</span>
                    )}
                    {locale == "ar" && (
                      <span className={lora.className}>{amenity.title_ar}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.amenities}>
              <span className={robotoBold.className}>{t("near")}</span>
              <div className={styles.amenitieslist}>
                {data.nearby.map((nearby: any, index: number) => (
                  <div key={index} className={styles.amenitiesitem}>
                    <svg height="24" viewBox="0 96 960 960" width="24">
                      <path
                        fill="currentColor"
                        d="M480 550q23 0 38.5-15.5T534 496q0-23-15.5-38.5T480 442q-23 0-38.5 15.5T426 496q0 23 15.5 38.5T480 550Zm0 367q126-108 196-222.5T746 504q0-121-77-197.5T480 230q-112 0-189 76.5T214 504q0 76 70 190.5T480 917Zm0 39Q331 822 258.5 707.5T186 504q0-138 89-220t205-82q116 0 205 82t89 220q0 89-72.5 203.5T480 956Zm0-452Z"
                      />
                    </svg>
                    {locale == "en" && (
                      <span className={lora.className}>{nearby.title_en}</span>
                    )}
                    {locale == "fr" && (
                      <span className={lora.className}>{nearby.title_fr}</span>
                    )}
                    {locale == "ar" && (
                      <span className={lora.className}>{nearby.title_ar}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className={styles.reviewsection}>
            <h2 className={robotoBold.className} id="reviews">
              9.0/10 · {reviews} {t("reviews")}
            </h2>
            <div className={styles.reviews}>
              {Array.from({ length: reviews }).map((_, index: number) => {
                if (index < 6)
                  return (
                    <div key={index}>
                      <ReviewCard
                        image={data.image}
                        name={"dani"}
                        date={"28/03/2023"}
                        review={"Wow that's really cool!"}
                      />
                    </div>
                  );
              })}
              {reviews > 6 ? (
                <button
                  className={styles.reviewbtn}
                  onClick={() => setShowReviewsModal(true)}
                >
                  <span className={robotoBold.className}>
                    {t("showallreviews")}
                  </span>
                </button>
              ) : null}
            </div>
          </section>
          <section className={styles.roomsection}>
            <h2 className={robotoBold.className} id="rooms">
              {t("chooseroom")}
            </h2>
            <ReserveBar
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
              guestAdult={sb("guestadults")}
              guestChildren={sb("guestchildren")}
              guestRooms={sb("guestrooms")}
              checkinPlaceholder={query.startDate}
              checkoutPlaceholder={query.endDate}
              adultPlaceholder={query.adults}
              childrenPlaceholder={query.childrens}
              roomsPlaceholder={query.rooms}
            />
            <div className={styles.rooms}>
              {rooms.map((mock: any, index: number) => (
                <div key={index}>
                  <RoomCard
                    name="Single Room"
                    price="50"
                    reserve={t("reserve")}
                    night={t("night")}
                  />
                </div>
              ))}
            </div>
          </section>
          <section className={styles.mapsection} id="map">
            <h2 className={robotoBold.className}>{t("location")}</h2>
            <p className={lora.className}>{data.location}</p>
            <div className={styles.map}>
              <HotelMap hotel={data} />
            </div>
          </section>
          <Modal
            onClose={() => setShowImagesModal(false)}
            show={showImagesModal}
            setShow={setShowImagesModal}
            title={t("images")}
          >
            <Carousel
              slides={images.length}
              selected={selected != -1 ? selected : 0}
            >
              {images.map((mock: any, index: number) => {
                return (
                  <div key={index} className={styles.imageshowcase}>
                    <Image
                      src={data.image}
                      alt={mock + "hotel images"}
                      width={1000}
                      height={500}
                      priority
                    />
                  </div>
                );
              })}
            </Carousel>
          </Modal>
          <Modal
            onClose={() => setShowReviewsModal(false)}
            show={showReviewsModal}
            setShow={setShowReviewsModal}
            title={t("reviews")}
          >
            <div className={styles.allreviews}>
              {Array.from({ length: reviews }).map((_, index: number) => {
                return (
                  <div key={index}>
                    <ReviewCard
                      image={data.image}
                      name={"dani"}
                      date={"28/03/2023"}
                      review={"Wow that's really cool!"}
                    />
                  </div>
                );
              })}
            </div>
          </Modal>
        </main>
        <Footer
          companydesc={ft("companydesc")}
          paymentdesc={ft("paymentdesc")}
          browseheading={ft("browseheading")}
          home={ft("home")}
          hotels={ft("hotels")}
          trips={ft("trips")}
          excursions={ft("excursions")}
          contact={ft("contact")}
          services={ft("services")}
          firstservice={ft("firstservice")}
          secondservice={ft("secondservice")}
          thirdservice={ft("thirdservice")}
          address={ft("address")}
          phone={ft("phone")}
          email={ft("email")}
        />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  if (!locale) {
    return {
      notFound: true,
    };
  }
  const data = await axios
    .get(`http://localhost:3000/api/Hotel/${params.id}`)
    .then((response) => response.data);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "navbar",
        "searchbar",
        "footer",
        "hotel",
      ])),
      data,
      params,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const data = await axios
    .get("http://localhost:3000/api/getHotel")
    .then((response) => response.data);
  if (!locales) {
    const paths = data.flatMap((hotel: any) => {
      return {
        params: { id: hotel._id },
      };
    });
    return {
      paths,
      fallback: true,
    };
  } else {
    const paths = data.flatMap((hotel: any) => {
      return locales.map((locale) => {
        return {
          params: { id: hotel._id },
          locale: locale,
        };
      });
    });
    return {
      paths: paths,
      fallback: true,
    };
  }
};
