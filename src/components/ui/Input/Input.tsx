import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Input.module.css";
import { Roboto } from "@next/font/google";

interface Props {
  label: string;
  errorText: string;
  setErrorText?: Dispatch<SetStateAction<string>>;
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
});

function Input({ label, errorText, setErrorText }: Props) {
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    setErrorMsg(errorText);
  }, [errorText]);

  return (
    <div className={styles.container}>
      <label className={roboto.className}>{label}</label>
      <input />
      <p className={roboto.className}>{errorMsg}</p>
    </div>
  );
}

export default Input;
