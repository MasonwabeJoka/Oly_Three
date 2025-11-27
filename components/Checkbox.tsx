"use client";
import { useEffect, useRef, useState, useId } from "react";
import styles from "./Checkbox.module.scss";
import useFeedStore from "@/store/feedStore";
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";

type CheckboxProps = {
  id?: string;
  className?: string;
  name?: string;
  label?: string;
  labelSide?: "left" | "right";
  isFeed?: boolean;
  indeterminate?: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  onChange?: (checked: boolean, suggestion?: string) => void;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean | "indeterminate";
  disabled?: boolean;
  type?: "checkbox" | "radio";
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
  "aria-invalid"?: boolean;
  required?: boolean;
  error?: string;
};

const Checkbox = ({
  id,
  className,
  name,
  label,
  labelSide = "right",
  indeterminate = false,
  hoverColour = "#ffff",
  checkedColour = "#14d6ff",
  checkedHovered = "#14d6ff",
  checked,
  disabled,
  onChange,
  onCheckedChange,
  type = "checkbox",
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  "aria-required": ariaRequired,
  "aria-invalid": ariaInvalid,
  required,
  error,
}: CheckboxProps): JSX.Element => {
  const [isChecked, setIsChecked] = useState(checked ?? false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFeedOpen = useFeedStore((state) => state.isFeedOpen);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  const handleToggle = (newChecked: boolean) => {
    if (checked === undefined) {
      setIsChecked(newChecked);
    }
    onChange?.(newChecked, undefined);
    onCheckedChange?.(newChecked);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (checked === undefined) {
      setIsChecked(newChecked);
    }
    onChange?.(newChecked, undefined);
    onCheckedChange?.(newChecked);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!disabled) {
        handleToggle(!isCheckboxChecked);
      }
    }
  };

  const isCheckboxChecked =
    checked === "indeterminate"
      ? false
      : checked !== undefined
        ? checked
        : isChecked;
  const generatedId = useId();
  const checkboxId = id || generatedId;
  const accessibleLabel = ariaLabel || label || `${type} input`;

  return (
    <div
      className={`${isFeedOpen ? styles.feedOpen : ""} ${
        styles.checkboxContainer
      } ${className || ""}`}
    >
      <ShadcnCheckbox
        id={checkboxId}
        name={name}
        className={`${styles.checkboxInput} ${className || ""}`}
        onCheckedChange={handleToggle}
        checked={
          checked === "indeterminate" ? "indeterminate" : isCheckboxChecked
        }
        disabled={disabled ?? false}
        aria-label={accessibleLabel}
        style={{ display: "none" }}
      />

      {error && (
        <p
          id={`${checkboxId}-error`}
          className={styles.errorMessage}
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}

      <div
        role={type}
        tabIndex={disabled ? -1 : 0}
        aria-checked={
          checked === "indeterminate"
            ? "mixed"
            : isCheckboxChecked
              ? "true"
              : "false"
        }
        aria-disabled={disabled}
        aria-required={ariaRequired || required}
        aria-invalid={ariaInvalid || !!error}
        aria-describedby={
          ariaDescribedBy || (error ? `${checkboxId}-error` : undefined)
        }
        aria-label={accessibleLabel}
        onClick={() => !disabled && handleToggle(!isCheckboxChecked)}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.875rem",
          cursor: disabled ? "not-allowed" : "pointer",
          outline: isFocused ? "1px solid #14d6ff" : "none",
          borderRadius: "8px",
        }}
      >
        {label && labelSide === "left" && (
          <span
            style={{
              fontSize: "0.875rem",
              marginLeft: "8px",
              color: disabled ? "#999" : "inherit",
            }}
          >
            {label}
            {(required || ariaRequired) && (
              <span aria-label="required"> *</span>
            )}
          </span>
        )}
        <div
          style={{
            width: "24px",
            height: "24px",
            border: "4px solid #fff",
            outline: "0.5px solid #9defff",
            borderRadius: "8px",
            backgroundColor: disabled
              ? "#f5f5f5"
              : isCheckboxChecked
                ? isHovered
                  ? checkedHovered
                  : checkedColour
                : isHovered
                  ? hoverColour
                  : "#edf2f7",
            boxShadow: isCheckboxChecked
              ? "none"
              : "-2px -2px 10px 0px #fff inset, 2px 2px 10px 0px rgba(170, 186, 204, 0.5) inset, 2px 2px 4px 0px rgba(120, 145, 171, 0.25) inset, -2px -2px 4px 0px rgba(255, 255, 255, 0.5) inset",
            opacity: disabled ? 0.6 : 1,
          }}
        />
        {label && labelSide === "right" && (
          <span
            style={{
              fontSize: "0.875rem",
              marginLeft: "8px",
              color: disabled ? "#999" : "inherit",
            }}
          >
            {label}
            {(required || ariaRequired) && (
              <span aria-label="required"> *</span>
            )}
          </span>
        )}
        <span className="sr-only">
          {disabled && "Disabled "}
          {type === "checkbox" ? "Checkbox" : "Radio button"}
          {isCheckboxChecked ? " checked" : " unchecked"}
          {checked === "indeterminate" && " partially selected"}
        </span>
      </div>
    </div>
  );
};

export default Checkbox;
