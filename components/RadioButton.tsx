"use client";
import { useId } from "react";
import styles from "./RadioButton.module.scss";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioButtonProps {
  name: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
  labelSide?: "left" | "right";
  disabled?: boolean;
  required?: boolean;
  error?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

const RadioButton = ({
  name,
  options,
  selectedValue,
  onChange,
  className = "",
  labelSide = "right",
  disabled,
  required,
  error,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}: RadioButtonProps) => {
  const groupId = useId();

  return (
    <div className={`${styles.radioGroup} ${className}`}>
      {error && (
        <p
          id={`${groupId}-error`}
          className={styles.errorMessage}
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
      
      <RadioGroup
        value={selectedValue}
        onValueChange={onChange}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel || `${name} options`}
        aria-describedby={ariaDescribedBy || (error ? `${groupId}-error` : undefined)}
        aria-invalid={!!error}
        className="gap-3"
      >
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          
          return (
            <div key={option.value} className={styles.radioOption}>
              <RadioGroupItem
                value={option.value}
                id={optionId}
                disabled={disabled}
                className="sr-only"
              />
              {labelSide === "left" && (
                <span className={styles.labelLeft}>
                  {option.label}
                  {required && <span aria-label="required"> *</span>}
                </span>
              )}
              <label htmlFor={optionId} className={styles.radioInput}>
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={selectedValue === option.value}
                  onChange={() => onChange(option.value)}
                  disabled={disabled}
                />
                <span></span>
              </label>
              {labelSide === "right" && (
                <span className={styles.labelRight}>
                  {option.label}
                  {required && <span aria-label="required"> *</span>}
                </span>
              )}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default RadioButton;
