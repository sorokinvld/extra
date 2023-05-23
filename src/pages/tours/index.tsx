import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Trips.module.css";
import { Roboto, Lora } from "@next/font/google";
import Aos from "aos";
import { useEffect, useState } from "react";
import Showcase from "@/components/Showcase/Showcase";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
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

export default function Tours() {
  const { t } = useTranslation("tours");
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
    const data = async () => {
      try {
        setTimeout(async () => {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getTours`
          );
          setData(res.data);
          setLoading(false);
        }, 1000);
      } catch (error: any) {
        setError(error);
      }
    };
    data();
  }, []);

  return (
    <>
      <Head>
        <title>Extra Virgin Travel | Tours</title>
        <meta
          name="description"
          content="a travel agency that ensures the service you'll need to make the best memories."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        currentPage={nav("tours")}
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
              data-aos-offset="550"
              data-aos-anchor="parent"
            >
              <svg height="150" viewBox="0 96 960 960" width="150">
                <path
                  fill="currentColor"
                  d="M220 956V196h30.769v81.692h560l-72.538 176.846 72.538 176.847h-560V956H220Zm30.769-647.538v292.153-292.153Zm250.059 202.692q23.249 0 39.634-16.414 16.384-16.415 16.384-40.414 0-23.999-16.414-40.201t-40.414-16.202q-22.864 0-39.249 16.414-16.384 16.415-16.384 40.414 0 23.999 16.597 40.201t39.846 16.202Zm-250.059 89.461h514.077L706 454.538l58.846-146.076H250.769v292.153Z"
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
                <CircularProgress sx={{ color: "grey" }} />
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
                <CircularProgress sx={{ color: "grey" }} />
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
      ...(await serverSideTranslations(locale, ["navbar", "home", "tours"])),
    },
  };
};
