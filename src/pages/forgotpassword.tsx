import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Forgotpassword.module.css";
import { Roboto, Lora } from "@next/font/google";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword } from "@/queries/forgotPassword";
import { useState } from "react";
import { useRouter } from "next/router";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function ForgotPassword() {
  const { t: nav } = useTranslation("navbar");
  const { t } = useTranslation("forgotpassword");
  const [success, setSuccess] = useState(false);
  const { push } = useRouter();

  const placeholder = t("entertwo");

  const forgotPasswordSchema = z.object({
    email: z.string().email(),
  });

  type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = async (data) => {
    await new Promise<void>(async (resolve) => {
      const res = await forgotPassword(data);
      if (
        res ==
        "If a user with that email is registered you will receive a password reset email"
      ) {
        setSuccess(true);
        resolve();
      } else {
      }
    });
  };

  return (
    <>
      <Head>
        <title>Extra Virgin Travel | Forgot password</title>
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
        <div className={styles.container}>
          {success ? (
            <p className={lora.className}>
              {t("success")}
              <span className={styles.goback} onClick={() => push("/")}>
                {t("goback")}
              </span>
            </p>
          ) : (
            <>
              <h1 className={roboto.className}>{t("forgot")}</h1>
              <p className={lora.className}>{t("enter")}</p>
              <input
                type="email"
                placeholder={placeholder}
                {...register("email")}
                disabled={isSubmitting}
              />
              <p className={roboto.className}>
                {errors.email && <>{t("emailerror")}</>}
              </p>
              <button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
                {t("submit")}
              </button>
              <span className={lora.className} onClick={() => push("/")}>
                {t("goback")}
              </span>
            </>
          )}
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
        ["navbar", "forgotpassword"],
        require("../../i18next.config")
      )),
    },
  };
};
