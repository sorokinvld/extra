import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import styles from "@/styles/Signup.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { Roboto, Lora } from "@next/font/google";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input/input";
import { useCountries } from "@/hooks/useCountries";
import {
  SignupFormSchemaType,
  signupFormSchema,
} from "@/types/signupFormSchema";
import AOS from "aos";
import CircularProgress from "@mui/material/CircularProgress";
import { createUser } from "@/queries/createUser";
import { toast } from "react-toastify";

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

export default function Signup() {
  const { t } = useTranslation("signup");
  const [step, setStep] = useState<number>(1);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [validStep, setValidStep] = useState<boolean>(false);
  const confirmpassworderrort = t("confirmpassworderror");
  const { push, back } = useRouter();

  const { loading, errorMessage, sortedCountries } = useCountries();

  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
    mode: "all",
  });

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (errors.username || errors.email || errors.password) {
      setValidStep(false);
    } else if (confirmPassword == "") {
      setValidStep(false);
    } else if (confirmPassword != "") {
      if (confirmPassword != watch("password")) {
        setConfirmPasswordError(confirmpassworderrort);
        setValidStep(false);
      } else {
        setConfirmPasswordError("");
        if (!errors.username && !errors.email && !errors.password) {
          setValidStep(true);
        }
      }
    }
  }, [
    confirmPassword,
    watch,
    confirmpassworderrort,
    errors.username,
    errors.email,
    errors.password,
  ]);

  const searchSelectedCountry: any = sortedCountries.find((obj: any) => {
    if (obj.name.common === watch("country")) {
      return true;
    }
    return false;
  });

  const handleStep = () => {
    setStep(step + 1);
  };

  const goBack = () => {
    setStep(step - 1);
  };

  const onSubmit: SubmitHandler<SignupFormSchemaType> = async (data) => {
    await new Promise<void>(async (resolve) => {
      const res = await createUser(data);
      if (res == "Account has been created") {
        toast.success(t("success"));
        back();
      } else if (res == "Account already exists") {
        toast.error(t("errorsignup"));
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
        <title>Extra Virgin Travel | Sign up</title>
        <meta name="description" content="sign up to our website here." />
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
              height="30"
              viewBox="0 96 960 960"
              width="30"
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
                className={styles.divider}
                data-aos="fade-up"
                data-aos-duration="400"
                data-aos-delay="150"
                data-aos-anchor="#parent"
              >
                <span className={robotoBold.className}>{step} / 2</span>
              </div>
            </div>
            {step == 1 && (
              <div
                step-state={step == 1 ? "current" : ""}
                className={styles.secondsection}
              >
                <div className={styles.input}>
                  <span
                    className={robotoBold.className}
                    data-aos="fade-right"
                    data-aos-duration="400"
                    data-aos-delay="200"
                    data-aos-anchor="#parent"
                  >
                    {t("username")}
                  </span>
                  <input
                    type="text"
                    {...register("username")}
                    disabled={isSubmitting}
                    data-aos="fade-up"
                    data-aos-duration="400"
                    data-aos-delay="250"
                    data-aos-anchor="#parent"
                  />
                  <p className={robotoBold.className}>
                    {errors.username && <>{t("usernameerror")} </>}
                  </p>
                </div>
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
                    type="email"
                    {...register("email")}
                    disabled={isSubmitting}
                    data-aos="fade-up"
                    data-aos-duration="400"
                    data-aos-delay="350"
                    data-aos-anchor="#parent"
                  />
                  <p className={robotoBold.className}>
                    {errors.email && <>{t("emailerror")} </>}
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
                    type="password"
                    {...register("password")}
                    disabled={isSubmitting}
                    data-aos="fade-up"
                    data-aos-duration="400"
                    data-aos-delay="450"
                    data-aos-anchor="#parent"
                  />
                  <p className={robotoBold.className}>
                    {errors.password && <>{t("passworderror")}</>}
                  </p>
                </div>
                <div className={styles.input}>
                  <span
                    className={robotoBold.className}
                    data-aos="fade-right"
                    data-aos-duration="400"
                    data-aos-delay="500"
                    data-aos-anchor="#parent"
                  >
                    {t("confirmpassword")}
                  </span>
                  <input
                    value={confirmPassword}
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isSubmitting}
                    data-aos="fade-up"
                    data-aos-duration="400"
                    data-aos-delay="550"
                    data-aos-anchor="#parent"
                  />
                  <p className={robotoBold.className}>{confirmPasswordError}</p>
                </div>
                <button
                  aria-label="next button"
                  className={styles.singupbutton}
                  onClick={handleStep}
                  disabled={!validStep || isSubmitting}
                  data-aos="fade-up"
                  data-aos-duration="400"
                  data-aos-delay="600"
                  data-aos-anchor="#parent"
                >
                  <span className={robotoBold.className}>{t("next")}</span>
                </button>
                <div
                  className={styles.login}
                  data-aos="fade-up"
                  data-aos-duration="400"
                  data-aos-delay="650"
                  data-aos-anchor="#parent"
                >
                  <span className={lora.className}>{t("accountmsg")}</span>
                  <span
                    className={robotoBold.className}
                    onClick={() => push("/login")}
                  >
                    {t("login")}
                  </span>
                </div>
              </div>
            )}
            {step >= 2 && (
              <>
                {loading === true ? (
                  <CircularProgress sx={{ color: "grey" }} size={25} />
                ) : (
                  <>
                    {errorMessage !== "" ? (
                      <div>{errorMessage}</div>
                    ) : (
                      <div
                        step-state={step == 2 ? "current" : ""}
                        className={styles.secondsection}
                      >
                        <div className={styles.input}>
                          <span
                            className={robotoBold.className}
                            data-aos="fade-right"
                            data-aos-duration="400"
                          >
                            {t("country")}
                          </span>
                          <select
                            {...register("country")}
                            disabled={isSubmitting}
                            data-aos="fade-up"
                            data-aos-duration="400"
                            data-aos-delay="50"
                          >
                            <option value="none" selected disabled hidden>
                              - - -
                            </option>
                            {sortedCountries.map((country: any) => {
                              return (
                                <option key={country.name.common}>
                                  {country.name.common}
                                </option>
                              );
                            })}
                          </select>
                          <p className={robotoBold.className}>
                            {errors.country && <>{t("countryerror")}</>}
                          </p>
                        </div>
                        <div className={styles.input}>
                          <span
                            className={robotoBold.className}
                            data-aos="fade-right"
                            data-aos-duration="400"
                            data-aos-delay="100"
                          >
                            {t("phone")}
                          </span>
                          {searchSelectedCountry && (
                            <div
                              className={styles.phone}
                              data-aos="fade-up"
                              data-aos-duration="400"
                              data-aos-delay="150"
                            >
                              <div>
                                <Image
                                  src={
                                    searchSelectedCountry &&
                                    searchSelectedCountry.flags.png
                                  }
                                  alt="flag"
                                  width={64}
                                  height={32}
                                />
                              </div>
                              <div className={styles.phonesuffixe}>
                                <span className={robotoBold.className}>
                                  {searchSelectedCountry &&
                                    searchSelectedCountry.idd.root}
                                  {searchSelectedCountry &&
                                    searchSelectedCountry.idd.suffixes}
                                </span>
                              </div>
                              <Controller
                                name="phone"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <PhoneInput
                                    value={value}
                                    onChange={onChange}
                                    disabled={isSubmitting}
                                    defaultCountry={
                                      searchSelectedCountry &&
                                      searchSelectedCountry.cca2
                                    }
                                    id="phone"
                                  />
                                )}
                              />
                            </div>
                          )}
                          <p
                            className={robotoBold.className}
                            data-aos="fade-up"
                            data-aos-duration="400"
                            data-aos-delay="200"
                          >
                            {errors.phone && <>{t("phoneerror")}</>}
                          </p>
                        </div>
                        {isSubmitting ? (
                          <button
                            aria-label="sign up button"
                            className={styles.singupbutton}
                            disabled={true}
                            data-aos="fade-up"
                            data-aos-duration="400"
                            data-aos-delay="200"
                          >
                            <span className={robotoBold.className}>
                              {t("wait")}
                            </span>
                            <CircularProgress
                              sx={{ color: "grey" }}
                              size={25}
                            />
                          </button>
                        ) : (
                          <button
                            aria-label="sign up button"
                            className={styles.singupbutton}
                            disabled={!isValid}
                            onClick={handleSubmit(onSubmit)}
                            data-aos="fade-up"
                            data-aos-duration="400"
                            data-aos-delay="200"
                          >
                            <span className={robotoBold.className}>
                              {t("signup")}
                            </span>
                          </button>
                        )}
                        <div
                          className={styles.goback}
                          data-aos="fade-up"
                          data-aos-duration="400"
                          data-aos-delay="250"
                        >
                          <span
                            className={robotoBold.className}
                            onClick={goBack}
                          >
                            {t("goback")}
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
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
      ...(await serverSideTranslations(locale, ["signup"])),
    },
  };
};
