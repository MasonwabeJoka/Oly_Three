"use client";

import styles from "./Select.module.scss";
import { useState, forwardRef, useRef, useEffect, useCallback } from "react";
import Icon from "@/components/Icon";
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
  name?: string;
  ariaLabel: string;
  required?: boolean;
  selectDescription?: string;
  initialValue?: string;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  isMultiSelect?: boolean;
  dashboard?: boolean;
  showSearchOptions?: boolean;
  onDropdownOpenChange?: (isOpen: boolean) => void;
  onOptionsCountChange?: (count: number) => void;
  disabled?: boolean;
  autoFocus?: boolean; // ← Added
}

const SELECT_COLOUR_TYPE = {
  primary: styles.primary,
  normal: styles.normal,
  round: styles.round,
  outlined: styles.outlined,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  info: styles.info,
  link: styles.linkBtn,
  "": "",
} as const;

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      options = [],
      reactHookFormProps,
      error,
      selectSize,
      selectColourType = "normal",
      className = "",
      label,
      id,
      name,
      ariaLabel,
      required = false,
      selectDescription,
      initialValue,
      onChange,
      dashboard = false,
      isMultiSelect = false,
      showSearchOptions = false,
      onDropdownOpenChange,
      onOptionsCountChange,
      disabled = false,
      autoFocus = false,
      ...rest
    },
    refFromForwardRef
  ) => {
    // Refs
    const rootRef = useRef<HTMLDivElement>(null);
    const optionsListRef = useRef<HTMLUListElement>(null);
    const dropDownOpenerRef = useRef<HTMLDivElement>(null);

    // State
    const [internalSelected, setInternalSelected] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

    const hasControlledValue =
      value !== undefined && value !== null && value !== "";
    const selected = hasControlledValue
      ? isMultiSelect
        ? Array.isArray(value)
          ? value
          : value
            ? [value]
            : []
        : value != null
          ? [value]
          : []
      : internalSelected;

    // Auto-focus the opener when requested
    useEffect(() => {
      if (autoFocus && dropDownOpenerRef.current) {
        dropDownOpenerRef.current.focus();
      }
    }, [autoFocus]);

    // Merge internal ref + forwardRef from parent
    const setDropDownOpenerElement = useCallback(
      (element: HTMLDivElement | null) => {
        dropDownOpenerRef.current = element;

        if (refFromForwardRef) {
          if (typeof refFromForwardRef === "function") {
            refFromForwardRef(element);
          } else {
            refFromForwardRef.current = element;
          }
        }
      },
      [refFromForwardRef]
    );

    // Size class
    const sizeClass = (() => {
      switch (selectSize) {
        case "medium":
          return dashboard ? styles.mediumDashboardSelect : styles.mediumSelect;
        case "xLarge":
          return dashboard ? styles.xLargeDashboardSelect : styles.xLargeSelect;
        default:
          return dashboard ? styles.largeDashboardSelect : styles.largeSelect;
      }
    })();

    // Helper functions
    const getOptionLabel = (opt: string | { label: string; value: any }) =>
      typeof opt === "string" ? opt : opt.label;

    const getOptionValue = (opt: string | { label: string; value: any }) =>
      typeof opt === "string" ? opt : opt.value;

    const filteredOptions = options.filter((opt) =>
      getOptionLabel(opt).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getLabelFromValue = (val: any): string => {
      if (val == null) return "";
      const option = options.find((opt) => getOptionValue(opt) === val);
      return option ? getOptionLabel(option) : String(val);
    };

    const selectedLabels = selected.map(getLabelFromValue).filter(Boolean);

    const placeholderText =
      typeof initialValue === "string" && initialValue.trim() !== ""
        ? initialValue
        : "Select an option";

    const displayText = isOpen
      ? placeholderText
      : selectedLabels.length > 0
        ? selectedLabels.join(", ")
        : placeholderText;

    const hasSelection = selected.length > 0;

    // Effects
    useEffect(
      () => onDropdownOpenChange?.(isOpen),
      [isOpen, onDropdownOpenChange]
    );
    useEffect(
      () => onOptionsCountChange?.(filteredOptions.length),
      [filteredOptions.length, onOptionsCountChange]
    );
    useOnClickOutside(rootRef as React.RefObject<HTMLElement>, () =>
      setIsOpen(false)
    );

    // Change handlers
    const triggerChange = (values: any[]) => {
      if (!onChange) return;
      const newValue = isMultiSelect ? values : (values[0] ?? "");
      onChange({ target: { value: newValue, name } } as any);
    };

    const handleSingleSelect = (val: any) => {
      if (!hasControlledValue) setInternalSelected([val]);
      triggerChange([val]);
      setIsOpen(false);
    };

    const handleMultiSelect = (val: any, checked: boolean) => {
      const updated = checked
        ? [...selected, val]
        : selected.filter((v) => v !== val);
      if (!hasControlledValue) setInternalSelected(updated);
      triggerChange(updated);
    };

    const handleSelectAll = (checked: boolean) => {
      const allValues = filteredOptions.map(getOptionValue);
      const updated = checked
        ? [...new Set([...selected, ...allValues])]
        : selected.filter((v) => !allValues.includes(v));
      if (!hasControlledValue) setInternalSelected(updated);
      triggerChange(updated);
    };

    const clearSelections = () => {
      if (!hasControlledValue) setInternalSelected([]);
      triggerChange([]);
      setSearchTerm("");
    };

    // Keyboard navigation
    useEffect(() => {
      if (!isOpen) return;

      const handleKey = (e: KeyboardEvent) => {
        switch (e.key) {
          case "Escape":
            setIsOpen(false);
            setFocusedOptionIndex(-1);
            break;
          case "ArrowDown":
            e.preventDefault();
            setFocusedOptionIndex((i) =>
              i < filteredOptions.length - 1 ? i + 1 : 0
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            setFocusedOptionIndex((i) =>
              i > 0 ? i - 1 : filteredOptions.length - 1
            );
            break;
          case "Enter":
          case " ":
            e.preventDefault();
            if (focusedOptionIndex < 0) return;
            const opt = filteredOptions[focusedOptionIndex];
            const val = getOptionValue(opt);
            isMultiSelect
              ? handleMultiSelect(val, !selected.includes(val))
              : handleSingleSelect(val);
            break;
        }
      };

      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, focusedOptionIndex, filteredOptions, selected, isMultiSelect]);

    // CSS classes
    const selectClass = `${dashboard ? styles.dashboardSelect : styles.select} ${sizeClass} ${
      selectColourType ? SELECT_COLOUR_TYPE[selectColourType] : ""
    } ${className}`;

    const selectId = `select-${id}`;
    const listboxId = `listbox-${id}`;
    const errorId = error ? `${id}-error` : undefined;
    const descriptionId = selectDescription ? `${id}-description` : undefined;
    const ariaDescribedBy = [errorId, descriptionId].filter(Boolean).join(" ");

    return (
      <div ref={rootRef} className={`${className} ${styles.container}`}>
        {/* Hidden native select for form accessibility */}
        <ShadcnSelect
          value={isMultiSelect ? undefined : (selected[0] ?? "")}
          disabled={disabled}
        >
          <SelectTrigger style={{ display: "none" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent style={{ display: "none" }}>
            {options.map((opt, i) => (
              <SelectItem key={i} value={getOptionValue(opt)}>
                {getOptionLabel(opt)}
              </SelectItem>
            ))}
          </SelectContent>
        </ShadcnSelect>

        <div className={styles.selectMenu}>
          {label && hasSelection && !isOpen && (
            <label htmlFor={selectId} className={styles.label}>
              {required && " *"}
              {label.length > 12 ? `${label.substring(0, 12)}...` : label}
            </label>
          )}

          {selectDescription && (
            <p id={descriptionId} className={styles.description}>
              {selectDescription}
            </p>
          )}

          {error && (
            <p id={errorId} className={styles.errorMessage} role="alert">
              {error}
            </p>
          )}

          <div
            // ref={setDropDownOpenerElement}
            id={selectId}
            className={`${styles.selectContainer} ${selectClass}`}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy || undefined}
            aria-invalid={!!error}
            aria-required={required}
            tabIndex={0}
            onClick={() => setIsOpen((o) => !o)}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
              (e.key === "Enter" || e.key === " ") &&
              (e.preventDefault(), setIsOpen((o) => !o))
            }
            {...(reactHookFormProps ?? {})}
            {...rest}
          >
            <div
              className={selectClass}
              style={{ backgroundColor: isOpen ? "#ffffff" : "#f3f7fa" }}
            >
              {isMultiSelect && isOpen && selected.length > 0 && (
                <div className={styles.selectCountContainer}>
                  <div className={styles.selectCount}>{selected.length}</div>
                </div>
              )}

              {isMultiSelect && selected.length > 0 && !isOpen && (
                <div className={styles.clearIconContainer}>
                  <Icon
                    className={styles.clearIcon}
                    src="/icons/X.png"
                    alt="Clear selection"
                    width={16}
                    height={16}
                    onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                      e.stopPropagation();
                      clearSelections();
                    }}
                  />
                </div>
              )}

              <p
                style={{ color: selected.length === 0 ? "#67787c" : "#434b4d" }}
              >
                {displayText}
              </p>
            </div>

            <span className={styles.dropdownIconContainer}>
              <Icon
                className={`${styles.dropdownIconOpen} ${styles.dropdownIcon}`}
                src="/icons/chevron-down.png"
                alt=""
                width={28}
                height={28}
              />
            </span>
          </div>
        </div>

        {isOpen && (
          <div className={`${styles.searchInputContainer} ${styles.options}`}>
            {isMultiSelect && showSearchOptions && (
              <div className={styles.searchContainer}>
                <Input
                  className={`${styles.searchInput} ${styles.option}`}
                  inputType="text"
                  inputSize="large"
                  iconSrcRight="/icons/search.png"
                  iconPosition="right"
                  iconWidth={32}
                  iconHeight={32}
                  label="Search options"
                  id={`${id}-search`}
                  name={`${name}-search`}
                  value={searchTerm}
                  placeholder="Search options..."
                  ariaLabel="Search options"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchTerm(e.target.value);
                    setFocusedOptionIndex(-1);
                  }}
                  autoFocus
                />
              </div>
            )}

            <ul
              ref={optionsListRef}
              id={listboxId}
              className={styles.optionsList}
              role="listbox"
              aria-multiselectable={isMultiSelect}
            >
              {isMultiSelect && filteredOptions.length > 0 && (
                <li
                  className={`${sizeClass} ${
                    dashboard && selectSize === "medium"
                      ? styles.mediumOptionWrapper
                      : styles.optionWrapper
                  }`}
                >
                  <div
                    className={`${styles.option} ${styles.selectAll}`}
                    onClick={() =>
                      handleSelectAll(
                        !filteredOptions.every((o) =>
                          selected.includes(getOptionValue(o))
                        )
                      )
                    }
                    tabIndex={0}
                    role="option"
                  >
                    <div className={styles.checkboxContainer}>
                      <Checkbox
                        checked={filteredOptions.every((o) =>
                          selected.includes(getOptionValue(o))
                        )}
                        onChange={handleSelectAll}
                      />
                    </div>
                    <span className={styles.optionText}>Select All</span>
                  </div>
                </li>
              )}

              {filteredOptions.map((option, index) => {
                const label = getOptionLabel(option);
                const value = getOptionValue(option);
                const isSelected = selected.includes(value);
                const isFocused = focusedOptionIndex === index;

                return (
                  <li
                    key={index}
                    className={`${sizeClass} ${
                      dashboard && selectSize === "medium"
                        ? styles.mediumOptionWrapper
                        : styles.optionWrapper
                    } ${isFocused ? styles.focused : ""}`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div
                      className={`${styles.option} ${isFocused ? styles.focusedOption : ""}`}
                      onClick={() =>
                        isMultiSelect
                          ? handleMultiSelect(value, !isSelected)
                          : handleSingleSelect(value)
                      }
                      tabIndex={0}
                    >
                      {isMultiSelect && (
                        <div
                          className={styles.checkboxContainer}
                          onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                            e.stopPropagation()
                          }
                        >
                          <Checkbox
                            checked={isSelected}
                            onChange={(c) => handleMultiSelect(value, c)}
                          />
                        </div>
                      )}
                      <span className={styles.optionText}>{label}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
