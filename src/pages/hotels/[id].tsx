import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Hotel.module.css";
import axios from "axios";
import { Roboto, Lora } from "@next/font/google";
import image from "public/images/greece.jpg";
import Image from "next/image";
import { useState } from "react";
import ReserveBar from "@/components/Reservebar/Reservebar";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import HotelMap from "@/components/HotelMap/HotelMap";
import { Link } from "react-scroll";
import { useRouter } from "next/router";

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
  const { t: nav } = useTranslation("navbar");
  const { t: sb } = useTranslation("searchbar");
  const { query } = useRouter();
  const images = ["1", "2", "3", "4", "5", "6"];
  const reviews = 7;
  const amenities = ["Wifi", "Free parking", "On private beach", "Pool"];
  const nearby = ["Airport", "Beach", "Musuem", "Hospital"];
  const [hovered, setHovered] = useState<number>(-1);
  const stars = Number(data[0].stars);

  return (
    <>
      <Head>
        <title>{data[0].name}</title>
        <meta
          name="description"
          content={data[0].name + " hotel page. " + data[0].desc}
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
      >
        <main className={styles.container}>
          <p className={lora.className}>
            <Link
              to="reviews"
              spy={true}
              smooth={false}
              offset={-250}
              duration={500}
            >
              {reviews} reviews
            </Link>{" "}
            ·{" "}
            <Link
              to="map"
              spy={true}
              smooth={false}
              offset={-230}
              duration={500}
            >
              {data[0].location}
            </Link>
          </p>
          <h1 className={robotoBold.className}>{data[0].name}</h1>
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
                  >
                    <div
                      className={styles.overlay}
                      shown-state={hovered == index ? "true" : ""}
                    />
                    <Image
                      src={image.src}
                      alt={mock + "hotel images"}
                      fill
                      priority
                      sizes={"100%"}
                    />
                  </div>
                );
            })}
            <button className={styles.imagebtn}>
              <span className={robotoBold.className}>Show all photos</span>
            </button>
          </section>
          <section className={styles.buttoncontainer}>
            <h2 className={robotoBold.className}>Skip to rooms ?</h2>
            <Link
              to="rooms"
              spy={true}
              smooth={false}
              offset={50}
              duration={500}
            >
              <button className={styles.reserveroombtn}>
                <span className={robotoBold.className}>Reserve a room</span>
              </button>
            </Link>
          </section>
          <section className={styles.hoteldetails}>
            <h2 className={robotoBold.className}>Know the hotel</h2>
            <div className={styles.hoteldesc}>
              <span className={lora.className}>{data[0].desc}</span>
            </div>
            <div className={styles.amenities}>
              <span className={robotoBold.className}>Amenities</span>
              <div className={styles.amenitieslist}>
                {amenities.map((amenity: any, index: number) => (
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
                    <span className={lora.className}>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.amenities}>
              <span className={robotoBold.className}>Near by</span>
              <div className={styles.amenitieslist}>
                {nearby.map((nearby: any, index: number) => (
                  <div key={index} className={styles.amenitiesitem}>
                    <svg height="24" viewBox="0 96 960 960" width="24">
                      <path
                        fill="currentColor"
                        d="M480 550q23 0 38.5-15.5T534 496q0-23-15.5-38.5T480 442q-23 0-38.5 15.5T426 496q0 23 15.5 38.5T480 550Zm0 367q126-108 196-222.5T746 504q0-121-77-197.5T480 230q-112 0-189 76.5T214 504q0 76 70 190.5T480 917Zm0 39Q331 822 258.5 707.5T186 504q0-138 89-220t205-82q116 0 205 82t89 220q0 89-72.5 203.5T480 956Zm0-452Z"
                      />
                    </svg>
                    <span className={lora.className}>{nearby}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className={styles.reviewsection} id="reviews">
            <h2 className={robotoBold.className}>9.0/10 · {reviews} reviews</h2>
            <div className={styles.reviews}>
              {Array.from({ length: reviews }).map((_, index: number) => {
                if (index < 6)
                  return (
                    <div key={index}>
                      <ReviewCard
                        image={image.src}
                        name={"dani"}
                        date={"28/03/2023"}
                        review={"Wow that's really cool!"}
                      />
                    </div>
                  );
              })}
              {reviews > 6 ? (
                <button className={styles.reviewbtn}>
                  <span className={robotoBold.className}>Show all reviews</span>
                </button>
              ) : null}
            </div>
          </section>
          <section className={styles.mapsection} id="map">
            <h2 className={robotoBold.className}>Where you’ll be</h2>
            <p className={lora.className}>{data[0].location}</p>
            <div className={styles.map}>
              <HotelMap hotel={data} />
            </div>
          </section>
          <section className={styles.roomsection} id="rooms">
            <h2 className={robotoBold.className}>Choose your room</h2>
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
          </section>
        </main>
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
    .get(`http://localhost:5000/hotels?id=${params.id}`)
    .then((response) => response.data);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["navbar", "searchbar"])),
      data,
      params,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await axios
    .get("http://localhost:5000/hotels")
    .then((response) => response.data);
  const paths = data.map((hotel: any) => {
    return {
      params: {
        id: `${hotel.id}`,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
