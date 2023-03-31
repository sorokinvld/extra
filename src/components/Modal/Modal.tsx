import React from "react";
import styles from "./Modal.module.css";
import { Roboto } from "@next/font/google";

const robotokindaBold = Roboto({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

function Modal({ show, onClose, children, title, setShow }: any) {
  const handleCloseClick = (e: any) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className={styles.container} show-state={show ? "true" : ""}>
      <div
        className={styles.overlay}
        show-state={show ? "true" : ""}
        onClick={() => {
          setShow(!show);
        }}
      />
      <div className={styles.modal} show-state={show ? "true" : ""}>
        <div className={styles.modalheader}>
          <div className={styles.close} onClick={handleCloseClick}>
            <svg height="24" viewBox="0 96 960 960" width="24">
              <path
                fill="currentColor"
                d="m256 856-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
              />
            </svg>
          </div>
          {title && (
            <div className={styles.title}>
              <span className={robotokindaBold.className}>{title}</span>
            </div>
          )}
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
export default Modal;
