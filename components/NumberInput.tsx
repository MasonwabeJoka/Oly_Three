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
  required: boolean;
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

    const [internalValue, setInternalValue] = useState<number | undefined>(
      value
    );

    // Keep internal value in sync with the value prop
    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    // Debounce the change propagation to the parent component
    useEffect(() => {
      const handler = setTimeout(() => {
        if (
          internalValue !== undefined &&
          !isNaN(internalValue) &&
          internalValue !== value
        ) {
          // Make sure to propagate a number
          onChange?.({
            target: {
              value: internalValue, // Passing the numeric value
            },
          } as unknown as ChangeEvent<HTMLInputElement>);
        }
      }, debounceTime);

      return () => {
        clearTimeout(handler);
      };
    }, [internalValue, debounceTime, onChange, value]);

    // Handle internal changes, ensure numeric values are processed
    const handleInternalChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      // Allow empty input
      if (value === "") {
        setInternalValue(undefined);
        onChange?.(e);
        return;
      }
      // Parse to a float
      const numericValue = parseFloat(value);

      if (!isNaN(numericValue)) {
        setInternalValue(numericValue);
        onChange?.(e);
      }
    };

    const handleArrowClick = (direction: "up" | "down") => {
      let newValue = internalValue || 0;
      
      if (direction === "up") {
        newValue += step || 1;
      } else {
        newValue -= step || 1;
      }

      // Handle min/max constraints
      if (
        (min !== undefined && newValue < min) ||
        (max !== undefined && newValue > max)
      ) {
        return;
      }

      setInternalValue(newValue);
      // Propagate the number change
      const event = {
        target: {
          value: newValue,
        },
      } as unknown as ChangeEvent<HTMLInputElement>;

      onChange?.(event);
    };

    const sizeClass = isSidebarOpen
      ? INPUT_SIZE.feed[inputSize]
      : dashboard
        ? INPUT_SIZE.dashboard[inputSize]
        : INPUT_SIZE.regular[inputSize];

    const inputClass = `${styles.input} ${sizeClass} ${inputColourType ? INPUT_COLOUR_TYPE[inputColourType] : ""} ${className}`;

    return (
      <div className={styles.container}>
        {error && <p className={styles.errorMessage}>{error as string}</p>}

        <div className={styles.wrapper}>
          <input
            type="number"
            name={reactHookFormProps?.name}
            value={internalValue !== undefined ? internalValue : ""}
            onChange={handleInternalChange}
            id={id}
            min={min}
            max={max}
            step={step}
            autoFocus={autoFocus}
            required={required}
            placeholder={placeholder}
            className={inputClass}
            ref={ref}
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
