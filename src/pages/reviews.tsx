import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Reviews.module.css";
import errorstyles from "@/styles/Error.module.css";
import { Roboto, Lora } from "@next/font/google";
import { useUser } from "@/utils/userProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";
import { useRouter } from "next/router";
import { getReviews } from "@/queries/getReviews";
import { CircularProgress } from "@mui/material";
import { deleteReviews } from "@/queries/deleteReview";

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

export default function Reviews() {
  const { t: nav } = useTranslation("navbar");
  const { t } = useTranslation("reviews");
  const [mounted, setMounted] = useState(false);
  const [reviews, setReviews] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { locale } = useRouter();

  const handleDelete = (reviewId: string) => {
    deleteReviews(user._id, reviewId, setLoading, setReviews);
  };

  useEffect(() => {
    setMounted(true);
    AOS.init();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (mounted && user) {
      getReviews(user._id, setReviews, setLoading);
    } else {
      setLoading(false);
    }
  }, [mounted, user]);

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
            <div className={styles.results} id="parent">
              {loading ? (
                <div className={styles.loading}>
                  <CircularProgress sx={{ color: "grey" }} />{" "}
                </div>
              ) : (
                <>
                  {reviews ? (
                    <>
                      {reviews.length > 0 ? (
                        <>
                          {reviews.map((review: any, index: any) => (
                            <div
                              key={review._id}
                              className={styles.reviewcontainer}
                              data-aos="fade-up"
                              data-aos-duration="400"
                              data-aos-anchor="parent"
                              data-aos-delay={(index + 1) * 100}
                            >
                              <div className={styles.image}>
                                <Image
                                  src={review.Hotelreviewed[0].image}
                                  alt={review.Hotelreviewed[0].name_en}
                                  width={150}
                                  height={150}
                                />
                              </div>
                              <div className={styles.review}>
                                {locale == "en" && (
                                  <h2 className={robotoBold.className}>
                                    {review.Hotelreviewed[0].name_en}
                                  </h2>
                                )}
                                {locale == "fr" && (
                                  <h2 className={robotoBold.className}>
                                    {review.Hotelreviewed[0].name_fr}
                                  </h2>
                                )}
                                {locale == "ar" && (
                                  <h2 className={robotoBold.className}>
                                    {review.Hotelreviewed[0].name_ar}
                                  </h2>
                                )}
                                <span className={lora.className}>
                                  {t("review")}
                                </span>
                                <span className={lora.className}>
                                  {review.comment}
                                </span>
                                <button
                                  onClick={() =>
                                    handleDelete(review.Hotelreviewed[0]._id)
                                  }
                                >
                                  {t("delete")}
                                </button>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div>{t("notfound")}</div>
                      )}
                    </>
                  ) : (
                    <div>{t("notfound")}</div>
                  )}
                </>
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
      ...(await serverSideTranslations(locale, ["navbar", "reviews"])),
    },
  };
};
