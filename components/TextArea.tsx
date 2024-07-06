"use client";
import styles from "./TextArea.module.scss";
import { useState, useEffect, useRef } from "react";
import useFeedStore from "@/store/feedStore";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props extends React.HTMLAttributes<HTMLTextAreaElement> {
  className: string;
  placeholder?: string;
  value?: string;
  label: string;
  id: string;
  name: string;
  size: keyof typeof SIZE.regular | keyof typeof SIZE.feed;
  style?: any;
  required: boolean;
  reactHookFormProps?: UseFormRegisterReturn ;
  error?: string;
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
  reactHookFormProps,
  error,
  onChange,
  onClick,
  onFocus,
  onBlur,
  onSubmit,
}: Props): JSX.Element => {
  const isFeedOpen = useFeedStore((state) => state.isFeedOpen);
  const [centered, setCentered] = useState(true);

  let sizeClass = "";

  if (isFeedOpen) {
    sizeClass = SIZE.feed[size];
  } else {
    sizeClass = SIZE.regular[size];
  }

  const textareaStyles = () => {
    if (sizeClass === "xxLarge") {
      return {
        padding: "2rem 8rem",
      };
    } else if (sizeClass=== "xLarge") {
      return {
        padding: "2rem 6rem",
      };
    } else if (sizeClass=== "large") {
      return {
        padding: "2rem 3rem",
      };
    } else if (sizeClass=== "medium") {
      return {
        padding: "1rem 2rem",
      };
    }

  };

  const padding = textareaStyles();

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <p className={styles.errorMessage}>
              {error}
            </p>
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
        {...(reactHookFormProps ?? {})}
      ></textarea>
    </div>
  );
};

export default TextArea;
