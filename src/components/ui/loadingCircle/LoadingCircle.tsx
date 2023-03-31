import React from "react";
import styles from "./LoadingCircle.module.css";

function LoadingCircle() {
  return (
    <svg className={styles.svg}>
      <circle cx="13" cy="13" r="13" fill="currentColor" />
    </svg>
  );
}

export default LoadingCircle;
