import styles from "./Select.module.scss";
import { useState, forwardRef, useRef, useEffect } from "react";
import Icon from "@/components/Icon";
import useSidebarStore from "@/store/useSidebarStore";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { UseFormRegisterReturn } from "react-hook-form";
import Input from "./Input";
import Checkbox from "./Checkbox";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectProps {
  className?: string;
  selectSize: "xxLarge" | "xLarge" | "large" | "medium";
  selectColourType?: keyof typeof SELECT_COLOUR_TYPE;
  label: string;
  options?: (string | { label: string; value: any })[];
  reactHookFormProps?: UseFormRegisterReturn;
  error?: string;
  id: string;
  name: string;
  ariaLabel: string;
  autoFocus?: boolean;
  autoComplete?: "on" | "off";
  required?: boolean;
  selectDescription?: string;
  form?: string;
  initialValue?: string | string[];
  setterValue?: any;
  value?: any;
  showSearchOptions?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: any;
  isMultiSelect?: boolean;
  dashboard?: boolean;
  onDropdownOpenChange?: (isOpen: boolean) => void;
  onOptionsCountChange?: (count: number) => void;
  ariaDescribedBy?: string;
  ariaInvalid?: boolean;
}

const SELECT_COLOUR_TYPE = {
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

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      showSearchOptions = false,
      options = [],
      reactHookFormProps,
      error,
      selectSize,
      selectColourType = "normal",
      className = "",
      label,
      autoComplete,
      id,
      initialValue = "",
      setterValue,
      name,
      ariaLabel,
      required = false,
      selectDescription,
      onChange,
      onBlur,
      dashboard = false,
      isMultiSelect = false,
      onDropdownOpenChange,
      onOptionsCountChange,
      ...otherProps
    },
    ref
  ) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>(
      Array.isArray(initialValue)
        ? initialValue
        : typeof initialValue === "string"
          ? [initialValue]
          : []
    );
    const controlled = value !== undefined;
    const selected = controlled
      ? isMultiSelect
        ? Array.isArray(value)
          ? value
          : []
        : typeof value === "string"
          ? [value]
          : []
      : selectedOptions;
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState("");
    const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);
    const selectRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const optionsListRef = useRef<HTMLUListElement>(null);

    let sizeClass = "";
    switch (selectSize) {
      case "medium":
        sizeClass = !dashboard
          ? styles.mediumSelect
          : styles.mediumDashboardSelect;
        break;
      case "xLarge":
        sizeClass = !dashboard
          ? styles.xLargeSelect
          : styles.xLargeDashboardSelect;
        break;
      default:
        sizeClass = !dashboard
          ? styles.largeSelect
          : styles.largeDashboardSelect;
    }

    const getOptionLabel = (option: string | { label: string; value: any }) =>
      typeof option === "string" ? option : option.label;

    const getOptionValue = (option: string | { label: string; value: any }) =>
      typeof option === "string" ? option : option.value;
    const filteredOptions = options.filter((option) =>
      getOptionLabel(option).toLowerCase().includes(searchValue.toLowerCase())
    );

    // Notify parent whenever showOptions changes
    useEffect(() => {
      onDropdownOpenChange?.(showOptions);
    }, [showOptions, onDropdownOpenChange]);

    // Notify parent of options count whenever options or searchValue changes

    useEffect(() => {
      const filteredOptions = options.filter((option) =>
        getOptionLabel(option).toLowerCase().includes(searchValue.toLowerCase())
      );

      onOptionsCountChange?.(filteredOptions.length);
    }, [options, searchValue, onOptionsCountChange]);

    useEffect(() => {
      const handleWheel = (e: WheelEvent) => {
        const optionsElement = selectRef.current?.querySelector(".options");
        if (optionsElement && optionsElement.contains(e.target as Node)) {
          e.preventDefault();
        }
      };

      document.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        document.removeEventListener("wheel", handleWheel);
      };
    }, [showOptions]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!showOptions) return;

        switch (e.key) {
          case "Escape":
            setShowOptions(false);
            setFocusedOptionIndex(-1);
            break;
          case "ArrowDown":
            e.preventDefault();
            setFocusedOptionIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : 0
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            setFocusedOptionIndex((prev) =>
              prev > 0 ? prev - 1 : filteredOptions.length - 1
            );
            break;
          case "Enter":
          case " ":
            e.preventDefault();
            if (focusedOptionIndex >= 0) {
              const option = filteredOptions[focusedOptionIndex];
              const value = getOptionValue(option);
              const label = getOptionLabel(option);

              if (isMultiSelect) {
                handleMultiSelect(label, !selected.includes(label));
              } else {
                handleSingleSelect(value);
              }
            }
            break;
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [
      showOptions,
      focusedOptionIndex,
      filteredOptions,
      selected,
      isMultiSelect,
    ]);

    useOnClickOutside(selectRef as React.RefObject<HTMLElement>, () => {
      setShowOptions(false);
    });

    const handleSingleSelect = (optionValue: string) => {
      const newSelected = [optionValue];
      if (!controlled) {
        setSelectedOptions(newSelected);
      }
      triggerChangeEvent(newSelected);
      setShowOptions(false);
    };

    const handleMultiSelect = (optionText: string, checked: boolean) => {
      const updatedOptions = checked
        ? [...selected, optionText]
        : selected.filter((item) => item !== optionText);
      if (!controlled) {
        setSelectedOptions(updatedOptions);
      }
      triggerChangeEvent(updatedOptions);
    };

    const handleSelectAll = (checked: boolean) => {
      const allOptionLabels = filteredOptions.map(getOptionLabel);
      const updatedOptions = checked
        ? [...new Set([...selected, ...allOptionLabels])]
        : selected.filter((item) => !allOptionLabels.includes(item));
      if (!controlled) {
        setSelectedOptions(updatedOptions);
      }
      triggerChangeEvent(updatedOptions);
    };

    const triggerChangeEvent = (values: string[]) => {
      if (onChange) {
        const changeValue = isMultiSelect ? values : (values[0] ?? "");
        onChange({
          target: { value: changeValue, name } as any,
        } as React.ChangeEvent<HTMLSelectElement>);
      }
    };

    const handleShadcnChange = (value: string) => {
      if (!isMultiSelect) {
        handleSingleSelect(value);
      }
    };

    const clearSelections = () => {
      const newSelected: string[] = [];
      if (!controlled) {
        setSelectedOptions(newSelected);
      }
      setSearchValue("");
      triggerChangeEvent(newSelected);
    };

    const selectClass = `${
      !dashboard ? styles.select : styles.dashboardSelect
    } ${sizeClass} ${
      selectColourType ? SELECT_COLOUR_TYPE[selectColourType] : ""
    } ${className || ""}`;

    const displayText = showOptions
      ? typeof initialValue === "string"
        ? initialValue
        : "Select an option"
      : selected.length > 0
        ? selected.join(", ").length > 40
          ? selected.join(", ").slice(0, 40) + "..."
          : selected.join(", ")
        : typeof initialValue === "string"
          ? initialValue
          : "Select an option";

    const selectId = `select-${id}`;
    const listboxId = `listbox-${id}`;
    const errorId = error ? `${id}-error` : undefined;
    const descriptionId = selectDescription ? `${id}-description` : undefined;
    const ariaDescribedByIds = [errorId, descriptionId]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={selectRef} className={`${className} ${styles.container}`}>
        <ShadcnSelect
          value={isMultiSelect ? undefined : selected[0] || ""}
          onValueChange={handleShadcnChange}
          disabled={isMultiSelect}
        >
          <SelectTrigger style={{ display: "none" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent style={{ display: "none" }}>
            {options.map((option, index) => {
              const value = getOptionValue(option);
              const label = getOptionLabel(option);
              return (
                <SelectItem key={index} value={value}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </ShadcnSelect>
        <div className={`${styles.selectMenu}`}>
          {label && (
            <label htmlFor={selectId} className={styles.label}>
              {label}
              {required && <span aria-label="required"> *</span>}
            </label>
          )}

          {selectDescription && (
            <p id={descriptionId} className={styles.description}>
              {selectDescription}
            </p>
          )}

          {error && (
            <p
              id={errorId}
              className={styles.errorMessage}
              role="alert"
              aria-live="polite"
            >
              {error as string}
            </p>
          )}

          <div
            id={selectId}
            className={`${styles.selectContainer} ${selectClass}`}
            role="combobox"
            aria-expanded={showOptions}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedByIds || undefined}
            aria-invalid={!!error}
            aria-required={required}
            tabIndex={0}
            onClick={() => {
              setShowOptions((prev) => !prev);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setShowOptions((prev) => !prev);
              }
            }}
            {...(reactHookFormProps ?? {})}
          >
            <div
              className={selectClass}
              style={{
                backgroundColor: showOptions ? "#ffffff" : "#f3f7fa",
              }}
            >
              {isMultiSelect && showOptions && selected.length > 0 && (
                <div className={styles.selectCountContainer}>
                  <div className={styles.selectCount}>{selected.length}</div>
                </div>
              )}

              {isMultiSelect && selected.length > 0 && !showOptions && (
                <div className={styles.clearIconContainer}>
                  <Icon
                    className={styles.clearIcon}
                    src="/icons/X.png"
                    alt="clear"
                    width={16}
                    height={16}
                    onClick={(e) => {
                      e.stopPropagation();
                      clearSelections();
                    }}
                  />
                </div>
              )}
              <p
                style={{
                  color: selected.length === 0 ? "#67787c" : "#434b4d",
                }}
              >
                {displayText}
              </p>
            </div>

            <span className={styles.dropdownIconContainer}>
              <Icon
                className={`${styles.dropdownIconOpen} ${styles.dropdownIcon}`}
                src="/icons/chevron-down.png"
                alt="chevron"
                width={28}
                height={28}
              />
            </span>
          </div>
        </div>

        {showOptions && (
          <div
            className={`${styles.searchInputContainer} ${styles.options}`}
            role="region"
            aria-label="Select options"
          >
            {isMultiSelect && showSearchOptions && (
              <div className={styles.searchContainer}>
                <Input
                  className={`${styles.searchInput} ${styles.option}`}
                  isSearchBar={false}
                  inputType="text"
                  inputSize="large"
                  iconSrcRight="/icons/search.png"
                  iconPosition="right"
                  iconWidth={32}
                  iconHeight={32}
                  label="Search options"
                  id={`${id}-search`}
                  name="searchInput"
                  value={searchValue}
                  placeholder="Search options..."
                  ariaLabel="Search options"
                  autoComplete="off"
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setFocusedOptionIndex(-1);
                  }}
                  autoFocus
                  required={false}
                />
                <div className="sr-only" aria-live="polite">
                  {filteredOptions.length} options available
                </div>
              </div>
            )}

            <ul
              ref={optionsListRef}
              id={listboxId}
              className={styles.optionsList}
              role="listbox"
              aria-label={`${label} options`}
              aria-multiselectable={isMultiSelect}
            >
              {isMultiSelect && (
                <li
                  className={sizeClass}
                  role="option"
                  aria-selected={filteredOptions.every((option) =>
                    selected.includes(getOptionLabel(option))
                  )}
                >
                  <div
                    className={`${styles.option} ${styles.selectAll}`}
                    onClick={() =>
                      handleSelectAll(
                        !filteredOptions.every((option) =>
                          selected.includes(getOptionLabel(option))
                        )
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelectAll(
                          !filteredOptions.every((option) =>
                            selected.includes(getOptionLabel(option))
                          )
                        );
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Select all options"
                  >
                    <div className={styles.checkboxContainer}>
                      <Checkbox
                        id={`${id}-select-all`}
                        type="checkbox"
                        checked={filteredOptions.every((option) =>
                          selected.includes(getOptionLabel(option))
                        )}
                        onChange={(checked) => handleSelectAll(checked)}
                      />
                    </div>
                    <span className={styles.optionText}>Select All</span>
                  </div>
                </li>
              )}

              {filteredOptions.map((option, index) => {
                const label = getOptionLabel(option);
                const value = getOptionValue(option);
                const isSelected = selected.includes(label);
                const isFocused = focusedOptionIndex === index;

                return (
                  <li
                    key={index}
                    className={`${sizeClass} ${dashboard && selectSize === "medium" ? styles.mediumOptionWrapper : styles.optionWrapper} ${isFocused ? styles.focused : ""}`}
                    role="option"
                    aria-selected={isSelected}
                    id={`${id}-option-${index}`}
                  >
                    <div
                      className={`${styles.option} ${isFocused ? styles.focusedOption : ""}`}
                      onClick={() =>
                        isMultiSelect
                          ? handleMultiSelect(value, !selected.includes(value))
                          : handleSingleSelect(value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          isMultiSelect
                            ? handleMultiSelect(
                                value,
                                !selected.includes(value)
                              )
                            : handleSingleSelect(value);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${isMultiSelect ? (isSelected ? "Deselect" : "Select") : "Choose"} ${label}`}
                    >
                      {isMultiSelect && (
                        <div
                          className={styles.checkboxContainer}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox
                            id={`${id}-checkbox-${index}`}
                            type="checkbox"
                            checked={isSelected}
                            onChange={(checked) =>
                              handleMultiSelect(label, checked)
                            }
                          />
                        </div>
                      )}
                      <span className={styles.optionText}>{label}</span>
                      {isSelected && !isMultiSelect && (
                        <span className="sr-only">Selected</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {isMultiSelect &&
                selected.length > 0 &&
                `${selected.length} option${selected.length === 1 ? "" : "s"} selected`}
              {focusedOptionIndex >= 0 &&
                filteredOptions[focusedOptionIndex] &&
                `Focused on ${getOptionLabel(filteredOptions[focusedOptionIndex])}`}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
