"use client";

import styles from "./TextArea.module.scss";
import React, { forwardRef, useState, useEffect, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Icon from "./Icon";
import Button from "./Buttons";
import Emojis from "./Emojis";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";

interface Props extends React.HTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  size:"xxLarge" | "xLarge" | "large" | "medium";
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
  ariaDescribedBy?: string;
  ariaInvalid?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (event: React.FormEvent<HTMLTextAreaElement>) => void;
}



const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      className,
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
      ariaDescribedBy,
      ariaInvalid,
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
      if (event.key === "Escape") {
        setIsEmojiPickerOpen(false);
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

        let sizeClass = "";
    switch (size) {
      case "medium":
        sizeClass = !dashboard
          ? styles.mediumTextarea
          : styles.mediumDashboardTextarea;
        break;
      case "xLarge":
        sizeClass = !dashboard
          ? styles.xLargeTextarea
          : styles.xLargeDashboardTextarea;
        break;
      default:
        sizeClass = !dashboard
          ? styles.largeTextarea
          : styles.largeDashboardTextarea;
    }

    const textareaId = `textarea-${id}`;
    const errorId = (error || charCountError) ? `${id}-error` : undefined;
    const charCountId = characterLimit ? `${id}-char-count` : undefined;
    const ariaDescribedByIds = [errorId, charCountId, ariaDescribedBy].filter(Boolean).join(' ');
    const accessibleLabel = ariaLabel || label || placeholder || 'Text input';

    return (
      <>
        <div className={`${styles.container} ${className || ''}`}>
          {label && (
            <label className={styles.label} htmlFor={textareaId}>
              {label}
              {required && <span aria-label="required"> *</span>}
            </label>
          )}
          
          {(error || charCountError) && (
            <p id={errorId} className={styles.errorMessage} role="alert" aria-live="polite">
              {error || charCountError}
            </p>
          )}
          <div
            className={styles.textareaWrapper}
            onFocus={handleWrapperFocus}
            onBlur={handleWrapperBlur}
            style={{height: textareaHeight}}
          >
            <ShadcnTextarea
              id={textareaId}
              name={name}
              placeholder={placeholder}
              value={value || localValue}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              style={{ display: 'none' }}
              {...reactHookFormProps}
            />
            <textarea
              className={`${styles.textarea} ${sizeClass} ${
                isMaxHeight ? styles.atMaxHeight : ""
              }`}
              id={textareaId}
              name={name}
              placeholder={!isFocused ? placeholder : ""}
              value={value || localValue}
              aria-label={accessibleLabel}
              aria-describedby={ariaDescribedByIds || undefined}
              aria-invalid={ariaInvalid || !!(error || charCountError)}
              aria-required={required}
              required={required}
              onChange={handleChange}
              onClick={onClick}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={handleKeyDown}
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
              {...reactHookFormProps}
            />

          
            <div
              ref={mirrorDivRef}
              className={`${styles.mirrorDiv}`}
              aria-hidden="true"
            >
              {value || localValue || " "}
            </div>

              {isEmojiPickerOpen && (
                <div role="dialog" aria-label="Emoji picker">
                  <Emojis onClickOutside={() => setIsEmojiPickerOpen(false)} />
                </div>
              )}
            
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
          <div 
            id={charCountId} 
            className={styles.charCount}
            aria-live="polite"
            aria-label={`Character count: ${localValue.length} of ${characterLimit}`}
          >
            <span className="sr-only">Character count: </span>
            {localValue.length}/{characterLimit}
            {localValue.length >= characterLimit * 0.9 && (
              <span className="sr-only"> approaching limit</span>
            )}
          </div>
        )}
      </>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;