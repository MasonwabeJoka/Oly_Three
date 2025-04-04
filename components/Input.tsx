"use client";
import styles from "./Input.module.scss";
import Image from "next/image";
import { useState, forwardRef, Ref, useEffect, useRef } from "react";
import useSidebarStore from "@/store/useSidebarStore";
import { UseFormRegisterReturn } from "react-hook-form";
import Button from "./Buttons";
import Checkbox from "./Checkbox";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

interface InputProps extends React.HTMLAttributes<HTMLDivElement> {
  isSearchBar?: boolean;
  isMultiSelect?: boolean;
  suggestions?: string[];
  className?: string;
  inputType: keyof typeof INPUT_TYPE;
  accept?: string;
  reactHookFormProps?: UseFormRegisterReturn;
  error?: string;
  inputSize:
    | keyof typeof INPUT_SIZE.regular
    | keyof typeof INPUT_SIZE.feed
    | keyof typeof INPUT_SIZE.dashboard;
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
  required: boolean;
  inputDescription?: string;
  form?: string;
  initialValue?: any;
  setterValue?: any;
  value?: string;
  dashboard?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onSuggestionsChange?: (count: number) => void;
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

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      isSearchBar,
      isMultiSelect,
      suggestions,
      className,
      inputType,
      accept,
      reactHookFormProps,
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
      required,
      inputDescription,
      form,
      initialValue = "",
      onChange,
      onKeyUp,
      onFocus,
      onBlur,
      children,
      dashboard,
      onSuggestionsChange,
      ...otherProps
    },
    ref
  ) => {
    const [value, setValue] = useState(initialValue);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [filterValue, setFilterValue] = useState(""); // State to store the filter value
    const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
    const [revealedSuggestions, setRevealedSuggestions] = useState<string[]>(
      []
    );
    const inputRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        // Initialize revealed suggestions with all suggestions
        setRevealedSuggestions(suggestions || []);
      } else {
        console.log("revealedSuggestions length:", revealedSuggestions.length);
        onSuggestionsChange?.(revealedSuggestions.length);
      }
    }, [
      suggestions,
      isMultiSelect,
      onSuggestionsChange,
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
        console.log("Filtered Suggestions:", filtered);
        setRevealedSuggestions(filtered);
      }
    };

    const handleInternalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const typedValue = e.target.value;
      setValue(typedValue);
      setFilterValue(typedValue); // Update the filter value
      if (onChange) onChange(e);

      // Ensure the dropdown is open while typing
      if (isMultiSelect && !isDropdownOpen) {
        setIsDropdownOpen(true);
      }

      if (isSearchBar) {
        if (typedValue.trim() === "") {
          setRevealedSuggestions([]);
        } else {
          const filtered =
            suggestions?.filter((suggestion) =>
              suggestion.toLowerCase().startsWith(typedValue.toLowerCase())
            ) || [];
          console.log("SearchBar Filtered Suggestions:", filtered);
          setRevealedSuggestions(filtered);
        }
      } else if (isMultiSelect) {
        applyFilter(typedValue);
      }
    };

    const handleSuggestionClick = (suggestion: string) => {
      setValue(suggestion);
      setFilterValue(""); // Clear filter on single selection
      setRevealedSuggestions([]);
      setIsDropdownOpen(false);
      if (onChange) {
        const syntheticEvent = {
          target: { value: suggestion },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    const handleMultiSelectChange = (suggestion: string, checked: boolean) => {
      let updatedItems: string[];
      if (checked) {
        updatedItems = [...selectedItems, suggestion];
      } else {
        updatedItems = selectedItems.filter((item) => item !== suggestion);
      }
      setSelectedItems(updatedItems);
      // Replace the typed text with the selected items by clearing the input value
      setValue("");
      // Preserve the filter to maintain the filtered suggestions
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
      setSelectedItems(updatedItems);
      setValue("");
      applyFilter(filterValue);
    };

    const handleSelectButtonClick = () => {
      setIsDropdownOpen(false); // Close the dropdown when the Select button is clicked
    };

    const clearInputAndSuggestions = () => {
      setValue("");
      setFilterValue(""); // Clear the filter value
      setRevealedSuggestions(suggestions || []);
      setSelectedItems([]);
      setIsDropdownOpen(false);
    };

    let sizeClass = "";
    if (isSidebarOpen) {
      sizeClass = INPUT_SIZE.feed[inputSize];
    } else {
      if (dashboard) {
        sizeClass = INPUT_SIZE.dashboard[inputSize];
      } else {
        sizeClass = INPUT_SIZE.regular[inputSize];
      }
    }

    const inputClass = `${styles.input} ${
      INPUT_TYPE[inputType] || ""
    } ${sizeClass} ${INPUT_COLOUR_TYPE[inputColourType] || ""} ${className}`;

    return (
      <div className={styles.container} ref={inputRef}>
        {children}

        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        <div className={styles.inputContainer}>
          {error && <p className={styles.errorMessage}>{error as string}</p>}
          {iconPosition === "left" && iconSrcLeft && (
            <Image
              src={iconSrcLeft}
              alt={`${ariaLabel} Icon Left`}
              width={iconWidth}
              height={iconHeight}
            />
          )}
          <input
            className={inputClass}
            {...(reactHookFormProps ?? {})}
            {...otherProps}
            type={inputType}
            placeholder={
              selectedItems.length > 0 ? selectedItems.join(", ") : placeholder
            }
            id={id}
            name={name}
            accept={accept}
            value={value}
            onChange={handleInternalChange}
            onKeyUp={onKeyUp}
            onFocus={(e) => {
              if (isMultiSelect) setIsDropdownOpen(true);
              if (onFocus) onFocus(e);
            }}
            ref={ref}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            readOnly={readonly}
            required={required}
            form={form}
          />
          {iconPosition && (
            <>
              {iconPosition === "right" || iconPosition === "leftRight" ? (
                <div
                  className={styles.rightIconContainer}
                  onClick={clearInputAndSuggestions}
                >
                  {iconSrcRight ? (
                    <Image
                      className={styles.rightIcon}
                      src={
                        value || selectedItems.length > 0
                          ? "/icons/X.png"
                          : iconSrcRight || "/icons/search.png"
                      }
                      alt={`${ariaLabel} Icon}`}
                      width={iconWidth}
                      height={iconHeight}
                    />
                  ) : value || selectedItems.length > 0 ? (
                    <Image
                      className={styles.rightIcon}
                      src={"/icons/X.png"}
                      alt={`${ariaLabel} Icon}`}
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

        {inputDescription && (
          <p id={`${id}-description`} className={styles.description}>
            {inputDescription}
          </p>
        )}

        {!isMultiSelect && isSearchBar && revealedSuggestions.length > 0 && (
          <ul className={styles.searchSuggestions}>
            {revealedSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={sizeClass}
                style={{
                  marginBottom: "0.5rem",
                }}
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
                className={sizeClass}
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
                  className={sizeClass}
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
                      onChange={(checked, _suggestion) =>
                        handleMultiSelectChange(suggestion, checked)
                      }
                    />
                    <span>{suggestion}</span>
                  </div>
                </li>
              ))}
              <Button
                className={styles.selectButton}
                buttonChildren="Select"
                buttonType="primary"
                buttonSize="large"
                name="select-btn"
                type="button"
                ariaLabel="Select Button"
                autoFocus={false}
                disabled={false}
                onClick={handleSelectButtonClick}
              />
            </ul>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

{/* <Input
      className={styles.accountName}
      isSearchBar={false}
      inputType="text"
      inputSize="large"
      iconSrcRight="/icons/search.png"
      iconPosition="right"
      iconWidth={32}
      iconHeight={32}
      label="Account Name"
      id="searchTerm"
      placeholder="Enter account holder's name"
      ariaLabel="Account Name"
      autoComplete="off"
      required
      {...register("searchTerm")}
      onChange={(e) => {
        setValue("searchTerm", e.target.value, {
          shouldDirty: true,
          shouldTouch: true,
        });
      }}
/>; */}


