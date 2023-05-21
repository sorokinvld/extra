import Head from "next/head";
import styles from "@/styles/Contact.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { Roboto } from "@next/font/google";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { contactType, contactDefaultValues } from "@/types/contactType";
import { toast } from "react-toastify";

const robotoBold = Roboto({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function Contact() {
  const { t: nav } = useTranslation("navbar");
  const { t } = useTranslation("about");
  const [values, setValues] = useState<contactType>(contactDefaultValues);
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise<void>(async (resolve) => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ContactUs`,
          values
        );
        if (res.data == "success") {
          setLoading(false);
          toast.success(t("success"));
          resolve();
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        resolve();
      }
    });
  };

  return (
    <>
      <Head>
        <title>Extra Virgin Travel | Contact</title>
        <meta name="description" content="contact us." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        currentPage={nav("contact")}
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
        <section className={styles.contact}>
          <div className={styles.contactheading}>
            <h1 className={robotoBold.className}>
              <span className={styles.spanleft}>-</span> {t("get-in-touch")}{" "}
              <span className={styles.spanright}>-</span>
            </h1>
          </div>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.contactwidget}>
                  <div className={styles.contactwidgetaddressitem}>
                    <div className={styles.icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        width="48"
                      >
                        <path
                          fill="currentColor"
                          d="M24 22.55q1.05 0 1.8-.75t.75-1.8q0-1.05-.75-1.8t-1.8-.75q-1.05 0-1.8.75t-.75 1.8q0 1.05.75 1.8t1.8.75Zm0 18.9q6.45-5.55 10.025-11.35t3.575-9.7q0-6.15-3.925-10.075Q29.75 6.4 24 6.4q-5.75 0-9.675 3.925Q10.4 14.25 10.4 20.4q0 3.9 3.6 9.7 3.6 5.8 10 11.35ZM24 43q-7.45-6.7-11.075-12.425Q9.3 24.85 9.3 20.4q0-6.9 4.45-11T24 5.3q5.8 0 10.25 4.1t4.45 11q0 4.45-3.625 10.175Q31.45 36.3 24 43Zm0-22.6Z"
                        />
                      </svg>
                    </div>
                    <div className={styles.text}>
                      <h2 className={robotoBold.className}>{t("address")}</h2>
                      <p className={robotoBold.className}>
                        Imm Jebli Centre, Av de Carthage, Rte de Gremda km 0.5,
                        <br />
                        Mezanine bur N°4, 3027 Sfax El Jadida
                      </p>
                    </div>
                  </div>
                  <div className={styles.contactwidgetcallusitem}>
                    <div className={styles.icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        width="48"
                      >
                        <path
                          fill="currentColor"
                          d="M37.15 39.1q-4.75 0-9.8-2.65-5.05-2.65-9.2-6.775-4.15-4.125-6.8-9.15Q8.7 15.5 8.7 10.75q0-.9.625-1.525Q9.95 8.6 10.85 8.6h3.65q.9 0 1.525.525.625.525.825 1.425l.95 3.9q.15.8-.05 1.45-.2.65-.7 1.05l-4.25 3.9q3 5 6.55 8.5t8.4 6.15l4.15-4.35q.5-.55 1.075-.75.575-.2 1.275-.05l3.1.7q.9.15 1.425.8t.525 1.6v3.5q0 .9-.625 1.525-.625.625-1.525.625ZM12.2 19.9l4.25-3.85q.2-.2.275-.55.075-.35.025-.65l-1-4.35q-.05-.4-.325-.6-.275-.2-.675-.2H10.5q-.3 0-.5.2t-.2.5q-.1 2 .575 4.425.675 2.425 1.825 5.075Zm16.6 16.05q2.05 1.1 4.55 1.6t4.15.5q.3 0 .5-.2t.2-.5v-4.2q0-.4-.2-.675t-.6-.325l-3.55-.75q-.3-.05-.525.025-.225.075-.475.275ZM12.2 19.9Zm16.6 16.05Z"
                        />
                      </svg>
                    </div>
                    <div className={styles.text}>
                      <h2 className={robotoBold.className}>{t("call-us")}</h2>
                      <p className={robotoBold.className}>+216 72 032 183</p>
                    </div>
                  </div>
                  <div className={styles.contactwidgetmailitem}>
                    <div className={styles.icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        width="48"
                      >
                        <path
                          fill="currentColor"
                          d="M9.3 37.4q-1.15 0-1.925-.775Q6.6 35.85 6.6 34.7V13.3q0-1.15.775-1.925Q8.15 10.6 9.3 10.6h29.4q1.15 0 1.925.775.775.775.775 1.925v21.4q0 1.15-.775 1.925-.775.775-1.925.775ZM24 23.35 7.7 12.4v22.3q0 .7.45 1.15.45.45 1.15.45h29.4q.7 0 1.15-.45.45-.45.45-1.15V12.4Zm0-1.4L39.45 11.7H8.6ZM7.7 12.4v-.7 23q0 .7.45 1.15.45.45 1.15.45H7.7V34.7Z"
                        />
                      </svg>
                    </div>
                    <div className={styles.text}>
                      <h2 className={robotoBold.className}>{t("mail")}</h2>
                      <p className={robotoBold.className}>
                        extravirgintravel@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.contactform}>
                  <form
                    className={styles.form}
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <input
                      className={styles.firstinput}
                      type="text"
                      placeholder={t("name")!}
                      name={"name"}
                      onChange={handleChangeInput}
                      required
                    />
                    <input
                      className={styles.secondinput}
                      type="email"
                      placeholder={t("email")!}
                      name={"email"}
                      onChange={handleChangeInput}
                      required
                    />
                    <input
                      className={styles.thirdinput}
                      type="text"
                      placeholder={t("phone")!}
                      name={"phonenumber"}
                      onChange={handleChangeInput}
                      required
                    />
                    <textarea
                      placeholder={t("type-your-message-here")!}
                      name={"message"}
                      onChange={handleChangeTextArea}
                      required
                    />
                    {loading ? (
                      <div>
                        <CircularProgress size={40} sx={{ color: "grey" }} />
                      </div>
                    ) : (
                      <button className={styles.formbutton}>
                        <span className={robotoBold.className}>
                          {t("send")}
                        </span>
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.mapcolumn}>
                <div className={styles.contactmap}>{/* MAP HERE */}</div>
              </div>
            </div>
          </div>
        </section>
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
      ...(await serverSideTranslations(locale, ["navbar", "about"])),
    },
  };
};
