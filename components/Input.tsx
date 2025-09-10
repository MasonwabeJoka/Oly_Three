"use client";
import styles from "./Input.module.scss";
import Image from "next/image";
import { useState, forwardRef, Ref, useEffect, useRef } from "react";
import useSidebarStore from "@/store/useSidebarStore";
import Button from "./Buttons";
import Checkbox from "./Checkbox";

interface InputProps extends React.HTMLAttributes<HTMLDivElement> {
  isSearchBar?: boolean;
  isMultiSelect?: boolean;
  suggestions?: string[];
  className?: string;
  inputType: keyof typeof INPUT_TYPE;
  accept?: string;
  error?: string;
  inputSize: "xLarge" | "large" | "medium";
  inputColourType?: keyof typeof INPUT_COLOUR_TYPE;
  iconPosition?: "left" | "right" | "leftRight";
  iconSrcLeft?: string;
  iconSrcRight?: string;
  label: string;
  placeholder?: string;
  id: string;
  name: string;
  ariaLabel: string;
  autoFocus?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  autoComplete?: "on" | "off";
  readonly?: boolean;
  required?: boolean;
  inputDescription?: string;
  form?: string;
  initialValue?: string;
  value?: string;
  dashboard?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onSuggestionCountChange?: (count: number) => void;
  selectedItems?: string[];
  onSelectedItemsChange?: (selectedItems: string[]) => void;
  onDropdownOpenChange?: (isOpen: boolean) => void;
}

const INPUT_TYPE = {
  button: `${styles.button}`,
  checkbox: `${styles.checkbox}`,
  color: `${styles.color}`,
  date: `${styles.date}`,
  datetimeLocal: `${styles.datetimeLocal}`,
  email: `${styles.email}`,
  file: `${styles.file}`,
  hidden: `${styles.hidden}`,
  image: `${styles.image}`,
  month: `${styles.month}`,
  number: `${styles.number}`,
  password: `${styles.password}`,
  radio: `${styles.radio}`,
  range: `${styles.range}`,
  reset: `${styles.reset}`,
  search: `${styles.search}`,
  submit: `${styles.submit}`,
  tel: `${styles.tel}`,
  text: `${styles.text}`,
  time: `${styles.time}`,
  url: `${styles.url}`,
  week: `${styles.week}`,
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

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      isSearchBar,
      isMultiSelect,
      suggestions,
      className,
      inputType,
      accept,
      error,
      inputSize,
      inputColourType = "normal",
      iconPosition,
      iconSrcLeft,
      iconSrcRight,
      label,
      placeholder,
      id,
      name,
      ariaLabel,
      autoFocus,
      iconWidth,
      iconHeight,
      autoComplete = "off",
      readonly,
      required = false,
      inputDescription,
      form,
      initialValue = "",
      value = "",
      dashboard,
      onChange,
      onKeyUp,
      onFocus,
      onBlur,
      onSuggestionCountChange,
      selectedItems = [],
      onSelectedItemsChange,
      onDropdownOpenChange,
      ...otherProps
    },
    ref
  ) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filterValue, setFilterValue] = useState("");
    const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
    const [revealedSuggestions, setRevealedSuggestions] = useState<string[]>(
      []
    );
    const inputRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [internalValue, setInternalValue] = useState(value);

    let sizeClass = "";
    switch (inputSize) {
      case "medium":
        sizeClass = !dashboard
          ? styles.mediumInput
          : styles.mediumDashboardInput;
        break;
      case "xLarge":
        sizeClass = !dashboard
          ? styles.xLargeInput
          : styles.xLargeDashboardInput;
        break;
      default:
        sizeClass = !dashboard ? styles.largeInput : styles.largeDashboardInput;
    }

    useEffect(() => {
      if (isSearchBar && !isMultiSelect) {
        const isVisible = revealedSuggestions.length > 0;
        onDropdownOpenChange?.(isVisible);
      }
    }, [
      revealedSuggestions.length,
      isSearchBar,
      isMultiSelect,
      onDropdownOpenChange,
    ]);

    // Sync internalValue with value prop
    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    // Sync filterValue with value for multi-select
    useEffect(() => {
      if (isMultiSelect && value) {
        setFilterValue(value);
      }
    }, [value, isMultiSelect]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (
          !inputRef.current?.contains(event.target as Node) &&
          !dropdownRef.current?.contains(event.target as Node)
        ) {
          setIsDropdownOpen(false);
          setRevealedSuggestions([]);
          if (isMultiSelect) {
            setFilterValue("");
          }
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }, [isMultiSelect]);

    useEffect(() => {
      const useEscKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener("keydown", useEscKey);
      return () => {
        document.removeEventListener("keydown", useEscKey);
      };
    }, []);

    useEffect(() => {
      if (isMultiSelect) {
        setRevealedSuggestions(suggestions || []);
      } else {
        onSuggestionCountChange?.(revealedSuggestions.length);
      }
    }, [
      suggestions,
      isMultiSelect,
      onSuggestionCountChange,
      revealedSuggestions.length,
    ]);

    const applyFilter = (filter: string) => {
      if (filter.trim() === "") {
        setRevealedSuggestions(suggestions || []);
      } else {
        const filtered =
          suggestions?.filter((suggestion) =>
            suggestion.toLowerCase().startsWith(filter.toLowerCase())
          ) || [];
        setRevealedSuggestions(filtered);
      }
    };

    const handleInternalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const typedValue = e.target.value;
      setInternalValue(typedValue);
      if (onChange) onChange(e);

      if (isMultiSelect && !isDropdownOpen) {
        setIsDropdownOpen(true);
      }

      if (isSearchBar || isMultiSelect) {
        applyFilter(typedValue);
      }
    };

    const handleSuggestionClick = (suggestion: string) => {
      setInternalValue(suggestion);
      if (onChange) {
        const syntheticEvent = {
          target: { value: suggestion },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
      setIsDropdownOpen(false);
      setRevealedSuggestions([]);
    };

    const handleMultiSelectChange = (suggestion: string, checked: boolean) => {
      let updatedItems: string[];
      if (checked) {
        updatedItems = [...selectedItems, suggestion];
      } else {
        updatedItems = selectedItems.filter((item) => item !== suggestion);
      }
      onSelectedItemsChange?.(updatedItems);
      applyFilter(filterValue);
    };

    const handleSelectAll = (checked: boolean) => {
      let updatedItems: string[];
      if (checked) {
        const itemsToAdd = revealedSuggestions.filter(
          (suggestion) => !selectedItems.includes(suggestion)
        );
        updatedItems = [...selectedItems, ...itemsToAdd];
      } else {
        updatedItems = selectedItems.filter(
          (item) => !revealedSuggestions.includes(item)
        );
      }
      onSelectedItemsChange?.(updatedItems);
      applyFilter(filterValue);
    };

    const clearInputAndSuggestions = () => {
      setInternalValue("");
      if (onChange) {
        const syntheticEvent = {
          target: { value: "" },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
      setRevealedSuggestions([]); // Close suggestions immediately
      if (typeof onSelectedItemsChange === "function") {
        onSelectedItemsChange([]);
      }
      setIsDropdownOpen(false);
    };

    const inputClass = `${styles.input} ${sizeClass} ${
      INPUT_TYPE[inputType] || ""
    } ${INPUT_COLOUR_TYPE[inputColourType] || ""} ${className || ""}`;

    return (
      <div className={`${styles.container} ${className || ""}`} ref={inputRef}>
        {label &&
          (internalValue || selectedItems.length > 0) &&
          internalValue.length < 30 && (
            <label className={styles.label} htmlFor={id}>
              {label.length > 12 ? label.substring(0, 12) : label}
            </label>
          )}
        <div className={styles.inputContainer}>
          {error && (
            <p id={`${id}-error`} className={styles.errorMessage}>
              {error}
            </p>
          )}
          {iconPosition === "left" &&
            iconSrcLeft &&
            (value || selectedItems.length > 0) && (
              <Image
                src={iconSrcLeft}
                alt={`${ariaLabel} Icon Left`}
                width={iconWidth}
                height={iconHeight}
              />
            )}
          <input
            className={inputClass}
            aria-invalid={error ? "true" : "false"}
            aria-errormessage={error ? `${id}-error` : undefined}
            {...otherProps}
            type={inputType}
            placeholder={placeholder}
            id={id}
            name={name}
            accept={accept}
            value={internalValue}
            onChange={handleInternalChange}
            onKeyUp={onKeyUp}
            onFocus={(e) => {
              if (isMultiSelect) setIsDropdownOpen(true);
              if (onFocus) onFocus(e);
            }}
            onBlur={onBlur}
            ref={ref}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            readOnly={readonly}
            required
            form={form}
          />
          {iconPosition && (
            <>
              {iconPosition === "right" ||
              (iconPosition === "leftRight" &&
                (internalValue || selectedItems.length > 0)) ? (
                <div
                  className={styles.rightIconContainer}
                  onClick={clearInputAndSuggestions}
                >
                  {iconSrcRight ? (
                    <Image
                      className={styles.rightIcon}
                      src={
                        internalValue || selectedItems.length > 0
                          ? "/icons/X.png"
                          : iconSrcRight || "/icons/search.png"
                      }
                      alt={`${ariaLabel} Icon`}
                      width={iconWidth}
                      height={iconHeight}
                    />
                  ) : internalValue || selectedItems.length > 0 ? (
                    <Image
                      className={styles.rightIcon}
                      src={"/icons/X.png"}
                      alt={`${ariaLabel} Icon`}
                      width={iconWidth}
                      height={iconHeight}
                    />
                  ) : iconPosition === "right" && isSearchBar ? (
                    <Image
                      className={styles.rightIcon}
                      src={"/icons/search.png"}
                      alt={`${ariaLabel} Icon`}
                      width={iconWidth}
                      height={iconHeight}
                    />
                  ) : (
                    ""
                  )}
                  {isMultiSelect && selectedItems.length > 0 && (
                    <span className={styles.selectedCount}>
                      {selectedItems.length}
                    </span>
                  )}
                </div>
              ) : (
                <div className={styles.rightIconContainer}></div>
              )}
            </>
          )}
        </div>
        {selectedItems.length > 0 && (
          <div className={styles.selectedTags}>
            {selectedItems.map((item) => (
              <span key={item} className={styles.tag}>
                {item}
                <button
                  onClick={() => handleMultiSelectChange(item, false)}
                  aria-label={`Remove ${item}`}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        )}
        {inputDescription && (
          <p id={`${id}-description`} className={styles.description}>
            {inputDescription}
          </p>
        )}
        {!isMultiSelect && isSearchBar && revealedSuggestions.length > 0 && (
          <ul role="listbox" className={styles.searchSuggestions}>
            {revealedSuggestions.map((suggestion, index) => (
              <li
                key={index}
                role="option"
                aria-selected={value === suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSuggestionClick(suggestion);
                }}
                tabIndex={0}
                className={`${styles.suggestionContainer} ${sizeClass}`}
                style={{ marginBottom: "0.5rem" }}
              >
                <div className={styles.suggestion}>
                  <span>{suggestion}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        {isMultiSelect && isDropdownOpen && (
          <div className={styles.multiSelectDropdown} ref={dropdownRef}>
            <ul className={styles.searchSuggestions}>
              <li
                className={
                  !dashboard
                    ? styles.suggestionContainer
                    : styles.suggestionContainerDashboard
                }
                style={{ marginBottom: "0.5rem" }}
              >
                <div
                  className={`${styles.suggestion} ${styles.selectAll}`}
                  onClick={() =>
                    handleSelectAll(
                      !revealedSuggestions.every((suggestion) =>
                        selectedItems.includes(suggestion)
                      )
                    )
                  }
                >
                  <Checkbox
                    id="selectAllCheckbox"
                    type="checkbox"
                    checked={revealedSuggestions.every((suggestion) =>
                      selectedItems.includes(suggestion)
                    )}
                    onChange={(checked) => handleSelectAll(checked)}
                  />
                  <span>Select All</span>
                </div>
              </li>
              {revealedSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className={
                    !dashboard
                      ? styles.suggestionContainer
                      : styles.suggestionContainerDashboard
                  }
                  style={{ marginBottom: "0.5rem", cursor: "pointer" }}
                >
                  <div
                    className={styles.suggestion}
                    onClick={() =>
                      handleMultiSelectChange(
                        suggestion,
                        !selectedItems.includes(suggestion)
                      )
                    }
                  >
                    <Checkbox
                      id={`checkbox-${index}`}
                      type="checkbox"
                      checked={selectedItems.includes(suggestion)}
                      onChange={(checked) =>
                        handleMultiSelectChange(suggestion, checked)
                      }
                    />
                    <span>{suggestion}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
