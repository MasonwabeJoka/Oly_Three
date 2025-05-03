"use client";

import styles from "./TextArea.module.scss";
import React, { forwardRef, useState, useEffect, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Icon from "./Icon";
import Button from "./Buttons";
import useSidebarStore from "@/store/useSidebarStore";

interface Props extends React.HTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  hasSubmitButton?: boolean;
  placeholder?: string;
  value?: string;
  label?: string;
  id: string;
  name: string;
  size?: keyof typeof SIZE.regular | keyof typeof SIZE.feed;
  dashboard?: boolean;
  submitButtonText?: string;
  submitButtonIcon?: string | React.ReactNode;
  style?: React.CSSProperties;
  required?: boolean;
  reactHookFormProps?: UseFormRegisterReturn;
  error?: string;
  maxWidth?: number;
  width?: number;
  height?: number;
  maxHeight?: number;
  characterLimit?: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
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
  dashboard: {
    xxLarge: `${styles.xxLargeDashboard}`,
    xLarge: `${styles.xLargeDashboard}`,
    large: `${styles.largeDashboard}`,
    medium: `${styles.mediumDashboard}`,
    "": "",
  },
};

const TextAreaComponent = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      className = "",
      hasSubmitButton = false,
      placeholder = "",
      value = "",
      label,
      id,
      name,
      size = "large",
      // variant = "regular", // Default to regular variant
      submitButtonText = "Submit",
      submitButtonIcon,
      style,
      required = false,
      reactHookFormProps,
      error,
      maxWidth,
      width,
      height = 240,
      maxHeight,
      characterLimit,
      onChange,
      onClick,
      onFocus,
      onBlur,
      dashboard,
    },
    ref
  ) => {
    const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
    const [textareaHeight, setTextareaHeight] = useState("auto");
    const [localValue, setLocalValue] = useState(value);
    const [isMaxHeight, setIsMaxHeight] = useState(false);
    const [charCountError, setCharCountError] = useState<string | null>(null);
    const mirrorDivRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      if (mirrorDivRef.current) {
        const scrollHeight = mirrorDivRef.current.scrollHeight;
        const maxHeightPx = maxHeight !== undefined ? maxHeight : 240;

        setTextareaHeight(`${Math.min(scrollHeight, maxHeightPx)}px`);
        setIsMaxHeight(scrollHeight > maxHeightPx);
      }
    }, [localValue, maxHeight]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;

      if (characterLimit && newValue.length > characterLimit) {
        setCharCountError(`Character limit of ${characterLimit} reached`);
        event.target.value = newValue.slice(0, characterLimit);
        setLocalValue(newValue.slice(0, characterLimit));
      } else {
        setCharCountError(null);
        setLocalValue(newValue);
      }

      onChange?.(event);
    };

    let sizeClass = "";
    if (isSidebarOpen) {
      sizeClass = SIZE.feed[size];
    } else {
      if (dashboard) {
        sizeClass = SIZE.dashboard[size];
      } else {
        sizeClass = SIZE.regular[size];
      }
    }

    const handleWrapperFocus = () => setIsFocused(true);

    const handleWrapperBlur = (event: React.FocusEvent<HTMLDivElement>) => {
      const relatedTarget = event.relatedTarget as HTMLElement | null;
      if (relatedTarget && event.currentTarget.contains(relatedTarget)) {
        // focus moved within the wrapper → keep it focused
        return;
      }
      setIsFocused(false);
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
            maxWidth: maxWidth ? `${maxWidth}px` : undefined,
            width: width ? `${width}px` : undefined,
          }}
        >
          {label && (
            <label className={styles.label} htmlFor={id}>
              {label}
            </label>
          )}

          <div
            className={styles.textareaWrapper}
            tabIndex={-1}
            onFocus={handleWrapperFocus}
            onBlur={handleWrapperBlur}
          >
            <textarea
              className={`${styles.textarea} ${sizeClass} ${className} ${
                isMaxHeight ? styles.atMaxHeight : ""
              }`}
              id={id}
              name={name}
              placeholder={!isFocused ? placeholder : ''}
              value={value || localValue}
              required={required}
              onChange={handleChange}
              onClick={onClick}
              onFocus={onFocus}
              onBlur={onBlur}
              ref={ref}
              {...reactHookFormProps}
              style={{
                ...style,
                height: height ? `${height}px` : textareaHeight,
                minHeight: "56px",
                maxHeight: maxHeight ? `${maxHeight}px` : "240px",
              }}
            />
            <div
              ref={mirrorDivRef}
              className={`${styles.mirrorDiv} ${sizeClass}`}
              aria-hidden="true"
            >
              {value || localValue || " "}
            </div>
          </div>
          {((value || localValue) || isFocused) && hasSubmitButton && (
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
