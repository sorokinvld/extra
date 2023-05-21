import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Hotels.module.css";
import HotelSearchbar from "@/components/HotelSearchBar/HotelSearchbar";
import { Roboto, Lora } from "@next/font/google";
import React from "react";
import HotelBox from "@/components/HotelBox/HotelBox";
import CustomMap from "@/components/Map/CustomMap";
import axios from "axios";
import Modal from "@/components/Modal/Modal";
import Slider from "@mui/material/Slider";
import CircularProgress from "@mui/material/CircularProgress";
import { useCurrency } from "@/utils/currencyProvider";
import Aos from "aos";
import StarCheckbox from "@/components/ui/StarCheckBox/StarCheckbox";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
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

export default function Hotels() {
  const { t } = useTranslation("hotels");
  const { t: nav } = useTranslation("navbar");
  const { t: sb } = useTranslation("searchbar");
  const [data, setData] = React.useState<any>();
  const [amenities, setAmenities] = React.useState<any>();
  const [hoveredLocation, setHoveredLocation] = React.useState<any>();
  const [shown, setShown] = React.useState<boolean>(true);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [stars, setStars] = React.useState<number[]>([]);
  const [amenitiesFilter, setAmenitiesFilter] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 1000]);
  const [maxPrice, setMaxPrice] = React.useState<number>(-1);
  const [loading, setLoading] = React.useState(true);
  const filterStars = ["2", "3", "4", "5"];
  const { currency } = useCurrency();
  const { query, locale } = useRouter();

  React.useEffect(() => {
    Aos.init();
    setMaxPrice(30000);
  }, []);

  React.useEffect(() => {
    setLoading(true);

    const data = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/Hotels?page=1&search=${query.destination}`
        );
        const amenitiesdata = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getAmenities`
        );
        setData(res.data);
        setAmenities(amenitiesdata.data);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
      }
    };
    if (query.destination) {
      data();
    }
  }, [query.destination]);

  React.useMemo(() => {
    if (data) setMaxPrice(-1);
  }, [data]);

  const onStarFilter = (star: any) => {
    if (stars.includes(star)) {
      const newArray = [];
      for (let i = 0; i < stars.length; i++) {
        if (stars[i] !== star) {
          newArray.push(stars[i]);
        }
      }
      setStars([]);
      setStars(newArray);
    } else {
      setStars([...stars, star]);
    }
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleAmenitiesFilter = (amenity: any) => {
    if (amenitiesFilter.includes(amenity)) {
      const newArray = [];
      for (let i = 0; i < amenitiesFilter.length; i++) {
        if (amenitiesFilter[i] !== amenity) {
          newArray.push(amenitiesFilter[i]);
        }
      }
      setAmenitiesFilter([]);
      setAmenitiesFilter(newArray);
    } else {
      setAmenitiesFilter([...amenitiesFilter, amenity]);
    }
  };

  return (
    <>
      <Head>
        <title>Extra Virgin Travel | Hotels</title>
        <meta
          name="description"
          content="check out the available hotels here."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        currentPage={nav("hotels")}
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
        <main className={styles.container} id="parent">
          <section
            className={styles.leftsection}
            show-state={shown ? "true" : "false"}
          >
            <div>
              <HotelSearchbar
                location={sb("location")}
                subLocation={sb("subLocation")}
                searchLocation={sb("search")}
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
                destinationNullError={sb("destinationnullerror")}
                destinationinvalid={sb("destinationinvalid")}
                destinationinvalidError={sb("destinationinvaliderror")}
                locationPlaceholder={query.destination}
                checkinPlaceholder={query.startDate}
                checkoutPlaceholder={query.endDate}
                adultPlaceholder={query.adults}
                childrenPlaceholder={query.children}
                roomsPlaceholder={query.rooms}
              />
              <div className={styles.header}>
                <div className={styles.title}>
                  <p className={lora.className}>{t("preheader")}</p>
                  <h1 className={robotoBold.className}>
                    {t("hotels")}{" "}
                    {query.destination ? (
                      <span>
                        {t("in")} {query.destination}
                      </span>
                    ) : null}
                  </h1>
                </div>
                <button
                  className={styles.button}
                  onClick={() => setShowModal(true)}
                >
                  <svg height="20" viewBox="0 96 960 960" width="20">
                    <path
                      fill="currentColor"
                      d="M443.642 925.999V713.18h50.255v81.487h336.102v50.255H493.897v81.077h-50.255Zm-313.641-81.077v-50.255h223.383v50.255H130.001Zm173.128-162.718v-81.077H130.001v-50.254h173.128v-81.898h50.255v213.229h-50.255Zm140.513-81.077v-50.254h386.357v50.254H443.642Zm162.974-162.564V226.001h50.255v81.077h173.128v50.255H656.871v81.23h-50.255Zm-476.615-81.23v-50.255h386.357v50.255H130.001Z"
                    />
                  </svg>
                  <span className={lora.className}>{t("filter")}</span>
                </button>
              </div>
              <div className={styles.hotels}>
                {loading ? (
                  <div className={styles.loading}>
                    <CircularProgress sx={{ color: "grey" }} />
                  </div>
                ) : (
                  <>
                    {data.Hotel.map((hotel: any, index: any) => (
                      <div
                        key={index}
                        onMouseOver={() => setHoveredLocation(hotel)}
                        onMouseLeave={() => setHoveredLocation(null)}
                        data-aos="fade-up"
                        data-aos-duration="400"
                        data-aos-delay={((Number(index) + 1) * 50).toString()}
                        data-aos-anchor="#parent"
                      >
                        <HotelBox
                          id={hotel.id}
                          image={hotel.image}
                          rating={"9"}
                          name={hotel.name_en}
                          desc={hotel.desc_en}
                          location={hotel.Hotel_Destination[0].city_en}
                          stars={hotel.star}
                          priceindinar={"300"}
                          priceineuro={"300"}
                          priceindollar={"300"}
                          night={t("night")}
                          total={t("total")}
                        />
                      </div>
                    ))}
                  </>
                )}
                {loading ? null : (
                  <>
                    {data.Hotel.length == 0 && (
                      <span className={robotoBold.className}>
                        {t("searcherror")}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
          {shown ? (
            <button
              className={styles.showbutton}
              onClick={() => setShown(!shown)}
            >
              <span className={robotoBold.className}>{t("showmap")}</span>
              <svg height="30" viewBox="0 96 960 960" width="30">
                <path
                  fill="currentColor"
                  d="m608.923 914.46-256.846-90.692-167.076 65.999q-15.461 7.847-30.23-1.192-14.77-9.038-14.77-27.115V338.463q0-11.847 6.347-21.27 6.346-9.423 17.192-13.653l188.537-66 256.846 89.692 166.076-65.615q15.461-7.231 30.23.923 14.77 8.154 14.77 25.846v531.151q0 10.616-6.923 18.424-6.924 7.807-17.154 11.423L608.923 914.46ZM583 857.923V362.924l-206-70.231v494.999l206 70.231Zm45.384 0 146.231-48.154V307.77l-146.231 55.154v494.999ZM185.385 843.23l146.231-55.538V292.693l-146.231 48.923V843.23Zm442.999-480.306v494.999-494.999Zm-296.768-70.231v494.999-494.999Z"
                />
              </svg>
            </button>
          ) : (
            <button
              className={styles.showbutton}
              onClick={() => setShown(!shown)}
            >
              <span className={robotoBold.className}>{t("showlist")}</span>
              <svg height="30" viewBox="0 96 960 960" width="30">
                <path
                  fill="currentColor"
                  d="M155.682 769.076q-10.989 0-18.335-7.433-7.346-7.434-7.346-18.423 0-10.989 7.434-18.335 7.433-7.346 18.422-7.346t18.336 7.433q7.346 7.434 7.346 18.423 0 10.989-7.434 18.335t-18.423 7.346Zm0-167.307q-10.989 0-18.335-7.434t-7.346-18.423q0-10.989 7.434-18.335 7.433-7.346 18.422-7.346t18.336 7.434q7.346 7.434 7.346 18.423 0 10.989-7.434 18.335t-18.423 7.346Zm0-167.308q-10.989 0-18.335-7.433-7.346-7.434-7.346-18.423 0-10.989 7.434-18.335 7.433-7.346 18.422-7.346t18.336 7.433q7.346 7.434 7.346 18.423 0 10.989-7.434 18.335t-18.423 7.346Zm136.241 331.538v-45.383h538.076v45.383H291.923Zm0-167.307v-45.384h538.076v45.384H291.923Zm0-167.308v-45.383h538.076v45.383H291.923Z"
                />
              </svg>
            </button>
          )}
          <section
            className={styles.rightsection}
            show-state={!shown ? "true" : "false"}
          >
            {loading ? (
              <div className={styles.loading}>
                <CircularProgress sx={{ color: "grey" }} />
              </div>
            ) : (
              <>
                {data.Hotel.length == 0 ? (
                  <div className={styles.loading}>
                    <CircularProgress sx={{ color: "grey" }} />
                  </div>
                ) : (
                  <CustomMap
                    searchResult={data.Hotel}
                    hovered={hoveredLocation}
                  />
                )}
              </>
            )}
          </section>
        </main>
        <Modal
          onClose={() => setShowModal(false)}
          show={showModal}
          setShow={setShowModal}
          title={t("filter")}
        >
          <div className={styles.filteroptions}>
            <div className={styles.filteroption}>
              <span className={robotoBold.className}>{t("filterbyprice")}</span>
              <div className={styles.pricerange}>
                <div className={styles.prices}>
                  {priceRange[1] != -1 ? (
                    <>
                      <div>
                        <span className={robotoBold.className}>
                          {priceRange[0]}
                        </span>
                        {currency === "Euro" && (
                          <span className={robotoBold.className}>€</span>
                        )}
                        {currency === "Dollar" && (
                          <span className={robotoBold.className}>$</span>
                        )}
                        {currency === "Dinar" && (
                          <span className={robotoBold.className}>DT</span>
                        )}
                      </div>
                      <div className={robotoBold.className}>-</div>
                      <div>
                        <span className={robotoBold.className}>
                          {priceRange[1]}
                        </span>
                        {currency === "Euro" && (
                          <span className={robotoBold.className}>€</span>
                        )}
                        {currency === "Dollar" && (
                          <span className={robotoBold.className}>$</span>
                        )}
                        {currency === "Dinar" && (
                          <span className={robotoBold.className}>DT</span>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className={robotoBold.className}>0</span>
                        {currency === "Euro" && (
                          <span className={robotoBold.className}>€</span>
                        )}
                        {currency === "Dollar" && (
                          <span className={robotoBold.className}>$</span>
                        )}
                        {currency === "Dinar" && (
                          <span className={robotoBold.className}>DT</span>
                        )}
                      </div>
                      <div className={robotoBold.className}>-</div>
                      <div>
                        <span className={robotoBold.className}>0</span>
                        {currency === "Euro" && (
                          <span className={robotoBold.className}>€</span>
                        )}
                        {currency === "Dollar" && (
                          <span className={robotoBold.className}>$</span>
                        )}
                        {currency === "Dinar" && (
                          <span className={robotoBold.className}>DT</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <Slider
                  sx={{ color: "#243c50", maxWidth: "100%" }}
                  value={priceRange}
                  onChange={handlePriceChange}
                  min={0}
                  max={maxPrice}
                />
              </div>
            </div>
            <div className={styles.filteroption}>
              <span className={robotoBold.className}>{t("filterbystars")}</span>
              <div className={styles.staroptions}>
                {filterStars.map((star: any, index: any) => (
                  <div key={index}>
                    <StarCheckbox
                      label={star}
                      onChange={() => onStarFilter(star)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.filteroption}>
              <span className={robotoBold.className}>
                {t("filterbyamenities")}
              </span>
              <div className={styles.amenities}>
                {amenities?.map((amenity: any) => (
                  <div key={amenity._id}>
                    {locale == "en" && (
                      <Checkbox
                        label={amenity.title_en}
                        onChange={() => handleAmenitiesFilter(amenity.title_en)}
                      />
                    )}
                    {locale == "fr" && (
                      <Checkbox
                        label={amenity.title_fr}
                        onChange={() => handleAmenitiesFilter(amenity.title_en)}
                      />
                    )}
                    {locale == "ar" && (
                      <Checkbox
                        label={amenity.title_ar}
                        onChange={() => handleAmenitiesFilter(amenity.title_en)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.filterbutton}>
              <button onClick={() => {}}>
                <span className={robotoBold.className}>{t("apply")}</span>
              </button>
            </div>
          </div>
        </Modal>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "searchbar",
        "navbar",
        "hotels",
      ])),
    },
  };
};
