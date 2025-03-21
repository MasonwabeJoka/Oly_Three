"use client";

import styles from "./TextAreaComponent.module.scss";
import React, { forwardRef, useState, useEffect, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Icon from "./Icon";
import Button from "./Buttons";

interface Props extends React.HTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  id: string;
  name: string;
  size?: "xxLarge" | "xLarge" | "large" | "medium";
  submitButtonText?: string;
  submitButtonIcon?: string | React.ReactNode;
  style?: React.CSSProperties;
  required?: boolean;
  reactHookFormProps?: UseFormRegisterReturn;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const TextAreaComponent = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      className = "",
      placeholder = "",
      value = "",
      label,
      id,
      name,
      size = "medium",
      submitButtonText = "Submit",
      submitButtonIcon,
      style,
      required = false,
      reactHookFormProps,
      error,
      onChange,
      onClick,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const [textareaHeight, setTextareaHeight] = useState("auto");
    const mirrorDivRef = useRef<HTMLDivElement>(null);
    const [localValue, setLocalValue] = useState(value);

    // Update height when content changes
    useEffect(() => {
      if (mirrorDivRef.current) {
        mirrorDivRef.current.style.height = "auto";
        const scrollHeight = mirrorDivRef.current.scrollHeight;
        setTextareaHeight(`${scrollHeight}px`);
      }
    }, [localValue]);

    // Handle controlled and uncontrolled component cases
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setLocalValue(event.target.value);
      onChange?.(event);
    };

    const getSizeClass = () => {
      return styles[size] || styles.medium;
    };
    return (
      <div className={styles.container}>
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.textareaWrapper}>
          <textarea
            className={`${styles.textarea} ${getSizeClass()} ${className}`}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value || localValue}
            required={required}
            onChange={handleChange}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            style={{
              ...style,
              height: textareaHeight,
            }}
            ref={ref}
            {...reactHookFormProps}
          />
          <div
            ref={mirrorDivRef}
            className={`${styles.mirrorDiv} ${getSizeClass()}`}
            aria-hidden="true"
          >
            {value || localValue}
          </div>
        </div>
        {(value || localValue) && (
          <div className={styles.buttons}>
            <div className={styles.submitButtonContainer}>
              <Button
                className={styles.submitButton}
                buttonChildren={submitButtonText}
                buttonType="normal"
                buttonSize="tiny"
                name="submit-btn"
                type="button"
                ariaLabel="Submit Button"
                autoFocus={false}
                disabled={false}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

TextAreaComponent.displayName = "TextAreaComponent";

export default TextAreaComponent;
