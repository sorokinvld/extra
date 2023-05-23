import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Reviewhotel.module.css";
import errorstyles from "@/styles/Error.module.css";
import { Roboto, Lora } from "@next/font/google";
import { useUser } from "@/utils/userProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getHotel } from "@/queries/getHotel";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { rateHotel } from "@/queries/rateHotel";
import { reviewHotel } from "@/queries/reviewHotel";

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

export default function Reviewhotel() {
  const { t: nav } = useTranslation("navbar");
  const { t } = useTranslation("reviewhotel");
  const [mounted, setMounted] = useState(false);
  const [hotel, setHotel] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [loadingRate, setLoadingRate] = useState(false);
  const [review, setReview] = useState<string>("");
  const [loadingReview, setLoadingReview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useUser();
  const { query, locale } = useRouter();
  const [rate, setRate] = useState(0);

  const handleDecrementRate = () => {
    if (rate > 0) {
      setRate(rate - 1);
    }
  };

  const handleIncrementRate = () => {
    if (rate < 10) {
      setRate(rate + 1);
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    if (rate > 0 && review != "") {
      rateHotel(hotel._id, user._id, rate, setLoadingRate);
      reviewHotel(hotel._id, user._id, review, setLoadingReview);
      if (!loadingRate && !loadingReview) {
        setSubmitting(false);
        toast.success("Success!");
      } else {
        setSubmitting(false);
        toast.error("There was a error, try again later!");
      }
    } else if (rate == 0) {
      toast.error("Please provide a rate!");
      setSubmitting(false);
    } else if (review == "") {
      toast.error("Please provide a review!");
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (query.id != null) {
      if (mounted && user) {
        getHotel(query.id, setHotel, setLoading);
      } else {
        setLoading(false);
      }
    }
  }, [mounted, query.id, user]);

  if ((mounted && !user) || (mounted && !query.id)) {
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
        {loading ? (
          <div className={styles.loading}>
            <CircularProgress sx={{ color: "grey" }} />
          </div>
        ) : (
          <>
            {hotel && (
              <div className={styles.container}>
                <h1 className={roboto.className}>{t("header")}</h1>
                {locale == "en" && (
                  <h2 className={lora.className}>{hotel.name_en}</h2>
                )}
                {locale == "fr" && (
                  <h2 className={lora.className}>{hotel.name_fr}</h2>
                )}
                {locale == "ar" && (
                  <h2 className={lora.className}>{hotel.name_ar}</h2>
                )}
                <div className={styles.image}>
                  <Image
                    src={hotel.image}
                    alt={hotel.name_en}
                    width={300}
                    height={300}
                  />
                </div>
                <div className={styles.rating}>
                  <h2 className={roboto.className}>{t("rating")}</h2>
                  <div className={styles.select}>
                    <svg
                      height="35"
                      viewBox="0 96 960 960"
                      width="35"
                      onClick={handleDecrementRate}
                    >
                      {rate == 0 ? (
                        <> </>
                      ) : (
                        <path
                          fill="currentColor"
                          d="M560.231 788.308 347.692 575.769l212.539-213.308 22.231 22.231-190.308 191.077 190.308 190.308-22.231 22.231Z"
                        />
                      )}
                    </svg>
                    <span className={lora.className}>{rate}</span>
                    <svg
                      height="35"
                      viewBox="0 96 960 960"
                      width="35"
                      onClick={handleIncrementRate}
                    >
                      {rate == 10 ? (
                        <> </>
                      ) : (
                        <path
                          fill="currentColor"
                          d="m375.769 788.308-22.231-22.231 190.308-190.308-190.308-191.077 22.231-22.231 212.539 213.308-212.539 212.539Z"
                        />
                      )}
                    </svg>
                  </div>
                </div>
                <div className={styles.review}>
                  <h2 className={roboto.className}>{t("review")}</h2>
                  <textarea
                    placeholder="type your review here..."
                    onChange={(e) => setReview(e.target.value)}
                    required
                  />
                  {submitting ? (
                    <CircularProgress sx={{ color: "grey" }} />
                  ) : (
                    <button onClick={handleSubmit}>{t("submit")}</button>
                  )}
                </div>
              </div>
            )}
          </>
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
      ...(await serverSideTranslations(locale, ["navbar", "reviewhotel"])),
    },
  };
};
