import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Purchasehistory.module.css";
import errorstyles from "@/styles/Error.module.css";
import { Roboto, Lora } from "@next/font/google";
import { useUser } from "@/lib/userProvider";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import { fetchRooms } from "@/queries/fetchRooms";
import { fetchProducts } from "@/queries/fetchProduct";
import { CircularProgress } from "@mui/material";
import format from "date-fns/format";
import { useCurrency } from "@/lib/currencyProvider";
import { useRouter } from "next/router";

const robotoBold = Roboto({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function ReservationsHistory() {
  const { t: nav } = useTranslation("navbar");
  const { t } = useTranslation("reservationhistory");
  const [mounted, setMounted] = useState(false);
  const { user } = useUser();
  const finished = t("finishedb");
  const ongoing = t("ongoingb");
  const upcoming = t("upcomingb");
  const state = [
    { id: 1, name: finished },
    { id: 2, name: ongoing },
    { id: 3, name: upcoming },
  ];
  const [selectedUnderline, setSelectedUnderline] = useState(finished);
  const [selectedState, setSelectedState] = useState("Finished");
  const [selectedType, setSelectedType] = useState("Room");
  const [data, setData] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const { currency } = useCurrency();
  const { locale } = useRouter();

  useEffect(() => {
    setMounted(true);
    AOS.init();
  }, []);

  const handleStateChange = (state: string) => {
    if (state == finished) {
      setSelectedState("Finished");
    } else if (state == ongoing) {
      setSelectedState("On going");
    } else {
      setSelectedState("Upcoming");
    }
    setSelectedUnderline(state);
    setSelectedType("Room");
    setLoading(true);
    fetchRooms(user._id, setData, setLoading);
  };

  const handleTypeChange = () => {
    if (selectedType == "Room") {
      setLoading(true);
      setSelectedType("Product");
    } else {
      setLoading(true);
      setSelectedType("Room");
    }
  };

  useEffect(() => {
    if (user) {
      if (selectedType == "Room") {
        setData([]);
        fetchRooms(user._id, setData, setLoading);
      } else {
        setData([]);
        fetchProducts(user._id, setData, setLoading);
      }
    } else {
      return;
    }
  }, [selectedType, user]);

  const filteredData = useMemo(() => {
    if (loading == false) {
      if (data) {
        if (data.length > 0) {
          if (selectedState == "Finished") {
            if (selectedType == "Room") {
              return data.filter((result: any) => {
                if (
                  new Date().setHours(0, 0, 0, 0) >
                    new Date(result.Room_purchase[0].start_date).setHours(
                      0,
                      0,
                      0,
                      0
                    ) &&
                  new Date().setHours(0, 0, 0, 0) >
                    new Date(result.Room_purchase[0].end_date).setHours(
                      0,
                      0,
                      0,
                      0
                    )
                )
                  return result;
              });
            } else {
              return data.filter((result: any) => {
                if (
                  new Date().setHours(0, 0, 0, 0) >
                    new Date(result.Product_purchase[0].daystart).setHours(
                      0,
                      0,
                      0,
                      0
                    ) &&
                  new Date().setHours(0, 0, 0, 0) >
                    new Date(result.Product_purchase[0].dayend).setHours(
                      0,
                      0,
                      0,
                      0
                    )
                )
                  return result;
              });
            }
          } else if (selectedState == "On going") {
            if (selectedType == "Room") {
              return data.filter((result: any) => {
                if (
                  new Date().setHours(0, 0, 0, 0) <=
                    new Date(result.Room_purchase[0].end_date).setHours(
                      0,
                      0,
                      0,
                      0
                    ) &&
                  new Date().setHours(0, 0, 0, 0) >=
                    new Date(result.Room_purchase[0].start_date).setHours(
                      0,
                      0,
                      0,
                      0
                    )
                )
                  return result;
              });
            } else {
              return data.filter((result: any) => {
                if (
                  new Date().setHours(0, 0, 0, 0) <=
                    new Date(result.Product_purchase[0].dayend).setHours(
                      0,
                      0,
                      0,
                      0
                    ) &&
                  new Date().setHours(0, 0, 0, 0) >=
                    new Date(result.Product_purchase[0].daystart).setHours(
                      0,
                      0,
                      0,
                      0
                    )
                )
                  return result;
              });
            }
          } else {
            if (selectedType == "Room") {
              return data.filter((result: any) => {
                if (
                  new Date().setHours(0, 0, 0, 0) <
                  new Date(result.Room_purchase[0].start_date).setHours(
                    0,
                    0,
                    0,
                    0
                  )
                )
                  return result;
              });
            } else {
              return data.filter((result: any) => {
                if (
                  new Date().setHours(0, 0, 0, 0) <
                  new Date(result.Product_purchase[0].daystart).setHours(
                    0,
                    0,
                    0,
                    0
                  )
                )
                  return result;
              });
            }
          }
        } else {
          return [];
        }
      } else {
        return [];
      }
    } else {
      return [];
    }
  }, [data, loading, selectedState, selectedType]);

  if (mounted && !user) {
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
          currentPage={nav("404")}
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
          <div className={errorstyles.error}>
            <h1 className={roboto.className}>404 - Page not found.</h1>
          </div>
        </Layout>
      </>
    );
  }

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
        currentPage={nav("404")}
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
        {user && (
          <div className={styles.container}>
            <h1 className={roboto.className}>{t("header")}</h1>
            <div className={styles.header}>
              <div className={styles.userimage}>
                <Image
                  src={user.imageurl}
                  alt={"user image"}
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.details}>
                <h2 className={roboto.className}>{user.username}</h2>
                <p className={lora.className}>{user.email}</p>
              </div>
            </div>
            <div className={styles.purchasehistorybar}>
              {state.map((state) => (
                <button
                  key={state.id}
                  onClick={() => handleStateChange(state.name)}
                  className={
                    state.name === selectedUnderline ? styles.activeli : ""
                  }
                >
                  {state.name}
                  {state.name === selectedUnderline ? (
                    <motion.div
                      className={styles.underline}
                      layoutId="underline"
                    />
                  ) : null}
                </button>
              ))}
            </div>

            <div className={styles.purchasehistory}>
              {selectedState == "Finished" && (
                <h2
                  className={roboto.className}
                  data-aos="fade-right"
                  data-aos-duration="400"
                  id="parent"
                >
                  {t("finished")}
                </h2>
              )}
              {selectedState == "On going" && (
                <h2
                  className={roboto.className}
                  data-aos="fade-right"
                  data-aos-duration="400"
                  data-aos-anchor="parent"
                >
                  {t("ongoing")}
                </h2>
              )}
              {selectedState == "Upcoming" && (
                <h2
                  className={roboto.className}
                  data-aos="fade-right"
                  data-aos-duration="400"
                  data-aos-anchor="parent"
                >
                  {t("upcoming")}
                </h2>
              )}
              <div className={styles.search}>
                <svg height="40" viewBox="0 96 960 960" width="40">
                  <path
                    fill="currentColor"
                    d="M783.282 902 529.077 647.795q-29.798 26.398-69.174 40.456-39.376 14.057-79.185 14.057-95.757 0-162.084-66.196-66.327-66.195-66.327-161.525 0-95.331 66.196-161.651 66.195-66.321 161.486-66.321 95.29 0 161.907 66.232t66.617 161.529q0 41.368-14.769 80.778-14.77 39.41-40.411 68.384l254.36 253.539L783.282 902ZM380.564 668.462q81.645 0 137.874-56.09t56.229-137.911q0-81.82-56.229-137.91t-137.874-56.09q-81.773 0-138.092 56.09-56.318 56.09-56.318 137.91 0 81.821 56.318 137.911 56.319 56.09 138.092 56.09Z"
                  />
                </svg>
                <input />
                <svg
                  height="35"
                  viewBox="0 96 960 960"
                  width="40"
                  className={styles.backspace}
                >
                  <path
                    fill="currentColor"
                    d="m439.897 706.359 106.257-106.256L652.41 706.359l24.77-24.256L570.257 576l106.102-106.103-24.256-24.256-105.949 106.256-106.257-106.256-24.256 24.256L522.051 576l-106.41 106.103 24.256 24.256ZM164.615 576l141.949-200.821q12.846-18.359 31.902-28.769Q357.523 336 380.034 336h356.889q23.911 0 41.186 17.275 17.276 17.276 17.276 41.186v363.078q0 23.91-17.276 41.186Q760.834 816 736.923 816H380q-22.616 0-41.218-11.179-18.603-11.18-32.218-29.539L164.615 576Zm41.641 0L338.38 762.154q6.153 8.462 16.538 14.231 10.384 5.769 21.923 5.769h360.082q9.231 0 16.923-7.692 7.693-7.692 7.693-16.923V394.461q0-9.231-7.693-16.923-7.692-7.692-16.923-7.692H376.769q-11.538 0-21.923 5.769-10.385 5.769-16.538 14.231L206.256 576Zm555.283 0V369.846v412.308V576Z"
                  />
                </svg>
              </div>
              <div className={styles.select}>
                <svg
                  height="35"
                  viewBox="0 96 960 960"
                  width="35"
                  onClick={handleTypeChange}
                >
                  <path
                    fill="currentColor"
                    d="M560.231 788.308 347.692 575.769l212.539-213.308 22.231 22.231-190.308 191.077 190.308 190.308-22.231 22.231Z"
                  />
                </svg>
                {selectedType == "Room" && (
                  <span
                    className={lora.className}
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    data-aos-anchor="parent"
                  >
                    {t("rooms")}
                  </span>
                )}
                {selectedType == "Product" && (
                  <span
                    className={lora.className}
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    data-aos-anchor="parent"
                  >
                    {t("product")}
                  </span>
                )}
                <svg
                  height="35"
                  viewBox="0 96 960 960"
                  width="35"
                  onClick={handleTypeChange}
                >
                  <path
                    fill="currentColor"
                    d="m375.769 788.308-22.231-22.231 190.308-190.308-190.308-191.077 22.231-22.231 212.539 213.308-212.539 212.539Z"
                  />
                </svg>
              </div>
              {loading ? (
                <div>
                  <CircularProgress sx={{ color: "grey" }} />
                </div>
              ) : (
                <div className={styles.results}>
                  {selectedType == "Room" && (
                    <>
                      {filteredData ? (
                        <>
                          {filteredData.length > 0 ? (
                            <>
                              {filteredData.map((result: any, index: any) => {
                                if (result) {
                                  return (
                                    <div
                                      key={result._id}
                                      className={styles.roomwrapper}
                                      data-aos="fade-up"
                                      data-aos-duration="400"
                                      data-aos-anchor="parent"
                                      data-aos-delay={(index + 1) * 100}
                                    >
                                      <div className={styles.image}>
                                        <Image
                                          src={result.Room_purchase[0].image}
                                          alt={
                                            "Hotel of room " +
                                            result.Room_purchase[0].room_number
                                          }
                                          width={150}
                                          height={100}
                                        />
                                      </div>
                                      <div className={styles.room}>
                                        <span className={robotoBold.className}>
                                          {t("room")}{" "}
                                          {result.Room_purchase[0].room_number}
                                        </span>
                                        <div className={styles.date}>
                                          <span className={lora.className}>
                                            {t("checkin")}:{" "}
                                            {format(
                                              new Date(
                                                result.Room_purchase[0].start_date
                                              ),
                                              "dd/MM/yyyy"
                                            )}
                                          </span>
                                          <span className={lora.className}>
                                            {t("checkout")}:{" "}
                                            {format(
                                              new Date(
                                                result.Room_purchase[0].end_date
                                              ),
                                              "dd/MM/yyyy"
                                            )}
                                          </span>
                                        </div>
                                        {selectedState == "Finished" && (
                                          <button
                                            className={robotoBold.className}
                                          >
                                            {t("review")}
                                          </button>
                                        )}
                                        {selectedState == "On going" && (
                                          <button
                                            className={robotoBold.className}
                                          >
                                            {t("review")}
                                          </button>
                                        )}
                                      </div>
                                      <div className={styles.price}>
                                        <span className={roboto.className}>
                                          {Number(
                                            result.Room_purchase[0]
                                              .numberofnight
                                          ) *
                                            Number(
                                              result.Room_purchase[0]
                                                .priceofnight
                                            ) +
                                            Number(
                                              result.Room_purchase[0].adult
                                            ) *
                                              Number(
                                                result.Room_purchase[0]
                                                  .priceperadult
                                              ) +
                                            Number(
                                              result.Room_purchase[0].child
                                            ) *
                                              Number(
                                                result.Room_purchase[0]
                                                  .priceperchild
                                              ) +
                                            Number(
                                              result.Room_purchase[0]
                                                .priceofroom
                                            )}
                                          {currency == "Euro" && <span>€</span>}
                                          {currency == "Dollar" && (
                                            <span>$</span>
                                          )}
                                          {currency == "Dinar" && (
                                            <span>TND</span>
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                            </>
                          ) : (
                            <span>{t("noroom")}</span>
                          )}
                        </>
                      ) : (
                        <span>{t("noproduct")}</span>
                      )}
                    </>
                  )}
                  {selectedType == "Product" && (
                    <>
                      {filteredData ? (
                        <>
                          {filteredData.length > 0 ? (
                            <>
                              {filteredData.map((result: any, index: any) => {
                                if (result) {
                                  return (
                                    <div
                                      key={result._id}
                                      className={styles.roomwrapper}
                                      data-aos="fade-up"
                                      data-aos-duration="400"
                                      data-aos-anchor="parent"
                                      data-aos-delay={(index + 1) * 100}
                                    >
                                      <div className={styles.image}>
                                        <Image
                                          src={result.Product_purchase[0].image}
                                          alt={
                                            result.Product_purchase[0].title_en
                                          }
                                          width={150}
                                          height={100}
                                        />
                                      </div>
                                      <div className={styles.room}>
                                        {locale == "en" && (
                                          <span className={roboto.className}>
                                            {
                                              result.Product_purchase[0]
                                                .title_en
                                            }
                                          </span>
                                        )}
                                        {locale == "fr" && (
                                          <span className={roboto.className}>
                                            {
                                              result.Product_purchase[0]
                                                .title_fr
                                            }
                                          </span>
                                        )}
                                        {locale == "ar" && (
                                          <span className={roboto.className}>
                                            {
                                              result.Product_purchase[0]
                                                .title_ar
                                            }
                                          </span>
                                        )}
                                        <div className={styles.date}>
                                          <span className={lora.className}>
                                            {t("checkin")}:{" "}
                                            {format(
                                              new Date(
                                                result.Product_purchase[0].daystart
                                              ),
                                              "dd/MM/yyyy"
                                            )}
                                          </span>
                                          <span className={lora.className}>
                                            {t("checkout")}:{" "}
                                            {format(
                                              new Date(
                                                result.Product_purchase[0].dayend
                                              ),
                                              "dd/MM/yyyy"
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                      <div className={styles.price}>
                                        <span className={roboto.className}>
                                          {result.Product_purchase[0].priceDt}
                                          {currency == "Euro" && <span>€</span>}
                                          {currency == "Dollar" && (
                                            <span>$</span>
                                          )}
                                          {currency == "Dinar" && (
                                            <span>TND</span>
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                            </>
                          ) : (
                            <span>{t("noproduct")}</span>
                          )}
                        </>
                      ) : (
                        <span>{t("noproduct")}</span>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    return {
      props: {},
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "navbar",
        "reservationhistory",
      ])),
    },
  };
};
