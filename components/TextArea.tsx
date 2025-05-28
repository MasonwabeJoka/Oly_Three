"use client";

import styles from "./TextArea.module.scss";
import React, { forwardRef, useState, useEffect, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Icon from "./Icon";
import Button from "./Buttons";
import Emojis from "./Emojis";
import useSidebarStore from "@/store/useSidebarStore";

interface Props extends React.HTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  size:
    | keyof typeof SIZE.regular
    | keyof typeof SIZE.feed
    | keyof typeof SIZE.dashboard;
  hasSubmitButton?: boolean;
  placeholder?: string;
  value?: string;
  label?: string;
  ariaLabel?: string;
  id: string;
  name: string;
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
  onSubmit?: (event: React.FormEvent<HTMLTextAreaElement>) => void;
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

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      hasSubmitButton = true,
      size = "large",
      placeholder = "",
      value = "",
      label,
      ariaLabel,
      id,
      name,
      dashboard,
      submitButtonText = "Send",
      required = false,
      reactHookFormProps,
      error,
      maxHeight,
      characterLimit,
      onChange,
      onClick,
      onFocus,
      onBlur,
      onSubmit,
    },
    ref
  ) => {
    const [textareaHeight, setTextareaHeight] = useState("auto");
    const [localValue, setLocalValue] = useState(value);
    const [isMaxHeight, setIsMaxHeight] = useState(false);
    const [charCountError, setCharCountError] = useState<string | null>(null);
    const mirrorDivRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
 

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

    const handleWrapperFocus = () => setIsFocused(true);

       let sizeClass = "";
    if (isSidebarOpen) {
      sizeClass = SIZE.feed[size];
    } else {
      sizeClass = dashboard
        ? SIZE.dashboard[size]
        : SIZE.regular[size];
    }

    const handleWrapperBlur = (event: React.FocusEvent<HTMLDivElement>) => {
      const relatedTarget = event.relatedTarget as HTMLElement | null;
      if (relatedTarget && event.currentTarget.contains(relatedTarget)) {
        return;
      }
      setIsFocused(false);
    };


    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    };

    const handleSubmit = () => {
      if (textareaRef.current && onSubmit) {
        const event = new Event("submit", { bubbles: true }) as any;
        Object.defineProperty(event, "target", { value: textareaRef.current });
        Object.defineProperty(event, "currentTarget", { value: textareaRef.current });
        onSubmit(event);
      }
    };

    const handleIconKeyDown = (
      event: React.KeyboardEvent<HTMLDivElement>,
      action: string
    ) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        console.log(`${action} icon activated`);
      }
    };

    return (
      <>
        {(error || charCountError) && (
          <p className={styles.errorMessage} id={`${id}-error`}>
            {error || charCountError}
          </p>
        )}
        <div className={`${styles.container} ${sizeClass}`}  >
          {label && (
            <label className={styles.label} htmlFor={id}>
              {label}
            </label>
          )}
          <div
            className={styles.textareaWrapper}
            onFocus={handleWrapperFocus}
            onBlur={handleWrapperBlur}
            style={{height: textareaHeight}}
          >
            <textarea
              className={`${styles.textarea} ${
                isMaxHeight ? styles.atMaxHeight : ""
              }`}
              id={id}
              name={name}
              placeholder={!isFocused ? placeholder : ""}
              value={value || localValue}
              aria-label={ariaLabel}
              required={required}
              onChange={handleChange}
              onClick={onClick}
              onFocus={onFocus}
              onBlur={onBlur}
              ref={(node) => {
                textareaRef.current = node;
                if (typeof ref === "function") {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }}
              style={{
                height: textareaHeight,
                maxHeight: maxHeight ? `${maxHeight}px` : "240px",
              }}
              aria-describedby={(error || charCountError) ? `${id}-error` : undefined}
              aria-label={placeholder || "Type a message"}
              {...reactHookFormProps}
            />

          
            <div
              ref={mirrorDivRef}
              className={`${styles.mirrorDiv}`}
              aria-hidden="true"
            >
              {value || localValue || " "}
            </div>

              {isEmojiPickerOpen && <Emojis onClickOutside={() => setIsEmojiPickerOpen(false)} />}
            
            {(value || localValue || isFocused) && (
              <div className={styles.buttons}>
              
                {hasSubmitButton && (
                  <div className={styles.submitButtonContainer}>
                    <Button
                      className={styles.submitButton}
                      buttonChildren={submitButtonText}
                      buttonType="normal"
                      buttonSize="tiny"
                      name="submit-btn"
                      type="button"
                      ariaLabel="Send message"
                      autoFocus={false}
                      disabled={false}
                      onClick={handleSubmit}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {characterLimit && (
          <div className={styles.charCount} id={`${id}-char-count`}>
            {localValue.length}/{characterLimit}
          </div>
        )}
      </>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;