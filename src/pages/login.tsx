import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import styles from "@/styles/Login.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { Roboto, Lora } from "@next/font/google";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchemaType, loginFormSchema } from "@/types/loginFormSchema";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import AOS from "aos";
import { toast } from "react-toastify";
import { loginUser } from "@/queries/loginUser";

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

export default function Login() {
  const { t } = useTranslation("login");
  const { back, push } = useRouter();

  useEffect(() => {
    AOS.init();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data) => {
    await new Promise<void>(async (resolve) => {
      const res = await loginUser(data);
      if (res.message == "success") {
        toast.success(t("success"));
        back();
      } else if (res == "invalid email ") {
        toast.error(t("emailnotfound"));
        resolve();
      } else if (res == "invalid password ") {
        toast.error(t("incorrectpassword"));
        resolve();
      } else {
        toast.error("500 - Internal server error.");
        resolve();
      }
    });
  };

  return (
    <>
      <Head>
        <title>Extra Virgin Travel | Login</title>
        <meta name="description" content="Login to our website here." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} id="parent">
        <div className={styles.image}>
          <Image
            src={
              "https://res.cloudinary.com/db57xeoce/image/upload/v1678015502/tunis_biqnpj.jpg"
            }
            alt={"loginpageimage"}
            fill
            sizes="100%"
            priority
          />
        </div>
        <div className={styles.container}>
          <div
            className={styles.backbutton}
            data-aos="fade-left"
            data-aos-duration="400"
            data-aos-anchor="#parent"
          >
            <svg
              height="30px"
              width="30px"
              viewBox="0 96 960 960"
              onClick={() => back()}
            >
              <path
                fill="currentColor"
                d="M480 865.231 190.769 576 480 286.769l22 22-252.615 251.846h519.846v30.77H249.385L502 843.231l-22 22Z"
              />
            </svg>
          </div>
          <div className={styles.form}>
            <div className={styles.firstsection}>
              <div className={styles.label}>
                <h1
                  className={robotoBold.className}
                  data-aos="fade-right"
                  data-aos-duration="400"
                  data-aos-delay="50"
                  data-aos-anchor="#parent"
                >
                  {t("welcome")}
                </h1>
                <p
                  className={lora.className}
                  data-aos="fade-right"
                  data-aos-duration="400"
                  data-aos-delay="100"
                  data-aos-anchor="#parent"
                >
                  {t("subwelcome")}
                </p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="400"
                data-aos-delay="150"
                data-aos-anchor="#parent"
              >
                <button
                  aria-label="Facebook login button"
                  className={styles.facebookbutton}
                >
                  <svg viewBox="0 0 30 30" width="40px" height="40px">
                    <path
                      fill="currentColor"
                      d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"
                    />
                  </svg>
                  <span className={robotoBold.className}>{t("facebook")}</span>
                </button>
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="400"
                data-aos-delay="200"
                data-aos-anchor="#parent"
              >
                <button
                  aria-label="Google login button"
                  className={styles.googlebutton}
                >
                  <svg viewBox="0 0 30 30" width="40px" height="40px">
                    <g id="Layer_1">
                      <rect
                        fill="currentColor"
                        x="15"
                        y="13"
                        width="10"
                        height="4"
                      />
                      <path
                        fill="currentColor"
                        d="M22.733,13C22.899,13.641,23,14.307,23,15c0,4.418-3.582,8-8,8s-8-3.582-8-8s3.582-8,8-8c2.009,0,3.84,0.746,5.245,1.969l2.841-2.84C20.952,4.185,18.116,3,15.003,3C8.374,3,3,8.373,3,15s5.374,12,12.003,12c10.01,0,12.266-9.293,11.327-14H22.733z"
                      />
                    </g>
                  </svg>
                  <span className={robotoBold.className}>{t("google")}</span>
                </button>
              </div>
              <div
                className={styles.or}
                data-aos="fade-up"
                data-aos-duration="400"
                data-aos-delay="250"
                data-aos-anchor="#parent"
              >
                <span className={robotoBold.className}>{t("or")}</span>
              </div>
            </div>
            <div className={styles.secondsection}>
              <div className={styles.input}>
                <span
                  className={robotoBold.className}
                  data-aos="fade-right"
                  data-aos-duration="400"
                  data-aos-delay="300"
                  data-aos-anchor="#parent"
                >
                  {t("email")}
                </span>
                <input
                  aria-label="email"
                  {...register("email")}
                  disabled={isSubmitting}
                  data-aos="fade-up"
                  data-aos-duration="400"
                  data-aos-delay="350"
                  data-aos-anchor="#parent"
                />
                <p className={robotoBold.className}>
                  {errors.email && <>{t("emailfirsterror")}</>}
                </p>
              </div>
              <div className={styles.input}>
                <span
                  className={robotoBold.className}
                  data-aos="fade-right"
                  data-aos-duration="400"
                  data-aos-delay="400"
                  data-aos-anchor="#parent"
                >
                  {t("password")}
                </span>
                <input
                  aria-label="password"
                  type="password"
                  {...register("password")}
                  disabled={isSubmitting}
                  data-aos="fade-up"
                  data-aos-duration="400"
                  data-aos-delay="450"
                  data-aos-anchor="#parent"
                />
                <p className={robotoBold.className}>
                  {errors.password && <>{t("passwordfirsterror")}</>}
                </p>
              </div>
              <div className={styles.options}>
                <div
                  className={styles.rememberme}
                  data-aos="fade-up"
                  data-aos-duration="400"
                  data-aos-delay="500"
                  data-aos-anchor="#parent"
                >
                  <Controller
                    name="remember"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Checkbox
                        id="remember"
                        label={t("rememberme")}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <div
                  className={styles.forgotpassword}
                  data-aos="fade-up"
                  data-aos-duration="400"
                  data-aos-delay="500"
                  data-aos-anchor="#parent"
                >
                  <span
                    className={robotoBold.className}
                    onClick={() => push("/forgotpassword")}
                  >
                    {t("forgotpassword")}
                  </span>
                </div>
              </div>
              {isSubmitting ? (
                <button
                  aria-label="login button"
                  className={styles.loginbutton}
                  disabled={true}
                  data-aos="fade-up"
                  data-aos-duration="400"
                  data-aos-delay="550"
                  data-aos-anchor="#parent"
                >
                  <span className={robotoBold.className}>{t("wait")}</span>
                  <CircularProgress sx={{ color: "grey" }} size={25} />
                </button>
              ) : (
                <button
                  aria-label="login button"
                  className={styles.loginbutton}
                  onClick={handleSubmit(onSubmit)}
                  data-aos="fade-up"
                  data-aos-duration="400"
                  data-aos-delay="550"
                  data-aos-anchor="#parent"
                >
                  <span className={robotoBold.className}>{t("login")}</span>
                </button>
              )}
              <div
                className={styles.signup}
                data-aos="fade-up"
                data-aos-duration="400"
                data-aos-delay="600"
                data-aos-anchor="#parent"
              >
                <span className={lora.className}>{t("accountmsg")}</span>
                <span
                  className={robotoBold.className}
                  onClick={() => push("/signup")}
                >
                  {t("signup")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
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
        ["login"],
        require("../../i18next.config")
      )),
    },
  };
};
