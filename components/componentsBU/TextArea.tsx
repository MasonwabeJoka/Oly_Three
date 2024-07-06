"use client";
import styles from "./TextArea.module.scss";
import { useState, useEffect, useRef } from "react";
import useSidebarStore from "@/store/useSidebarStore";

interface Props {
  className: string;
  placeholder?: string;
  value?: string;
  label: string;
  id: string;
  name: string;
  size: keyof typeof SIZE.regular | keyof typeof SIZE.feed;
  style?: any;
  required: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  // onSubmit?: (event: React.SubmitEvent<HTMLTextAreaElement>) => void;
  onSubmit?: any;
}

const SIZE = {
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
};

const TextArea = ({
  className,
  placeholder,
  value,
  label,
  id,
  name,
  size,
  required,
  style,
  onChange,
  onClick,
  onFocus,
  onBlur,
  onSubmit,
}: Props): JSX.Element => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const [centered, setCentered] = useState(true);

  let sizeClass = "";

  if (isSidebarOpen) {
    sizeClass = SIZE.feed[size];
  } else {
    sizeClass = SIZE.regular[size];
  }

  const textareaStyles = () => {
    if (sizeClass === "xxLarge") {
      return {
        padding: "2rem 8rem",
      };
    } else if (sizeClass === "xLarge") {
      return {
        padding: "2rem 6rem",
      };
    } else if (sizeClass === "large") {
      return {
        padding: "2rem 3rem",
      };
    } else if (sizeClass === "medium") {
      return {
        padding: "1rem 2rem",
      };
    }
  };

  return (
    <form>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea
        className={`${sizeClass} ${className} ${styles.textarea}`}
        id={id}
        required={required}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        style={style}
      ></textarea>
    </form>
  );
};

export default TextArea;
