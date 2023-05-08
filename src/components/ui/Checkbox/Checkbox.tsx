import { useState, InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain,
} from "@react-spring/web";
import { Roboto } from "@next/font/google";

interface ICheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const robotoBold = Roboto({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

function Checkbox(props: ICheckBoxProps) {
  const { label, ...restProps } = props;
  const [isChecked, setIsChecked] = useState(false);
  const checkboxAnimationRef = useSpringRef();
  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? "#2d8172" : "#fff",
    borderColor: isChecked ? "#2d8172" : "#ddd",
    config: config.gentle,
    ref: checkboxAnimationRef,
  });

  const [checkmarkLength, setCheckmarkLength] = useState<number>();

  const checkmarkAnimationRef = useSpringRef();
  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef,
  });

  useChain(
    isChecked
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1]
  );

  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        onClick={() => {
          setIsChecked(!isChecked);
        }}
        {...restProps}
      />
      <animated.svg
        style={checkboxAnimationStyle}
        className={styles.checkbox}
        active-state={isChecked ? "active" : ""}
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <animated.path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke="#fff"
          ref={(ref) => {
            if (ref) {
              setCheckmarkLength(ref.getTotalLength());
            }
          }}
          strokeDasharray={checkmarkLength}
          strokeDashoffset={checkmarkAnimationStyle.x}
        />
      </animated.svg>
      <span className={robotoBold.className}>{label}</span>
    </label>
  );
}

export default Checkbox;
