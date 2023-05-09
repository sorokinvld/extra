import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import axios from "axios";
import { Roboto, Lora } from "@next/font/google";
import styles from "@/styles/Trip.module.css";
import Image from "next/image";
import image from "public/images/greece.jpg";
import { useEffect } from "react";
import Aos from "aos";
import { useRouter } from "next/router";
import { useCurrency } from "@/utils/currencyProvider";

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

export default function Tour({ tour, events, params }: any) {
  const { t: nav } = useTranslation("navbar");
  const { t } = useTranslation("trip");
  const { isFallback, locale } = useRouter();
  const { currency } = useCurrency();

  useEffect(() => {
    Aos.init();
  }, []);

  if (isFallback) {
    return <div>Loading please wait...</div>;
  }

  return (
    <>
      <Head>
        <title>{tour.title_en}</title>
        <meta
          name="description"
          content={tour.title_en + " tour page. " + tour.desc_en}
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
        <div className={styles.bannerwrapper}>
          <Image src={tour.image} alt={tour.title_en} fill priority />
          <div className={styles.overlay} />
          {locale == "en" && (
            <h1 className={robotoBold.className}>{tour.title_en}</h1>
          )}
          {locale == "fr" && (
            <h1 className={robotoBold.className}>{tour.title_fr}</h1>
          )}
          {locale == "ar" && (
            <h1 className={robotoBold.className}>{tour.title_ar}</h1>
          )}
        </div>
        <main className={styles.container} id="parent">
          <div className={styles.header}>
            <h2 className={robotoBold.className}>
              {tour.nbrofplaces} {t("places")}
            </h2>
            {locale == "en" && <p className={lora.className}>{tour.desc_en}</p>}
            {locale == "fr" && <p className={lora.className}>{tour.desc_fr}</p>}
            {locale == "ar" && <p className={lora.className}>{tour.desc_ar}</p>}
            {currency === "Euro" && (
              <span className={lora.className}>
                {t("from")} €{tour.priceDt}
              </span>
            )}
            {currency === "Dollar" && (
              <span className={lora.className}>
                {t("from")} ${tour.priceDt}
              </span>
            )}
            {currency === "Dinar" && (
              <span className={lora.className}>
                {t("from")} {tour.priceDt}DT
              </span>
            )}
            <button>{t("reserve")}</button>
          </div>

          <div className={styles.timeline}>
            {events.map((event: any, index: number) => (
              <div
                key={index}
                className={styles.timelinecontainer}
                container-position={index % 2 == 0 ? "left" : "right"}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={((Number(index) + 1) * 500).toString()}
                data-aos-anchor="parent"
              >
                <div className={styles.numbers}>
                  <span className={robotoBold.className}>{index + 1}</span>
                </div>
                <div className={styles.textbox}>
                  <div className={styles.image}>
                    <Image
                      src={event.image}
                      alt={"image"}
                      fill
                      sizes="100%"
                      priority
                    />
                  </div>
                  <div className={styles.text}>
                    {locale == "en" && (
                      <h2 className={robotoBold.className}>
                        {t("day")} {index + 1} - {event.title_en}
                      </h2>
                    )}
                    {locale == "fr" && (
                      <h2 className={robotoBold.className}>
                        {t("day")} {index + 1} - {event.title_fr}
                      </h2>
                    )}
                    {locale == "ar" && (
                      <h2 className={robotoBold.className}>
                        {t("day")} {index + 1} - {event.title_ar}
                      </h2>
                    )}
                    {locale == "en" && (
                      <p className={lora.className}>{event.desc_en}</p>
                    )}
                    {locale == "fr" && (
                      <p className={lora.className}>{event.desc_fr}</p>
                    )}
                    {locale == "ar" && (
                      <p className={lora.className}>{event.desc_ar}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.dontforget}>
            <span className={robotoBold.className}>{t("dontforget")}</span>
            <div className={styles.forgotten}>
              <div className={styles.forgottenitem}>
                <svg height="35" viewBox="0 96 960 960" width="35">
                  <path
                    fill="currentColor"
                    d="M479.885 762.308q61.346 0 103.038-41.693 41.693-41.692 41.693-103.038t-41.693-102.923q-41.692-41.577-103.038-41.577-61.347 0-102.924 41.577-41.577 41.577-41.577 102.923 0 61.346 41.577 103.038 41.577 41.693 102.924 41.693Zm0-30.77q-48.654 0-81.193-32.653-32.538-32.654-32.538-81.308t32.538-81.192q32.539-32.539 81.193-32.539 48.653 0 81.307 32.539 32.654 32.538 32.654 81.192 0 48.654-32.654 81.308-32.654 32.653-81.307 32.653ZM175.384 896q-23.057 0-39.221-16.163Q120 863.673 120 840.616V394.538q0-23 16.163-39.192 16.164-16.192 39.221-16.192h127.77L376.923 256h206.154l73.769 83.154h127.77q23 0 39.192 16.192T840 394.538v446.078q0 23.057-16.192 39.221Q807.616 896 784.616 896H175.384Zm609.232-30.769q10.769 0 17.692-6.923t6.923-17.692V394.538q0-10-6.923-17.307-6.923-7.308-17.692-7.308H642.692l-73.769-83.154H391.077l-73.769 83.154H175.384q-10.769 0-17.692 7.308-6.923 7.307-6.923 17.307v446.078q0 10.769 6.923 17.692t17.692 6.923h609.232ZM480 617.692Z"
                  />
                </svg>
                <span className={lora.className}>{t("camera")}</span>
              </div>
              <div className={styles.forgottenitem}>
                <svg height="35" viewBox="0 96 960 960" width="35">
                  <path
                    fill="currentColor"
                    d="M840 351.384v449.232q0 23.057-16.163 39.221Q807.673 856 784.616 856H175.384q-23.057 0-39.221-16.163Q120 823.673 120 800.616V351.384q0-23.057 16.163-39.221Q152.327 296 175.384 296h609.232q23.057 0 39.221 16.163Q840 328.327 840 351.384ZM150.769 452.692h658.462V351.384q0-9.23-7.692-16.923-7.693-7.692-16.923-7.692H175.384q-9.23 0-16.923 7.692-7.692 7.693-7.692 16.923v101.308Zm0 80.539v267.385q0 9.23 7.692 16.923 7.693 7.692 16.923 7.692h609.232q9.23 0 16.923-7.692 7.692-7.693 7.692-16.923V533.231H150.769Zm0 292V326.769 825.231Z"
                  />
                </svg>
                <span className={lora.className}>{t("card")}</span>
              </div>
              <div className={styles.forgottenitem}>
                <svg height="35" viewBox="0 96 960 960" width="35">
                  <path
                    fill="currentColor"
                    d="M295.384 976q-23.057 0-39.221-16.163Q240 943.673 240 920.616V231.384q0-23.057 16.163-39.221Q272.327 176 295.384 176h369.232q23.057 0 39.221 16.163Q720 208.327 720 231.384v689.232q0 23.057-16.163 39.221Q687.673 976 664.616 976H295.384Zm-24.615-155.384v100q0 9.23 7.692 16.923 7.693 7.692 16.923 7.692h369.232q9.23 0 16.923-7.692 7.692-7.693 7.692-16.923v-100H270.769Zm209.42 88.077q10.503 0 18.234-7.522 7.731-7.522 7.731-18.423 0-10.902-7.92-18.632-7.92-7.731-18.423-7.731-10.503 0-18.234 7.916-7.731 7.915-7.731 18.413 0 11.286 7.92 18.632 7.92 7.347 18.423 7.347Zm-209.42-118.847h418.462V292.923H270.769v496.923Zm0-527.692h418.462v-30.77q0-9.23-7.692-16.923-7.693-7.692-16.923-7.692H295.384q-9.23 0-16.923 7.692-7.692 7.693-7.692 16.923v30.77Zm0 558.462V945.231 820.616Zm0-558.462v-55.385 55.385Z"
                  />
                </svg>
                <span className={lora.className}>{t("mobile")}</span>
              </div>
              <div className={styles.forgottenitem}>
                <svg height="35" viewBox="0 96 960 960" width="35">
                  <path
                    fill="currentColor"
                    d="M295.384 896q-22.442 0-38.913-16.471Q240 863.058 240 840.616V431.384q0-23.403 15.99-39.394Q271.981 376 295.384 376H380V266.769q0-11.308 7.718-19.5t19.974-8.192h144.616q12.256 0 19.974 8.192t7.718 19.5V376h84.616q22.442 0 38.913 16.471Q720 408.942 720 431.384v409.232q0 22.442-16.471 38.913Q687.058 896 664.616 896q0 12.385-9.193 21.577-9.192 9.193-21.577 9.193-12.384 0-21.577-9.193-9.192-9.192-9.192-21.577H356.923q0 12.385-9.192 21.577-9.193 9.193-21.577 9.193-12.385 0-21.577-9.193-9.193-9.192-9.193-21.577Zm110.77-520h147.692l-1.538-110.77H407.692L406.154 376Zm-110.77 489.231h369.232q10.769 0 17.692-6.923t6.923-17.692V431.384q0-10.769-6.923-17.692t-17.692-6.923H295.384q-10.769 0-17.692 6.923t-6.923 17.692v409.232q0 10.769 6.923 17.692t17.692 6.923ZM336.923 796h26.154V476h-26.154v320Zm130 0h26.154V476h-26.154v320Zm130 0h26.154V476h-26.154v320Zm-326.154 44.616V406.769 840.616Z"
                  />
                </svg>
                <span className={lora.className}>{t("luggage")}</span>
              </div>
              <div className={styles.forgottenitem}>
                <svg height="35" viewBox="0 96 960 960" width="35">
                  <path
                    fill="currentColor"
                    d="m605.846 892.923-250.692-88.384-155.154 61q-13.923 6.692-26.962-1.385Q160 856.077 160 839.923v-488q0-10.692 5.192-19.539 5.192-8.846 14.885-12.307l175.077-61 250.692 87.384L760 286.23q13.923-6.461 26.962.347Q800 293.384 800 308.769v497.308q0 10.231-6.346 17.846-6.346 7.616-15.808 10.846l-172 58.154ZM588 854.846v-485l-216-74.461v485l216 74.461Zm30.769 0 150.462-49.307V313.538l-150.462 56.308v485Zm-428-17.384 150.462-57.077v-485l-150.462 50.846v491.231Zm428-467.616v485-485Zm-277.538-74.461v485-485Z"
                  />
                </svg>
                <span className={lora.className}>{t("map")}</span>
              </div>
            </div>
          </div>
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
  const tour = await axios
    .get(`http://localhost:3000/api/getProductwithEvent/${params.id}`)
    .then((response) => response.data[0]);
  const events = await axios
    .get(`http://localhost:3000/api/Events/${params.id}`)
    .then((response) => response.data);
  if (!tour) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["navbar", "trip"])),
      tour,
      events,
      params,
    },
    revalidate: 10,
  };
};
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const data = await axios
    .get("http://localhost:3000/api/getTours")
    .then((response) => response.data);
  if (!locales) {
    const paths = data.flatMap((tour: any) => {
      return {
        params: { id: tour._id },
      };
    });
    return {
      paths,
      fallback: true,
    };
  } else {
    const paths = data.flatMap((tour: any) => {
      return locales.map((locale) => {
        return {
          params: { id: tour._id },
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
