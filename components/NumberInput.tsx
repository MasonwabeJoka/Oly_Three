import styles from "./NumberInput.module.scss";
import Image from "next/image";
import { useRef, useState } from "react";
import useSidebarStore from "@/store/useSidebarStore";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

interface InputProps {
  className?: string;
  inputSize: keyof typeof INPUT_SIZE.regular | keyof typeof INPUT_SIZE.feed | keyof typeof INPUT_SIZE.dashboard;
  inputColourType?: keyof typeof INPUT_COLOUR_TYPE;
  placeholder?: string;
  dashboard?: boolean;
  label: string;
  id: string;
  name: string;
  ariaLabel: string;
  autoFocus: boolean;
  autoComplete?: "on" | "off";
  readonly?: boolean;
  required: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

const INPUT_SIZE = {
  regular: {
    xxLarge: `${styles.xxLarge}`,
    xLarge: `${styles.xLarge}`,
    large: `${styles.large}`,
    medium: `${styles.medium}`,
    "": "",
  },
  feed: {
    xxLarge: `${styles.xxLargeFeed}`,
    xLarge: `${styles.xLargeFeed}`,
    large: `${styles.largeFeed}`,
    medium: `${styles.mediumFeed}`,
    "": "",
  },
  dashboard: {
    xxLarge: `${styles.xxLargeDashboard}`,
    xLarge: `${styles.xLargeDashboard}`,
    large: `${styles.largeDashboard}`,
    medium: `${styles.mediumDashboard}`,
    "": "",
  },
};

const INPUT_COLOUR_TYPE = {
  primary: `${styles.primary}`,
  normal: `${styles.normal}`,
  round: `${styles.round}`,
  outlined: `${styles.outlined}`,
  success: `${styles.success}`,
  warning: `${styles.warning}`,
  danger: `${styles.danger}`,
  info: `${styles.info}`,
  link: `${styles.linkBtn}`,
  "": "",
};

const NumberInput = ({
  className,
  inputSize,
  inputColourType,
  placeholder,
  dashboard,
  label,
  id,
  name,
  ariaLabel,
  autoFocus,
  autoComplete,
  readonly,
  required,
  value,
  onChange,
  onIncrement,
  onDecrement,
}: InputProps): JSX.Element => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const [isPlaceholderActive, setIsPlaceholderActive] = useState(true);
  const [internalPlaceholder, setInternalPlaceholder] = useState(placeholder);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setIsPlaceholderActive(true);
    } else {
      setIsPlaceholderActive(false);
    }
    onChange(event);
  };

  const handleFocus = () => {
    setIsPlaceholderActive(false);
    setInternalPlaceholder("");
  };

  useOnClickOutside(inputRef, () => {
    if (value === "") {
      setIsPlaceholderActive(true);
      setInternalPlaceholder(placeholder);
    }
  });

  let sizeClass = "";
  sizeClass = isSidebarOpen
    ? INPUT_SIZE.feed[inputSize]
    : dashboard
      ? INPUT_SIZE.dashboard[inputSize]
      : INPUT_SIZE.regular[inputSize];

  const inputClass = `${styles.input} ${sizeClass} ${inputColourType ? INPUT_COLOUR_TYPE[inputColourType] : ""} ${className}`;

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="number"
        className={inputClass}
        value={isPlaceholderActive ? "" : value}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={internalPlaceholder}
      />
      {!isPlaceholderActive && (
        <div className={styles.arrows} ref={inputRef}>
          <div className={styles.upArrow}>
            <Image
              src="/icons/arrow-up.png"
              alt="Increment"
              width={24}
              height={24}
              onClick={onIncrement}
            />
          </div>
          <div className={styles.downArrow}>
            <Image
              src="/icons/arrow-down.png"
              alt="Decrement"
              width={24}
              height={24}
              onClick={onDecrement}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberInput;
  