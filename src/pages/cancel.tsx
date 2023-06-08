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

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function PaymentFailed() {
  const { t: nav } = useTranslation("navbar");
  const { t } = useTranslation("payment");
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <div className={styles.error}>
          <svg height="48" viewBox="0 -960 960 960" width="48">
            <path
              fill="currentColor"
              d="M479.982-301.538q9.787 0 15.633-5.829 5.847-5.829 5.847-15.615 0-9.787-5.829-15.633-5.829-5.847-15.615-5.847-9.787 0-15.633 5.829-5.847 5.829-5.847 15.616 0 9.786 5.829 15.632 5.829 5.847 15.615 5.847Zm-13.905-129.154h30.769v-246.077h-30.769v246.077ZM480.4-120q-75.176 0-140.294-28.339-65.119-28.34-114.247-77.422-49.127-49.082-77.493-114.213Q120-405.106 120-480.366q0-74.491 28.339-140.069 28.34-65.578 77.422-114.206 49.082-48.627 114.213-76.993Q405.106-840 480.366-840q74.491 0 140.069 28.339 65.578 28.34 114.206 76.922 48.627 48.582 76.993 114.257Q840-554.806 840-480.4q0 75.176-28.339 140.294-28.34 65.119-76.922 114.062-48.582 48.944-114.257 77.494Q554.806-120 480.4-120Zm.1-30.769q136.885 0 232.808-96.039 95.923-96.038 95.923-233.692 0-136.885-95.736-232.808Q617.76-809.231 480-809.231q-137.154 0-233.192 95.736Q150.769-617.76 150.769-480q0 137.154 96.039 233.192 96.038 96.039 233.692 96.039ZM480-480Z"
            />
          </svg>
          <h1 className={roboto.className}>{t("failure")}</h1>
          <Link href={"/"}>{t("navigatefail")}</Link>
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
