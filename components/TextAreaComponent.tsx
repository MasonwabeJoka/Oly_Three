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
  maxWidth?: string | number;
  minHeight?: string | number;
  width?: string | number;
  height?: string | number;
  maxHeight?: string | number;
  characterLimit?: number;
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
      maxWidth,
      minHeight,
      width,
      height,
      maxHeight,
      characterLimit,
      onChange,
      onClick,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const [textareaHeight, setTextareaHeight] = useState("auto");
    const [localValue, setLocalValue] = useState(value);
    const [isMaxHeight, setIsMaxHeight] = useState(false);
    const [charCountError, setCharCountError] = useState<string | null>(null);
    const mirrorDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (mirrorDivRef.current) {
        const scrollHeight = mirrorDivRef.current.scrollHeight;
        const maxHeightPx =
          maxHeight !== undefined
            ? typeof maxHeight === "number"
              ? maxHeight
              : parseFloat(maxHeight) || 240
            : 240;

        setTextareaHeight(`${Math.min(scrollHeight, maxHeightPx)}px`);
        setIsMaxHeight(scrollHeight > maxHeightPx);
      }
    }, [localValue, maxHeight]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;

      if (characterLimit && newValue.length > characterLimit) {
        setCharCountError(`Character limit of ${characterLimit} reached`);
        // Prevent adding more characters
        event.target.value = newValue.slice(0, characterLimit);
        setLocalValue(newValue.slice(0, characterLimit));
      } else {
        setCharCountError(null);
        setLocalValue(newValue);
      }

      onChange?.(event);
    };

    const getSizeClass = () => {
      return styles[size] || styles.medium;
    };

    return (
      <>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {charCountError && (
          <p className={styles.errorMessage}>{charCountError}</p>
        )}
        <div
          className={styles.container}
          style={{
            maxWidth: maxWidth
              ? typeof maxWidth === "number"
                ? `${maxWidth}px`
                : maxWidth
              : undefined,
            width: width
              ? typeof width === "number"
                ? `${width}px`
                : width
              : undefined,
          }}
        >
          {label && (
            <label className={styles.label} htmlFor={id}>
              {label}
            </label>
          )}

          <div className={styles.textareaWrapper}>
            <textarea
              className={`${styles.textarea} ${width ? "" : getSizeClass()} ${className} ${
                isMaxHeight ? styles.atMaxHeight : ""
              }`}
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
                height: height
                  ? typeof height === "number"
                    ? `${height}px`
                    : height
                  : textareaHeight,
                minHeight: minHeight
                  ? typeof minHeight === "number"
                    ? `${minHeight}px`
                    : minHeight
                  : "56px",
                maxHeight: maxHeight
                  ? typeof maxHeight === "number"
                    ? `${maxHeight}px`
                    : maxHeight
                  : "240px",
              }}
              ref={ref}
              {...reactHookFormProps}
            />
            <div
              ref={mirrorDivRef}
              className={`${styles.mirrorDiv} ${width ? "" : getSizeClass()}`}
              aria-hidden="true"
            >
              {value || localValue || " "}
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
        {characterLimit && (
          <div className={styles.charCount}>
            {localValue.length}/{characterLimit}
          </div>
        )}
      </>
    );
  }
);

TextAreaComponent.displayName = "TextAreaComponent";

export default TextAreaComponent;
