import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Payment.module.css";
import errorstyles from "@/styles/Error.module.css";
import { Roboto } from "@next/font/google";
import Link from "next/link";
import { useUser } from "@/utils/userProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function PaymentSuccessful() {
  const { t: nav } = useTranslation("navbar");
  const { t } = useTranslation("payment");
  const { user } = useUser();
  const { query } = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subscribeToReservationAPI = async () => {
    if (query.reservationType == "Product") {
      const details = {
        item_id: query.item_id,
        user_id: query.user_id,
        amount: query.amount,
        currency: query.currency,
        start_date: query.start_date,
        end_date: query.end_date,
      };
      axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/createProductReservation`,
        details
      );
    } else {
      const details = {
        item_id: query.item_id,
        user_id: query.user_id,
        amount: query.amount,
        currency: query.currency,
        start_date: query.start_date,
        end_date: query.end_date,
      };
      axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/createRoomReservation`,
        details
      );
    }
  };

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
        <title>Extra Virgin Travel | Payment</title>
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
        <div className={styles.success}>
          <svg height="48" viewBox="0 -960 960 960" width="48">
            <path
              fill="currentColor"
              d="M421-324.923 677.077-581l-23.692-23.462L421-371.308 304.077-488.231l-22.693 23.462L421-324.923ZM480.134-120q-74.442 0-139.794-28.339-65.353-28.34-114.481-77.422-49.127-49.082-77.493-114.373Q120-405.425 120-479.866q0-74.673 28.339-140.41 28.34-65.737 77.422-114.365 49.082-48.627 114.373-76.993Q405.425-840 479.866-840q74.673 0 140.41 28.339 65.737 28.34 114.365 76.922 48.627 48.582 76.993 114.257Q840-554.806 840-480.134q0 74.442-28.339 139.794-28.34 65.353-76.922 114.481-48.582 49.127-114.257 77.493Q554.806-120 480.134-120ZM480-150.769q137.385 0 233.308-96.039Q809.231-342.846 809.231-480q0-137.385-95.923-233.308T480-809.231q-137.154 0-233.192 95.923Q150.769-617.385 150.769-480q0 137.154 96.039 233.192Q342.846-150.769 480-150.769ZM480-480Z"
            />
          </svg>
          <h1 className={roboto.className}>{t("success")}</h1>
          <Link
            href={"/reservationshistory"}
            onClick={subscribeToReservationAPI}
          >
            {t("navigatesucc")}
          </Link>
        </div>
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
      ...(await serverSideTranslations(
        locale,
        ["navbar", "payment"],
        require("../../i18next.config")
      )),
    },
  };
};
