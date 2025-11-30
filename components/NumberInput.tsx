"use client";
import React, {
  ChangeEvent,
  useState,
  useEffect,
  forwardRef,
  Ref,
} from "react";
import styles from "./NumberInput.module.scss";
import useSidebarStore from "@/store/useSidebarStore";
import { UseFormRegisterReturn } from "react-hook-form";
import Image from "@/components/Image";
import { formatNumberWithSpaces } from "@/utils/formatterFunctions/Formatter"; // Import your formatter
import Input from "@/components/Input";

const INPUT_SIZE = {
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

const INPUT_TYPE = {
  primary: `${styles.primary}`,
  normal: `${styles.normal}`,
  round: `${styles.round}`,
  outlined: `${styles.outlined}`,
  success: `${styles.success}`,
  warning: `${styles.warning}`,
  danger: `${styles.danger}`,
  info: `${styles.info}`,
  link: `${styles.linkBtn}`,
  "": "",
};

interface NumberInputProps {
  value: number;
  id: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  debounceTime?: number;
  className?: string;
  placeholder?: string;
  label?: string;
  inputSize:
    | keyof typeof INPUT_SIZE.regular
    | keyof typeof INPUT_SIZE.feed
    | keyof typeof INPUT_SIZE.dashboard;
  inputType: keyof typeof INPUT_TYPE;
  dashboard?: boolean;
  autoFocus?: boolean;
  required?: boolean; // Made optional to match usage
  reactHookFormProps?: UseFormRegisterReturn;
  error?: string;
  [key: string]: any;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      inputSize,
      inputType = "normal",
      value,
      onChange,
      id,
      min,
      max,
      step,
      debounceTime = 300,
      className,
      placeholder,
      label,
      dashboard,
      autoFocus = false,
      required = true,
      reactHookFormProps,
      error,
      ...restProps
    },
    ref
  ) => {
    const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

    const [internalValue, setInternalValue] = useState<number | undefined>(
      value
    );
    const [displayValue, setDisplayValue] = useState<string>(
      value && value !== 0 ? formatNumberWithSpaces(value) : ""
    );

    // Sync internal value with prop changes
    useEffect(() => {
      setInternalValue(value);
      setDisplayValue(
        value && value !== 0 ? formatNumberWithSpaces(value) : ""
      );
    }, [value]);

    // Debounce the change propagation to the parent
    useEffect(() => {
      const handler = setTimeout(() => {
        if (
          internalValue !== undefined &&
          !isNaN(internalValue) &&
          internalValue !== value
        ) {
          onChange?.({
            target: {
              value: internalValue.toString(), // Raw number as string
            },
          } as unknown as ChangeEvent<HTMLInputElement>);
        }
      }, debounceTime);

      return () => {
        clearTimeout(handler);
      };
    }, [internalValue, debounceTime, onChange, value]);

    // Handle typing with space formatting
    const handleInternalChange = (e: ChangeEvent<HTMLInputElement>) => {
      const rawInput = e.target.value.replace(/\s/g, ""); // Remove spaces for processing

      // Allow empty input
      if (rawInput === "") {
        setInternalValue(undefined);
        setDisplayValue("");
        onChange?.({ ...e, target: { ...e.target, value: "" } });
        return;
      }

      // Ensure only numeric input
      const numericValue = parseFloat(rawInput);
      if (isNaN(numericValue)) return; // Ignore non-numeric input

      // Enforce min/max constraints
      if (min !== undefined && numericValue < min) return;
      if (max !== undefined && numericValue > max) return;

      setInternalValue(numericValue);
      setDisplayValue(formatNumberWithSpaces(numericValue));
      onChange?.({
        ...e,
        target: { ...e.target, value: numericValue.toString() },
      });
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handleArrowClick("up");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleArrowClick("down");
      }
    };

    // Handle arrow clicks with formatting
    const handleArrowClick = (direction: "up" | "down") => {
      let newValue = internalValue ?? 0; // Default to 0 if undefined

      if (direction === "up") {
        newValue += step || 1;
      } else {
        newValue -= step || 1;
      }

      // Enforce min/max constraints
      if (min !== undefined && newValue < min) return;
      if (max !== undefined && newValue > max) return;

      setInternalValue(newValue);
      setDisplayValue(newValue ? formatNumberWithSpaces(newValue) : "");
      const event = {
        target: {
          value: newValue.toString(),
        },
      } as unknown as ChangeEvent<HTMLInputElement>;
      onChange?.(event);

      // Refocus input after button click
      if (ref && typeof ref === "object" && ref.current) {
        ref.current.focus();
      }
    };

    const sizeClass = isSidebarOpen
      ? INPUT_SIZE.feed[inputSize]
      : dashboard
        ? INPUT_SIZE.dashboard[inputSize]
        : INPUT_SIZE.regular[inputSize];

    const inputClass = `${styles.input} ${sizeClass} ${
      inputType ? INPUT_TYPE[inputType] : ""
    } ${className || ""}`;

    return (
      <div className={styles.container}>
        {error && (
          <p className={styles.errorMessage} id={`${id}-error`} role="alert">
            {error}
          </p>
        )}

        <div className={`${styles.wrapper}`}>
          <Input
            type="text"
            inputMode="numeric"
            role="spinbutton"
            name={reactHookFormProps?.name}
            label={label}
            value={displayValue}
            onChange={handleInternalChange}
            onKeyDown={handleKeyDown}
            id={id}
            placeholder={placeholder}
            className={inputClass}
            autoFocus={autoFocus}
            required={required}
            ref={ref}
            aria-label={placeholder || "Numeric input"}
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={!!error}
            aria-valuenow={internalValue}
            aria-valuemin={min}
            aria-valuemax={max}
            {...reactHookFormProps}
            {...restProps}
          />
          <div className={styles.arrows}>
            <button
              type="button"
              className={`${styles.upArrow} ${styles.arrow}`}
              onClick={() => handleArrowClick("up")}
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
                e.preventDefault()
              }
              aria-label="Increase value"
              tabIndex={-1}
            >
              <Image src="/icons/arrow-up.png" alt="" width={24} height={24} />
            </button>
            <button
              type="button"
              className={`${styles.downArrow} ${styles.arrow}`}
              onClick={() => handleArrowClick("down")}
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
                e.preventDefault()
              }
              aria-label="Decrease value"
              tabIndex={-1}
            >
              <Image
                src="/icons/arrow-down.png"
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
