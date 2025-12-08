"use client";

import styles from "./TextArea.module.scss";
import React, { forwardRef, useState, useEffect, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Button from "./Buttons";
import Emojis from "./Emojis";

interface Props extends React.HTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  size: "xxLarge" | "xLarge" | "large" | "medium";
  hasSubmitButton?: boolean;
  placeholder?: string;
  value?: string;
  label?: string;
  ariaLabel?: string;
  id: string;
  name?: string;
  dashboard?: boolean;
  submitButtonText?: string;
  required?: boolean;
  reactHookFormProps?: UseFormRegisterReturn;
  error?: string;
  minHeight?: number;
  maxHeight?: number;
  characterLimit?: number;
  ariaDescribedBy?: string;
  ariaInvalid?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (e: any) => void;
  style?: React.CSSProperties;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      className = "",
      size = "large",
      hasSubmitButton = true,
      placeholder = "",
      value = "",
      label,
      ariaLabel,
      id,
      name,
      dashboard = false,
      submitButtonText = "Send",
      required = false,
      reactHookFormProps,
      error,
      minHeight = 120,
      maxHeight,
      characterLimit,
      ariaDescribedBy,
      ariaInvalid,
      onChange,
      onSubmit,
      style: parentStyle,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [localValue, setLocalValue] = useState(value || "");
    const [isFocused, setIsFocused] = useState(false);
    const [charCountError, setCharCountError] = useState<string | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const mirrorRef = useRef<HTMLDivElement>(null);
    const textareaWrapperRef = useRef<HTMLDivElement>(null);

    // Sync controlled value
    useEffect(() => {
      if (value !== undefined) setLocalValue(value);
    }, [value]);

    // Auto-grow logic — using CSS + resize observer (cleanest)
    useEffect(() => {
      const textarea = textareaRef.current;
      const mirror = mirrorRef.current;
      if (!textarea || !mirror) return;
      const updateHeight = () => {
        if (!mirrorRef.current || !textareaRef.current) return;

        mirrorRef.current.textContent =
          (localValue || placeholder || " ") + "\n";

        const height = mirrorRef.current.scrollHeight;
        const max = maxHeight ?? 240;
        const finalHeight = Math.min(height, max);

        const textarea = textareaRef.current;

        // Apply height
        textarea.style.height = `${finalHeight}px`;

        // Toggle .atMaxHeight directly on the textarea
        if (height > max) {
          textarea.classList.add(styles.atMaxHeight);
        } else {
          textarea.classList.remove(styles.atMaxHeight);
        }
      };

      updateHeight();

      // Observe changes
      const observer = new ResizeObserver(updateHeight);
      observer.observe(mirror);

      return () => observer.disconnect();
    }, [localValue, placeholder, maxHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let newValue = e.target.value;

      if (characterLimit && newValue.length > characterLimit) {
        newValue = newValue.slice(0, characterLimit);
        e.target.value = newValue;
        setCharCountError(`Character limit of ${characterLimit} reached`);
      } else {
        setCharCountError(null);
      }

      setLocalValue(newValue);
      onChange?.(e);
      reactHookFormProps?.onChange?.(e);
    };

    const handleSubmit = () => {
      if (onSubmit && localValue.trim()) {
        const fakeEvent = { target: textareaRef.current } as any;
        onSubmit(fakeEvent);
      }
    };

    // Size class logic
    const sizeClass = dashboard
      ? size === "medium"
        ? styles.mediumDashboardTextarea
        : styles.largeDashboardTextarea
      : size === "medium"
        ? styles.mediumTextarea
        : size === "xLarge"
          ? styles.xLargeTextarea
          : styles.largeTextarea;

    const textareaId = `textarea-${id}`;
    const errorId = error || charCountError ? `${id}-error` : undefined;
    const charCountId = characterLimit ? `${id}-char-count` : undefined;
    const describedBy = [errorId, charCountId, ariaDescribedBy]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.container}>
        {(error || charCountError) && (
          <p
            id={errorId}
            className={styles.errorMessage}
            role="alert"
            aria-live="polite"
          >
            {error || charCountError}
          </p>
        )}
        <div className={`${styles.wrapper} ${className}`}>
          <div className={styles.textareaWrapper} ref={textareaWrapperRef}>
            {label && isFocused && (
              <label className={styles.label} htmlFor={id}>
                {label.length > 36 ? `${label.substring(0, 36)}...` : label}
              </label>
            )}
            <textarea
              {...reactHookFormProps}
              ref={(node) => {
                textareaRef.current = node;
                if (reactHookFormProps?.ref) {
                  if (typeof reactHookFormProps.ref === "function")
                    reactHookFormProps.ref(node);
                  else if (reactHookFormProps.ref)
                    (reactHookFormProps.ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
                }
                if (typeof ref === "function") ref(node);
                else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
              }}
              id={textareaId}
              name={name || reactHookFormProps?.name}
              value={localValue}
              placeholder={!isFocused ? placeholder : ""}
              aria-label={ariaLabel || label || placeholder || "Text input"}
              aria-describedby={describedBy || undefined}
              aria-invalid={!!(error || charCountError || ariaInvalid)}
              aria-required={required}
              required={required}
              onChange={handleChange}
              onFocus={(e) => {
                setIsFocused(true);
                onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                onBlur?.(e);
              }}
              className={`${styles.textarea} ${sizeClass}`}
              style={{
                ...parentStyle,
                minHeight: `${minHeight}px`,
                ...(maxHeight !== undefined && { maxHeight: `${maxHeight}px` }),
              }}
            />

            {/* Invisible mirror for perfect height measurement */}
            <div
              ref={mirrorRef}
              className={styles.mirrorDiv}
              aria-hidden="true"
            >
              {localValue || placeholder || " "}
            </div>
          </div>
          {/* Submit button */}
          {(localValue || isFocused) && hasSubmitButton && (
            <div className={styles.buttons}>
              <div className={styles.submitButtonContainer}>
                <Button
                  className={styles.submitButton}
                  buttonChildren={submitButtonText}
                  buttonType="normal"
                  buttonSize="tiny"
                  name="submit-btn"
                  type="button"
                  onClick={handleSubmit}
                  ariaLabel="Send message"
                  autoFocus={false}
                  disabled={false}
                />
              </div>
            </div>
          )}
        </div>

        {/* Character counter */}
        {characterLimit && localValue.length > characterLimit * 0.8 && (
          <div
            id={charCountId}
            className={styles.charCountContainer}
            aria-live="polite"
          >
            <span className={styles.charCount}>
              {localValue.length} / {characterLimit}{" "}
            </span>
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
export default TextArea;
