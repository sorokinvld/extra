/* eslint-disable react-hooks/exhaustive-deps */
import Router from "next/router";
import * as NProgress from "nprogress";
import * as PropTypes from "prop-types";
import * as React from "react";

export interface NextNProgressProps {
  /**
   * The color of the bar.
   * @default "#2d8172"
   */
  color?: string;
  /**
   * The start position of the bar.
   * @default 0.3
   */
  startPosition?: number;
  /**
   * The stop delay in milliseconds.
   * @default 200
   */
  stopDelayMs?: number;
  /**
   * The height of the bar.
   * @default 3
   */
  height?: number;
  /**
   * Whether to show the bar on shallow routes.
   * @default true
   */
  showOnShallow?: boolean;
  /**
   * The other NProgress configuration options to pass to NProgress.
   * @default null
   */
  options?: Partial<NProgress.NProgressOptions>;
  /**
   * The nonce attribute to use for the `style` tag.
   * @default undefined
   */
  nonce?: string;

  /**
   * Use your custom CSS tag instead of the default one.
   * This is useful if you want to use a different style or minify the CSS.
   * @default (css) => <style nonce={nonce}>{css}</style>
   */
  transformCSS?: (css: string) => JSX.Element;
}

const NextNProgress = ({
  color = "#2d8172",
  startPosition = 0.8,
  stopDelayMs = 100,
  height = 4,
  showOnShallow = true,
  options,
  nonce,
  transformCSS = (css) => <style nonce={nonce}>{css}</style>,
}: NextNProgressProps) => {
  let timer: NodeJS.Timeout | null = null;

  React.useEffect(() => {
    if (options) {
      NProgress.configure(options);
    }
    Router.events.on("routeChangeStart", routeChangeStart);
    Router.events.on("routeChangeComplete", routeChangeEnd);
    Router.events.on("routeChangeError", routeChangeError);
    return () => {
      Router.events.off("routeChangeStart", routeChangeStart);
      Router.events.off("routeChangeComplete", routeChangeEnd);
      Router.events.off("routeChangeError", routeChangeError);
    };
  }, []);

  const routeChangeStart = (
    _: string,
    {
      shallow,
    }: {
      shallow: boolean;
    }
  ) => {
    if (!shallow || showOnShallow) {
      NProgress.set(startPosition);
      NProgress.start();
    }
  };

  const routeChangeEnd = (
    _: string,
    {
      shallow,
    }: {
      shallow: boolean;
    }
  ) => {
    if (!shallow || showOnShallow) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        NProgress.done(true);
      }, stopDelayMs);
    }
  };

  const routeChangeError = (
    _err: Error,
    _url: string,
    {
      shallow,
    }: {
      shallow: boolean;
    }
  ) => {
    if (!shallow || showOnShallow) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        NProgress.done(true);
      }, stopDelayMs);
    }
  };

  return transformCSS(`
    #nprogress {
      pointer-events: none;
    }
    #nprogress .bar {
      background: ${color};
      position: fixed;
      z-index: 9999;
      top: 0;
      left: 0;
      width: 100vw;
      height: ${height}px;
    }
    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
      opacity: 1;
      -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
      transform: rotate(3deg) translate(0px, -4px);
    }
    #nprogress .spinner {
        display: none;
    }
    #nprogress .spinner-icon {
        display: none;
    }
    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }
    }
  `);
};

NextNProgress.propTypes = {
  color: PropTypes.string,
  startPosition: PropTypes.number,
  stopDelayMs: PropTypes.number,
  height: PropTypes.number,
  showOnShallow: PropTypes.bool,
  options: PropTypes.object,
  nonce: PropTypes.string,
  transformCSS: PropTypes.func,
};

export default React.memo(NextNProgress);
