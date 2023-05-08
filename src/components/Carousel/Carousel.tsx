import React, { ReactNode } from "react";
import styles from "./Carousel.module.css";
import Image from "next/image";
import image from "public/images/greece.jpg";

interface Prop {
  children: ReactNode;
  slides: number;
  selected: number;
}

function Carousel({ children, selected, slides }: Prop) {
  const [curr, setCurr] = React.useState(0);

  React.useEffect(() => {
    setCurr(selected);
  }, [selected]);

  const prev = () => setCurr((curr) => (curr === 0 ? slides - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slides - 1 ? 0 : curr + 1));
  return (
    <div className={styles.container}>
      <div className={styles.overlay} />
      <div
        className={styles.images}
        style={{
          transform: curr ? `translateX(-${curr * 100}%)` : "",
        }}
      >
        {children}
      </div>
      <div className={styles.navigation}>
        <button onClick={prev}>
          <svg height="50" viewBox="0 96 960 960" width="50">
            <path
              fill="currentColor"
              d="M561 816 320 575l241-241 43 43-198 198 198 198-43 43Z"
            />
          </svg>
        </button>
        <button onClick={next}>
          <svg height="50" viewBox="0 96 960 960" width="50">
            <path
              fill="currentColor"
              d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"
            />
          </svg>
        </button>
      </div>
      <div className={styles.indicators}>
        <div className={styles.indicator}>
          {Array.from({ length: slides }).map((_, index: number) => {
            return (
              <div
                key={index}
                className={styles.styledindicator}
                onClick={() => setCurr(index)}
                style={{
                  opacity: curr == index ? "1" : "0.5",
                  transform: curr == index ? "scale(0.9)" : "scale(0.6)",
                  transition: "transform 200ms ease-in-out",
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
