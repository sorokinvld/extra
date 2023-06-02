import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Trips.module.css";
import { Roboto, Lora } from "@next/font/google";
import Aos from "aos";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Showcase from "@/components/Showcase/Showcase";
import CircularProgress from "@mui/material/CircularProgress";
import { getTrips } from "@/queries/getTrips";

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

export default function Trips() {
  const { t } = useTranslation("trips");
  const { t: nav } = useTranslation("navbar");
  const { locale } = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [error, setError] = useState("");

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    setLoading(true);
    getTrips(setData, setLoading, setError);
  }, []);

  return (
    <>
      <Head>
        <title>Extra Virgin Travel | Trips</title>
        <meta
          name="description"
          content="a travel agency that ensures the service you'll need to make the best memories."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        currentPage={nav("trips")}
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
          <h1
            className={robotoBold.className}
            data-aos="zoom-in"
            data-aos-duration="400"
            data-aos-delay="250"
            data-aos-anchor="parent"
          >
            {t("headerlabel")}
          </h1>
          <div className={styles.planes}>
            <div
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-anchor="parent"
            >
              <svg height="150" viewBox="0 96 960 960" width="150">
                <path
                  fill="currentColor"
                  d="M350 976v-42l80-60V623L80 726v-58l350-206V226q0-21 14.5-35.5T480 176q21 0 35.5 14.5T530 226v236l350 206v58L530 623v251l80 60v42l-130-37-130 37Z"
                />
              </svg>
            </div>
            <div
              data-aos="fade-down"
              data-aos-duration="400"
              data-aos-offset="550"
              data-aos-anchor="parent"
            >
              <svg
                className={styles.flippedsvg}
                height="150"
                viewBox="0 96 960 960"
                width="150"
              >
                <path
                  fill="currentColor"
                  d="M350 976v-42l80-60V623L80 726v-58l350-206V226q0-21 14.5-35.5T480 176q21 0 35.5 14.5T530 226v236l350 206v58L530 623v251l80 60v42l-130-37-130 37Z"
                />
              </svg>
            </div>
          </div>
          <p
            className={lora.className}
            data-aos="fade-up"
            data-aos-duration="400"
            data-aos-delay="300"
            data-aos-anchor="parent"
          >
            {t("headerslang")}
          </p>

          <div className={styles.tripslist}>
            {loading ? (
              <div className={styles.loading}>
                <CircularProgress sx={{ color: "#2d8172" }} />
              </div>
            ) : (
              <>
                {error != "" ? (
                  <div className={styles.loading}>
                    <span className={robotoBold.className}>{error}</span>
                  </div>
                ) : (
                  <>
                    {data.map((trip: any, index: number) => (
                      <div
                        key={trip._id}
                        className={styles.item}
                        showcase-position={index % 2 == 0 ? "right" : "left"}
                        data-aos="fade-up"
                        data-aos-duration="400"
                        data-aos-delay={((Number(index) + 1) * 50).toString()}
                        data-aos-anchor="parent"
                      >
                        {locale == "en" && (
                          <Showcase
                            position={index % 2 == 0 ? "right" : "left"}
                            id={trip._id}
                            image={trip.image}
                            title={trip.title_en}
                            desc={trip.desc_en}
                            seemore={t("seemore")}
                          />
                        )}
                        {locale == "fr" && (
                          <Showcase
                            position={index % 2 == 0 ? "right" : "left"}
                            id={trip._id}
                            image={trip.image}
                            title={trip.title_fr}
                            desc={trip.desc_fr}
                            seemore={t("seemore")}
                          />
                        )}
                        {locale == "ar" && (
                          <Showcase
                            position={index % 2 == 0 ? "right" : "left"}
                            id={trip._id}
                            image={trip.image}
                            title={trip.title_ar}
                            desc={trip.desc_ar}
                            seemore={t("seemore")}
                          />
                        )}
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
          <div className={styles.tripslistmobile}>
            {loading ? (
              <div className={styles.loading}>
                <CircularProgress sx={{ color: "#812d3c" }} />
              </div>
            ) : (
              <>
                {error != "" ? (
                  <div className={styles.loading}>
                    <span className={robotoBold.className}>{error}</span>
                  </div>
                ) : (
                  <>
                    {data.map((trip: any, index: number) => (
                      <div
                        key={trip._id}
                        className={styles.item}
                        data-aos="fade-up"
                        data-aos-duration="400"
                        data-aos-delay={((Number(index) + 1) * 50).toString()}
                        data-aos-anchor="parent"
                      >
                        {locale == "en" && (
                          <Showcase
                            id={trip._id}
                            image={trip.image}
                            title={trip.title_en}
                            desc={trip.desc_en}
                            seemore={t("seemore")}
                          />
                        )}
                        {locale == "fr" && (
                          <Showcase
                            id={trip._id}
                            image={trip.image}
                            title={trip.title_fr}
                            desc={trip.desc_fr}
                            seemore={t("seemore")}
                          />
                        )}
                        {locale == "ar" && (
                          <Showcase
                            id={trip._id}
                            image={trip.image}
                            title={trip.title_ar}
                            desc={trip.desc_ar}
                            seemore={t("seemore")}
                          />
                        )}
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </main>
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
      ...(await serverSideTranslations(
        locale,
        ["navbar", "home", "trips"],
        require("../../../i18next.config")
      )),
    },
  };
};
