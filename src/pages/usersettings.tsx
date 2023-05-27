import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Usersettings.module.css";
import errorstyles from "@/styles/Error.module.css";
import { Roboto, Lora } from "@next/font/google";
import { useUser } from "@/utils/userProvider";
import Image from "next/image";
import Dropzone from "@/components/ui/Dropzone/Dropzone";
import { useEffect, useState } from "react";
import { useCountries } from "@/hooks/useCountries";
import { toast } from "react-toastify";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchUser } from "@/queries/fetchUser";
import axios from "axios";
import { z } from "zod";

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

export default function Usersettings() {
  const { t: nav } = useTranslation("navbar");
  const { t } = useTranslation("usersettings");
  const [mounted, setMounted] = useState(false);
  const { user, setUser } = useUser();

  const { loading, errorMessage, sortedCountries } = useCountries();

  const usernameType = z.object({
    username: z.string().min(5).max(14),
  });

  type UsernameType = z.infer<typeof usernameType>;

  const emailType = z.object({
    email: z.string().email(),
  });

  type EmailType = z.infer<typeof emailType>;

  const countryType = z.object({
    country: z.string().min(1),
  });

  type CountryType = z.infer<typeof countryType>;

  const phoneType = z.object({
    phone: z.string().refine((value: string) => {
      if (value != null) {
        return isValidPhoneNumber(value);
      } else {
        return false;
      }
    }),
  });

  const passwordType = z.object({
    password: z.string().min(8),
  });

  type PasswordType = z.infer<typeof passwordType>;

  const [username, setUsername] = useState<UsernameType>();
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameError, setUsernameError] = useState<Record<string, string>>(
    {}
  );
  const [email, setEmail] = useState<EmailType>();
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState<Record<string, string>>({});
  const [country, setCountry] = useState<CountryType>();
  const [countryLoading, setCountryLoading] = useState(false);
  const [countryError, setCountryError] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState(user?.phone);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<Record<string, string>>({});
  const [password, setPassword] = useState<PasswordType>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<Record<string, string>>(
    {}
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const cpwde = t("cpwde");
  const unsucc = t("unsucc");
  const emsucc = t("emsucc");
  const cnsucc = t("cnsucc");
  const phsucc = t("phsucc");
  const pwdsucc = t("pwdsucc");
  const pwda = t("pwda");

  useEffect(() => {
    if (user != undefined) {
      setUsername({ username: user.username });
      setEmail({ email: user.email });
      setCountry({ country: user.country });
      setPhone(user.phone);
    }
  }, [user]);

  useEffect(() => {
    if (confirmPassword != "") {
      if (confirmPassword != password?.password) {
        setConfirmPasswordError(cpwde);
      } else {
        setConfirmPasswordError("");
      }
    }
  }, [confirmPassword, confirmPasswordError, cpwde, password, passwordError]);

  const searchSelectedCountry: any = sortedCountries.find((obj: any) => {
    if (country != null) {
      if (obj.name.common === country.country) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  });

  const getMe = async () => {
    const [error, user] = await fetchUser();
    if (!error && user) {
      if (user == "your are not login") {
        setUser(null);
      } else {
        setUser(user);
      }
    } else {
      return;
    }
  };

  const handleUpdateUsername = async () => {
    setUsernameLoading(true);
    const parsedUsername = usernameType.safeParse(username);
    if (!parsedUsername.success) {
      const error = parsedUsername.error;
      let newError = {};
      for (const issue of error.issues) {
        newError = {
          ...newError,
          [issue.path[0]]: issue.message,
        };
      }
      setUsernameLoading(false);
      console.log(newError);
      return setUsernameError(newError);
    }
    await new Promise<void>(async (resolve) => {
      if (username?.username != user?.username && username?.username != "") {
        try {
          const res = await axios.put(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/updateusername/${user?._id}`,
            username
          );
          if (res.data == " username updated") {
            toast.success(unsucc);
            getMe();
            setUsernameLoading(false);
            setUsernameError({});
            resolve();
          } else {
            toast.error("500 - Internal server error.");
            setUsernameLoading(false);
            setUsernameError({});
            resolve();
          }
        } catch (error: any) {
          toast.error("500 - Internal server error.");
          console.log(error);
          setUsernameLoading(false);
          setUsernameError({});
          resolve();
        }
      } else {
        setUsernameLoading(false);
        setUsernameError({});
        resolve();
      }
    });
  };

  const handleUpdateEmail = async () => {
    setEmailLoading(true);
    const parsedEmail = emailType.safeParse(email);
    if (!parsedEmail.success) {
      const error = parsedEmail.error;
      let newError = {};
      for (const issue of error.issues) {
        newError = {
          ...newError,
          [issue.path[0]]: issue.message,
        };
      }
      setEmailLoading(false);
      console.log(newError);
      return setEmailError(newError);
    }
    await new Promise<void>(async (resolve) => {
      if (email?.email != user?.email && email?.email != "") {
        try {
          const res = await axios.put(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/updateEmail/${user?._id}`,
            email
          );
          if (res.data == " email updated") {
            toast.success(emsucc);
            getMe();
            setEmailLoading(false);
            setEmailError({});
            resolve();
          } else {
            toast.error("500 - Internal server error.");
            setEmailLoading(false);
            setEmailError({});
            resolve();
          }
        } catch (error: any) {
          toast.error("500 - Internal server error.");
          console.log(error);
          setEmailLoading(false);
          setEmailError({});
          resolve();
        }
      } else {
        setEmailLoading(false);
        setEmailError({});
        resolve();
      }
    });
  };

  const handleUpdateCountry = async () => {
    setCountryLoading(true);
    const parsedCountry = countryType.safeParse(country);
    if (!parsedCountry.success) {
      const error = parsedCountry.error;
      let newError = {};
      for (const issue of error.issues) {
        newError = {
          ...newError,
          [issue.path[0]]: issue.message,
        };
      }
      setCountryLoading(false);
      console.log(newError);
      return setCountryError(newError);
    }
    await new Promise<void>(async (resolve) => {
      if (country?.country != user?.country && country?.country != "") {
        try {
          const res = await axios.put(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/updateCountry/${user?._id}`,
            country
          );
          if (res.data == " Country updated") {
            toast.success(cnsucc);
            getMe();
            setCountryLoading(false);
            setCountryError({});
            resolve();
          } else {
            toast.error("500 - Internal server error.");
            setCountryLoading(false);
            setCountryError({});
            resolve();
          }
        } catch (error: any) {
          toast.error("500 - Internal server error.");
          console.log(error);
          setCountryLoading(false);
          setCountryError({});
          resolve();
        }
      } else {
        setCountryLoading(false);
        setCountryError({});
        resolve();
      }
    });
  };

  const handleUpdatePhone = async () => {
    setPhoneLoading(true);
    const parsedPhone = phoneType.safeParse({ phone: phone });
    if (!parsedPhone.success) {
      const error = parsedPhone.error;
      let newError = {};
      for (const issue of error.issues) {
        newError = {
          ...newError,
          [issue.path[0]]: issue.message,
        };
      }
      setPhoneLoading(false);
      console.log(newError);
      return setPhoneError(newError);
    }
    await new Promise<void>(async (resolve) => {
      let formData = new FormData();
      formData.append("phone", phone);
      if (phone != user?.phone && phone != "") {
        try {
          const res = await axios.put(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/updatephone/${user?._id}`,
            formData
          );
          if (res.data == " phone updated") {
            toast.success(phsucc);
            getMe();
            setPhoneLoading(false);
            setPhoneError({});
            resolve();
          } else {
            toast.error("500 - Internal server error.");
            setPhoneLoading(false);
            setPhoneError({});
            resolve();
          }
        } catch (error: any) {
          toast.error("500 - Internal server error.");
          console.log(error);
          setPhoneLoading(false);
          setPhoneError({});
          resolve();
        }
      } else {
        setPhoneLoading(false);
        setPhoneError({});
        resolve();
      }
    });
  };

  const handleUpdatePassword = async () => {
    setPasswordLoading(true);
    if (confirmPassword == password?.password) {
      const parsedPassword = passwordType.safeParse(password);
      if (!parsedPassword.success) {
        const error = parsedPassword.error;
        let newError = {};
        for (const issue of error.issues) {
          newError = {
            ...newError,
            [issue.path[0]]: issue.message,
          };
        }
        setPasswordLoading(false);
        return setPasswordError(newError);
      }
      await new Promise<void>(async (resolve) => {
        if (password?.password != user?.password && password?.password != "") {
          try {
            const res = await axios.put(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/updatepassword/${user?._id}`,
              password
            );
            if (res.data == " password updated") {
              toast.success(pwdsucc);
              getMe();
              setPasswordLoading(false);
              setPasswordError({});
              resolve();
            } else {
              toast.error("500 - Internal server error.");
              setPasswordLoading(false);
              setPasswordError({});
              resolve();
            }
          } catch (error: any) {
            toast.error("500 - Internal server error.");
            console.log(error);
            setPasswordLoading(false);
            setPasswordError({});
            resolve();
          }
        } else {
          setPasswordLoading(false);
          setPasswordError({});
          resolve();
        }
      });
    } else {
      toast.error(pwda);
      setPasswordLoading(false);
      setPasswordError({});
    }
  };

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
            <div className={styles.userimage}>
              <Image
                src={user.imageurl}
                alt={"user image"}
                width={100}
                height={100}
              />
            </div>
            <h1 className={roboto.className}>{user.username}</h1>
            <p className={lora.className}>{user.email}</p>

            <div className={styles.firstsection}>
              <h2 className={roboto.className}>{t("pp")}</h2>
              <Dropzone dd={t("dd")} ch={t("ch")} ppu={t("ppsucc")} />
            </div>
            <div className={styles.firstsection}>
              <h2 className={roboto.className}>{t("un")}</h2>
              <div className={styles.details}>
                <div className={styles.input}>
                  <input
                    value={username != null ? username.username : ""}
                    type="text"
                    onChange={(e) => setUsername({ username: e.target.value })}
                    disabled={usernameLoading}
                  />
                  <p className={robotoBold.className}>
                    {usernameError != null && <>{usernameError.username}</>}
                  </p>
                </div>
                {usernameLoading ? (
                  <div className={styles.loading}>
                    <CircularProgress sx={{ color: "grey" }} size={25} />
                  </div>
                ) : (
                  <button
                    aria-label="update button"
                    className={styles.updatebutton}
                    onClick={handleUpdateUsername}
                  >
                    <span className={robotoBold.className}>{t("up")}</span>
                  </button>
                )}
              </div>
            </div>
            <div className={styles.firstsection}>
              <h2 className={roboto.className}>{t("em")}</h2>
              <div className={styles.details}>
                <div className={styles.input}>
                  <input
                    value={email != null ? email.email : ""}
                    type="email"
                    onChange={(e) => setEmail({ email: e.target.value })}
                    disabled={emailLoading}
                  />
                  <p className={robotoBold.className}>
                    {emailError != null && <>{emailError.email}</>}
                  </p>
                </div>
                {emailLoading ? (
                  <div className={styles.loading}>
                    <CircularProgress sx={{ color: "grey" }} size={25} />
                  </div>
                ) : (
                  <button
                    aria-label="update button"
                    className={styles.updatebutton}
                    onClick={handleUpdateEmail}
                  >
                    <span className={robotoBold.className}>{t("up")}</span>
                  </button>
                )}
              </div>
            </div>
            <div className={styles.firstsection}>
              <h2 className={roboto.className}>{t("cn")}</h2>
              {loading === true ? (
                <CircularProgress sx={{ color: "grey" }} size={25} />
              ) : (
                <>
                  {errorMessage !== "" ? (
                    <div>{errorMessage}</div>
                  ) : (
                    <div className={styles.details}>
                      <div className={styles.input}>
                        <select
                          onChange={(e) =>
                            setCountry({ country: e.target.value })
                          }
                          disabled={countryLoading}
                        >
                          <option>{user?.country}</option>
                          {sortedCountries.map((country: any) => {
                            if (country.name.common != user?.country)
                              return (
                                <option key={country.name.common}>
                                  {country.name.common}
                                </option>
                              );
                          })}
                        </select>
                        <p className={robotoBold.className}>
                          {countryError != null && <>{countryError.country}</>}
                        </p>
                      </div>
                      {countryLoading ? (
                        <div className={styles.loading}>
                          <CircularProgress sx={{ color: "grey" }} size={25} />
                        </div>
                      ) : (
                        <button
                          aria-label="update button"
                          className={styles.updatebutton}
                          onClick={handleUpdateCountry}
                        >
                          <span className={robotoBold.className}>
                            {t("up")}
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className={styles.firstsection}>
              <h2 className={roboto.className}>{t("ph")}</h2>
              {loading === true ? (
                <CircularProgress sx={{ color: "grey" }} size={25} />
              ) : (
                <>
                  {errorMessage !== "" ? (
                    <div>{errorMessage}</div>
                  ) : (
                    <div className={styles.details}>
                      <div className={styles.input}>
                        {searchSelectedCountry && (
                          <div className={styles.phone}>
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
                                  searchSelectedCountry.idd.suffixes
                                    .toString()
                                    .substring(0, 2)}
                              </span>
                            </div>
                            <PhoneInput
                              value={phone}
                              onChange={setPhone}
                              disabled={phoneLoading}
                              defaultCountry={
                                searchSelectedCountry &&
                                searchSelectedCountry.cca2
                              }
                              id="phone"
                            />
                          </div>
                        )}
                        <p className={robotoBold.className}>
                          {phoneError != null && <>{phoneError.phone}</>}
                        </p>
                      </div>
                      {phoneLoading ? (
                        <div className={styles.loading}>
                          <CircularProgress sx={{ color: "grey" }} size={25} />
                        </div>
                      ) : (
                        <button
                          aria-label="update button"
                          className={styles.updatebutton}
                          onClick={handleUpdatePhone}
                        >
                          <span className={robotoBold.className}>
                            {t("up")}
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className={styles.firstsection}>
              <h2 className={roboto.className}>{t("pw")}</h2>
              <div className={styles.details}>
                <div className={styles.input}>
                  <span className={lora.className}>{t("pwd")}</span>
                  <input
                    type="password"
                    onChange={(e) => setPassword({ password: e.target.value })}
                    disabled={passwordLoading}
                  />
                  <p className={robotoBold.className}>
                    {passwordError != null && <>{passwordError.password}</>}
                  </p>
                </div>
                <div className={styles.input}>
                  <span className={lora.className}>{t("cpwd")}</span>
                  <input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={passwordLoading}
                  />
                  <p className={robotoBold.className}>
                    {confirmPasswordError != "" && <>{confirmPasswordError}</>}
                  </p>
                </div>
                {emailLoading ? (
                  <div className={styles.loading}>
                    <CircularProgress sx={{ color: "grey" }} size={25} />
                  </div>
                ) : (
                  <button
                    aria-label="update button"
                    className={styles.updatebutton}
                    onClick={handleUpdatePassword}
                  >
                    <span className={robotoBold.className}>{t("up")}</span>
                  </button>
                )}
              </div>
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
      ...(await serverSideTranslations(locale, ["navbar", "usersettings"])),
    },
  };
};
