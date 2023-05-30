import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Favorites.module.css";
import errorstyles from "@/styles/Error.module.css";
import { Roboto, Lora } from "@next/font/google";
import { useUser } from "@/utils/userProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";
import { useRouter } from "next/router";
import { getFavorite } from "@/queries/getFavorite";
import { CircularProgress } from "@mui/material";
import HotelBox from "@/components/HotelBox/HotelBox";

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

export default function Favorites() {
  const { t: nav } = useTranslation("navbar");
  const { t } = useTranslation("favorites");
  const [mounted, setMounted] = useState(false);
  const [favorites, setFavorites] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { locale } = useRouter();

  useEffect(() => {
    setMounted(true);
    AOS.init();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (mounted && user) {
      getFavorite(user._id, setFavorites, setLoading);
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
                  {favorites ? (
                    <>
                      {favorites[0].rate.length > 0 ? (
                        <>
                          {favorites.map((favorite: any, index: any) => (
                            <div
                              key={favorite.rate[0]._id}
                              className={styles.favoritecontainer}
                              data-aos="fade-up"
                              data-aos-duration="400"
                              data-aos-anchor="parent"
                              data-aos-delay={(index + 1) * 100}
                            >
                              <HotelBox
                                id={favorite.rate[0]._id}
                                image={favorite.rate[0].image}
                                name={
                                  locale == "en"
                                    ? favorite.rate[0].name_en
                                    : locale == "fr"
                                    ? favorite.rate[0].name_fr
                                    : favorite.rate[0].name_ar
                                }
                                desc={
                                  locale == "en"
                                    ? favorite.rate[0].desc_en
                                    : locale == "fr"
                                    ? favorite.rate[0].desc_fr
                                    : favorite.rate[0].desc_ar
                                }
                                stars={favorite.rate[0].star}
                              />
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
      ...(await serverSideTranslations(locale, ["navbar", "favorites"])),
    },
  };
};
