"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import styles from "./NumberInput.module.scss";
import useSidebarStore from "@/store/useSidebarStore";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
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
  value: number | string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  min?: number| string;
  max?: number| string;
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

const NumberInput: React.FC<NumberInputProps> = ({
  inputSize,
  inputColourType = "normal",
  value,
  onChange,
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
}) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  const [internalValue, setInternalValue] = useState<string>(value?.toString());

  useEffect(() => {
    setInternalValue(value?.toString());
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const numericValue = parseFloat(internalValue);
      if (!isNaN(numericValue) && numericValue !== value) {
        onChange?.({
          target: {
            value: numericValue.toString(),
          },
        } as ChangeEvent<HTMLInputElement>);
      }
    }, debounceTime);
  
    return () => {
      clearTimeout(handler);
    };
  }, [internalValue, debounceTime, value, onChange]);
  

  const handleInternalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    
    // Call the external onChange handlers
    if (onChange) {
      onChange(e);
    }
    if (reactHookFormProps?.onChange) {
      reactHookFormProps.onChange(e);
    }
  };

  const handleArrowClick = (direction: "up" | "down") => {
    let newValue = parseFloat(internalValue) || 0;
    if (direction === "up") {
      newValue += step || 1;
    } else {
      newValue -= step || 1;
    }
    if (
      (min !== undefined && newValue < min) ||
      (max !== undefined && newValue > max)
    ) {
      return;
    }
  
    setInternalValue(newValue.toString());
  
    // Construct a synthetic event object
    const event = {
      target: {
        value: newValue.toString(),
      },
    } as ChangeEvent<HTMLInputElement>;
  
    // Call onChange with the synthetic event object
    onChange?.(event);
  };
  
 

  let sizeClass = "";
  sizeClass = isSidebarOpen
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
          value={internalValue}
          onChange={handleInternalChange}
          min={min}
          max={max}
          step={step}
          autoFocus={autoFocus}
          required={required}
          placeholder={placeholder}
          className={inputClass}
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
};

export default NumberInput;
