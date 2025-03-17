"use client";

import styles from "./TextArea.module.scss";
import React, { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props extends React.HTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  placeholder?: string;
  value?: string;
  label: string;
  id: string;
  name: string;
  size: keyof typeof SIZE.regular | keyof typeof SIZE.feed;
  style?: React.CSSProperties; // Use React.CSSProperties for style prop
  required: boolean;
  reactHookFormProps?: UseFormRegisterReturn;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
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

const TextArea = forwardRef<HTMLTextAreaElement, Props>(({
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
}, ref): JSX.Element => {
  const sizeClass = SIZE.regular[size] || "";

  const textareaStyles = () => {
    switch (sizeClass) {
      case styles.xxLarge:
        return { padding: "2rem 8rem" };
      case styles.xLarge:
        return { padding: "2rem 6rem" };
      case styles.large:
        return { padding: "2rem 3rem" };
      case styles.medium:
        return { padding: "1rem 2rem" };
      default:
        return {};
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
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        style={{ ...style, ...padding }}
        ref={ref} // Forwarded ref
        {...reactHookFormProps} // Spread React Hook Form props
      />
    </div>
  );
});

TextArea.displayName = "TextArea"; // Set displayName for debugging purposes

export default TextArea;
