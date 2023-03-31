import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { CurrencyProvider } from "@/lib/currencyProvider";
import NextNProgress from "@/components/ui/ProgressBar";
import { ParallaxProvider } from "react-scroll-parallax";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/lib/userProvider";

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ParallaxProvider>
        <CurrencyProvider>
          <ToastContainer position="bottom-right" newestOnTop />
          <NextNProgress />
          <Component {...pageProps} />
        </CurrencyProvider>
      </ParallaxProvider>
    </UserProvider>
  );
}
export default appWithTranslation(App);
