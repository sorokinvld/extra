import React from "react";
import { Roboto } from "@next/font/google";
import styles from "./Button.module.css";

interface Props {
  label: string;
}

const robotoButton = Roboto({
  subsets: ["latin"],
  weight: "400",
});

function Button({ label }: Props) {
  return (
    <div className={styles.button}>
      <span className={robotoButton.className}>{label}</span>
    </div>
  );
}

export default Button;
