// Select.tsx (updated component)
import styles from "./Select.module.scss";
import { useState, forwardRef, useRef, useEffect } from "react";
import Icon from "@/components/Icon";
import useSidebarStore from "@/store/useSidebarStore";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { UseFormRegisterReturn } from "react-hook-form";
import Input from "./Input";
import Checkbox from "./Checkbox";

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
  onOpenChange?: (isOpen: boolean) => void;
  onOptionsCountChange?: (count: number) => void;
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
      onOpenChange,
      onOptionsCountChange,
      ...otherProps
    },
    ref
  ) => {
    const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
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
    const selectRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    // Notify parent whenever showOptions changes
    useEffect(() => {
      onOpenChange?.(showOptions);
    }, [showOptions, onOpenChange]);

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
      const useEscKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setShowOptions(false);
        }
      };

      document.addEventListener("keydown", useEscKey);
      return () => {
        document.removeEventListener("keydown", useEscKey);
      };
    }, []);

    useOnClickOutside(selectRef as React.RefObject<HTMLElement>, () => {
      setShowOptions(false);
    });

    const handleSingleSelect = (optionText: string) => {
      const newSelected = [optionText];
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

    const getOptionLabel = (option: string | { label: string; value: any }) =>
      typeof option === "string" ? option : option.label;

    const getOptionValue = (option: string | { label: string; value: any }) =>
      typeof option === "string" ? option : option.value;

    const filteredOptions = options.filter((option) =>
      getOptionLabel(option).toLowerCase().includes(searchValue.toLowerCase())
    );

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
    } ${
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

    return (
      <div ref={selectRef} className={className || ""}>
        <div className={`${styles.selectMenu}`}>
          {error && <p className={styles.errorMessage}>{error as string}</p>}

          <div
            className={`${styles.selectContainer} ${selectClass}`}
            onClick={() => {
              setShowOptions((prev) => !prev);
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
            style={{
              marginTop:
                dashboard && selectSize === "medium" ? "1rem" : "0.5rem",
            }}
          >
            {isMultiSelect && showSearchOptions && (
              <Input
                className={`${styles.searchInput} ${styles.option}`}
                isSearchBar={false}
                inputType="text"
                inputSize="large"
                iconSrcRight="/icons/search.png"
                iconPosition="right"
                iconWidth={32}
                iconHeight={32}
                label="Search Input"
                id="searchInput"
                name="searchInput"
                value={searchValue}
                placeholder="Search options..."
                ariaLabel="Search Input"
                autoComplete="off"
                onChange={(e) => setSearchValue(e.target.value)}
                autoFocus
                required={false}
              />
            )}

            <ul className={styles.optionsList}>
              {isMultiSelect && (
                <li
                  className={`${!dashboard ? styles.select : styles.dashboardSelect} ${dashboard && selectSize === "medium" ? styles.mediumOptionWrapper : styles.optionWrapper}`}
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
                  >
                    <div className={styles.checkboxContainer}>
                      <Checkbox
                        id="selectAllCheckbox"
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
                return (
                  <li
                    key={index}
                    className={`${!dashboard ? styles.select : styles.dashboardSelect} ${dashboard && selectSize === "medium" ? styles.mediumOptionWrapper : styles.optionWrapper}`}
                  >
                    <div
                      className={styles.option}
                      onClick={() =>
                        isMultiSelect
                          ? handleMultiSelect(label, !selected.includes(label))
                          : handleSingleSelect(label)
                      }
                    >
                      {isMultiSelect && (
                        <div
                          className={styles.checkboxContainer}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox
                            id={`checkbox-${index}`}
                            type="checkbox"
                            checked={selected.includes(label)}
                            onChange={(checked) =>
                              handleMultiSelect(label, checked)
                            }
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
