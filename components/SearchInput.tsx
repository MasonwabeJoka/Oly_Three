"use client";

import {
  FieldError,
  Input,
  Label,
  Text,
  SearchField,
  Button,
} from "react-aria-components";
import { Search, X } from "lucide-react";
import styles from "./SearchInput.module.scss";
import { useState } from "react";

interface SearchInputProps {
  className?: string;
  id?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  warningMessage?: string;
  placeholder?: string;
  type?: "text" | "email";
  value?: string;
  defaultValue?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  autoFocus?: boolean;
  enterOnMobile?:
    | "enter"
    | "done"
    | "go"
    | "next"
    | "previous"
    | "search"
    | "send";
  mobileKeyboard?: "none" | "text";
  isReadOnly?: boolean;
  autoCorrect?: "on" | "off";
  spellCheck?: "true" | "false";
  minLength?: number;
  maxLength?: number;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  inputSize: "large" | "medium" | "small" | "xLarge";
  inputVariant?: keyof typeof INPUT_VARIANT;
  dashboard?: boolean;
}

const INPUT_VARIANT = {
  primary: `${styles.primary}`,
  normal: `${styles.normal}`,
  success: `${styles.success}`,
  warning: `${styles.warning}`,
  danger: `${styles.danger}`,
};

const SearchInput = (props: SearchInputProps) => {
  const {
    label = "",
    type = "text",
    enterOnMobile = "enter",
    mobileKeyboard = "text",
    isReadOnly = false,
    autoCorrect = "off",
    spellCheck = "false",
    inputSize = "large",
    dashboard = false,
    inputVariant = "normal",
  } = props;
  const [searchValue, setSearchValue] = useState(props.value ?? "");
  const [hasValue, setHasValue] = useState(
    !!(props.value?.trim() || props.defaultValue?.trim()),
  );

  let sizeClass = "";
  switch (inputSize) {
    case "medium":
      sizeClass = !dashboard ? styles.mediumInput : styles.mediumDashboardInput;
      break;
    case "small":
      sizeClass = !dashboard ? styles.smallInput : styles.smallDashboardInput;
      break;
    case "xLarge":
      sizeClass = !dashboard ? styles.xLargeInput : styles.xLargeDashboardInput;
      break;
    default:
      sizeClass = !dashboard ? styles.largeInput : styles.largeDashboardInput;
  }

  const inputClass = `${styles.input} ${sizeClass} ${props.className || ""} ${INPUT_VARIANT[inputVariant] || ""}`;

  return (
    <SearchField
      className={styles.container}
      isRequired={props.isRequired}
      isDisabled={props.isDisabled}
      isInvalid={props.isInvalid || !!props.errorMessage}
    >
      <div className={styles.inputWrapper}>
        {props.isRequired && !hasValue && (
          <Label className={styles.label}>Required</Label>
        )}
        {hasValue && <Label className={styles.label}>{label}</Label>}
        {searchValue ? (
          <Button
            type="button"
            onClick={() => {
              setSearchValue("");
            }}
            aria-label="Clear search"
          >
            <X size={24} className={styles.inputIcon} />
          </Button>
        ) : (
          <Search size={24} className={styles.inputIcon} />
        )}
        <Input
          className={inputClass}
          type={type}
          placeholder={props.placeholder}
          value={searchValue}
          defaultValue={props.defaultValue}
          enterKeyHint={enterOnMobile}
          inputMode={mobileKeyboard}
          readOnly={isReadOnly}
          autoCorrect={autoCorrect}
          spellCheck={spellCheck === "true"}
          minLength={props.minLength}
          maxLength={props.maxLength}
          onChange={(e) => {
            const value = e.target.value;
            setSearchValue(e.target.value);
            setHasValue(value.trim().length > 0);
            props.onChange?.(e.target.value);
          }}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          aria-label={props.ariaLabel}
          aria-labelledby={props.ariaLabelledBy}
          aria-describedby={props.ariaDescribedBy}
        />
      </div>

      <div className={styles.messageContainer}>
        {(props.description || props.warningMessage) && (
          <Text slot="description">
            {props.description}

            {props.warningMessage && (
              <span className={styles.warning}>
                Warning: {props.warningMessage}
              </span>
            )}
          </Text>
        )}
        {props.errorMessage && props.isInvalid && (
          <FieldError className={styles.error}>{props.errorMessage}</FieldError>
        )}
      </div>
    </SearchField>
  );
};

export default SearchInput;
