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
import Image from "next/image";
import { formatNumberWithSpaces } from "@/utils/formatterFunctions/Formatter"; // Import your formatter

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

const INPUT_COLOUR_TYPE = {
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
  inputSize:
    | keyof typeof INPUT_SIZE.regular
    | keyof typeof INPUT_SIZE.feed
    | keyof typeof INPUT_SIZE.dashboard;
  inputColourType?: keyof typeof INPUT_COLOUR_TYPE;
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
      inputColourType = "normal",
      value,
      onChange,
      id,
      min,
      max,
      step,
      debounceTime = 300,
      className,
      placeholder,
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

    const [internalValue, setInternalValue] = useState<number | undefined>(value);
    const [displayValue, setDisplayValue] = useState<string>(
      value && value !== 0 ? formatNumberWithSpaces(value) : ""
    );

    // Sync internal value with prop changes
    useEffect(() => {
      setInternalValue(value);
      setDisplayValue(value && value !== 0 ? formatNumberWithSpaces(value) : "");
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
      onChange?.({ ...e, target: { ...e.target, value: numericValue.toString() } });
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
    };

    const sizeClass = isSidebarOpen
      ? INPUT_SIZE.feed[inputSize]
      : dashboard
      ? INPUT_SIZE.dashboard[inputSize]
      : INPUT_SIZE.regular[inputSize];

    const inputClass = `${styles.input} ${sizeClass} ${
      inputColourType ? INPUT_COLOUR_TYPE[inputColourType] : ""
    } ${className || ""}`;

    return (
      <div className={styles.container}>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.wrapper}>
          <input
            type="text" // Changed to text for formatting
            inputMode="numeric" // Numeric keypad on mobile
            name={reactHookFormProps?.name}
            value={displayValue} // Show formatted value with spaces
            onChange={handleInternalChange}
            id={id}
            placeholder={placeholder}
            className={inputClass}
            autoFocus={autoFocus}
            required={required}
            ref={ref}
            aria-label={placeholder || "Numeric input"} // Accessibility
            {...reactHookFormProps}
            {...restProps}
          />
          <div className={styles.arrows}>
            <div className={styles.upArrow}>
              <Image
                src="/icons/arrow-up.png"
                alt="Increment"
                width={24}
                height={24}
                onClick={() => handleArrowClick("up")}
              />
            </div>
            <div className={styles.downArrow}>
              <Image
                src="/icons/arrow-down.png"
                alt="Decrease"
                width={24}
                height={24}
                onClick={() => handleArrowClick("down")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;