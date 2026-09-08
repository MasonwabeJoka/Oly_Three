"use client";

import {
  DateField,
  DateInput as AriaDateInput,
  DateSegment,
  Label,
  Text,
  FieldError,
} from "react-aria-components";

import {
  today,
  getLocalTimeZone,
  type DateValue,
} from "@internationalized/date";

import styles from "./DateInput.module.scss";
import { useState } from "react";

const INPUT_VARIANT = {
  primary: styles.primary,
  normal: styles.normal,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
};

type TimeScope = "day" | "hour" | "minute" | "second";

interface DateInputProps {
  className?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  warningMessage?: string;
  value?: DateValue;
  defaultValue?: DateValue;
  placeholderValue?: DateValue;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  onChange?: (value: DateValue) => void;
  timeScope?: TimeScope;
  is24Hour?: boolean;
  timeZone?: string;
  minValue?: DateValue;
  maxValue?: DateValue;
  inputSize: "large" | "medium" | "small" | "xLarge";
  inputVariant?: keyof typeof INPUT_VARIANT;
  dashboard?: boolean;
}

const DateInput = (props: DateInputProps) => {
  const {
    label,
    description,
    errorMessage,
    warningMessage,

    value,
    defaultValue,
    onChange,

    isRequired,
    isDisabled,
    isInvalid,

    timeScope = "day",
    is24Hour = true,
    timeZone,

    minValue,
    maxValue,

    inputSize = "large",
    dashboard = false,
    inputVariant = "normal",

    className,
  } = props;
  const [hasInteracted, setHasInteracted] = useState(!!(value || defaultValue));
  const [hasValue, setHasValue] = useState(!!(value || defaultValue));

  const placeholderValue = props.placeholderValue ?? today(getLocalTimeZone());

  // Map timeScope → React Aria granularity
  const granularity =
    timeScope === "day"
      ? "day"
      : timeScope === "hour"
        ? "hour"
        : timeScope === "minute"
          ? "minute"
          : "second";

  let sizeClass = "";

  switch (inputSize) {
    case "medium":
      sizeClass = dashboard ? styles.mediumDashboardInput : styles.mediumInput;
      break;
    case "small":
      sizeClass = dashboard ? styles.smallDashboardInput : styles.smallInput;
      break;
    case "xLarge":
      sizeClass = dashboard ? styles.xLargeDashboardInput : styles.xLargeInput;
      break;
    default:
      sizeClass = dashboard ? styles.largeDashboardInput : styles.largeInput;
  }

  const inputClass = [
    styles.input,
    sizeClass,
    INPUT_VARIANT[inputVariant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <DateField
      label={label}
      value={value}
      defaultValue={defaultValue}
      placeholderValue={placeholderValue}
      onChange={(value) => {
        setHasValue(!!value);
        onChange?.(value);
      }}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      granularity={granularity}
      hourCycle={is24Hour ? 24 : 12}
      timeZone={timeZone}
      minValue={minValue}
      maxValue={maxValue}
      hideTimeZone={true}
      className={styles.container}
    >
      <div className={styles.inputWrapper}>
        {isRequired && !hasInteracted && (
          <Label className={styles.label}>Required</Label>
        )}

        {hasInteracted && label && (
          <Label className={styles.label}>{label}</Label>
        )}

        <AriaDateInput
          className={`${inputClass} ${styles.dateInput}`}
          onFocus={() => setHasInteracted(true)}
        
        >
          {(segment) => (
            <DateSegment segment={segment} className={styles.dateSegment} />
          )}
        </AriaDateInput>
      </div>

      {(description || warningMessage || errorMessage) && (
        <div className={styles.messageContainer}>
          {description && <Text slot="description">{description}</Text>}

          {warningMessage && (
            <Text slot="description" className={styles.warning}>
              Warning: {warningMessage}
            </Text>
          )}

          {errorMessage && isInvalid && (
            <FieldError className={styles.error}>{errorMessage}</FieldError>
          )}
        </div>
      )}
    </DateField>
  );
};

export default DateInput;
