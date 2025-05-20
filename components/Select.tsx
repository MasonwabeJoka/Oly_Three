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
  selectSize:
    | keyof typeof SELECT_SIZE.regular
    | keyof typeof SELECT_SIZE.feed
    | keyof typeof SELECT_SIZE.dashboard;
  selectColourType?: keyof typeof SELECT_COLOUR_TYPE;
  label: string;
  options?: string[];
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

const SELECT_SIZE = {
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
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
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
        option.toLowerCase().includes(searchValue.toLowerCase())
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
      setSelectedOptions([optionText]);
      setShowOptions(false);
      triggerChangeEvent([optionText]);
    };

    const handleMultiSelect = (optionText: string, checked: boolean) => {
      const updatedOptions = checked
        ? [...selectedOptions, optionText]
        : selectedOptions.filter((item) => item !== optionText);
      setSelectedOptions(updatedOptions);
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
        ? [...new Set([...selectedOptions, ...allOptionLabels])]
        : selectedOptions.filter((item) => !allOptionLabels.includes(item));
      setSelectedOptions(updatedOptions);
      triggerChangeEvent(updatedOptions);
    };

    const triggerChangeEvent = (values: string[]) => {
      if (onChange) {
        onChange({
          target: { value: isMultiSelect ? values : values[0], name } as any,
        } as React.ChangeEvent<HTMLSelectElement>);
      }
    };

    const clearSelections = () => {
      setSelectedOptions([]);
      setSearchValue("");
      triggerChangeEvent([]);
    };

    let sizeClass = "";
    if (isSidebarOpen) {
      sizeClass = SELECT_SIZE.feed[selectSize];
    } else {
      sizeClass = dashboard
        ? SELECT_SIZE.dashboard[selectSize]
        : SELECT_SIZE.regular[selectSize];
    }

    const selectClass = `${styles.select} ${sizeClass} ${
      selectColourType ? SELECT_COLOUR_TYPE[selectColourType] : ""
    } ${className}`;

    const displayText =
      selectedOptions.length > 0
        ? selectedOptions.join(", ").length > 40
          ? selectedOptions.join(", ").slice(0, 40) + "..."
          : selectedOptions.join(", ")
        : typeof initialValue === "string"
          ? initialValue
          : "Select an option";

    return (
      <div ref={selectRef}>
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
              {isMultiSelect && showOptions && selectedOptions.length > 0 && (
                <div className={styles.selectCountContainer}>
                  <div className={styles.selectCount}>
                    {selectedOptions.length}
                  </div>
                </div>
              )}

              {isMultiSelect && selectedOptions.length > 0 && !showOptions && (
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
                  color: selectedOptions.length === 0 ? "#67787c" : "#434b4d",
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
            ref={searchInputRef}
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
                <li className={sizeClass} style={{ marginBottom: "0.5rem" }}>
                  <div
                    className={`${styles.option} ${styles.selectAll}`}
                    onClick={() =>
                      handleSelectAll(
                        !filteredOptions.every((option) =>
                          selectedOptions.includes(getOptionLabel(option))
                        )
                      )
                    }
                  >
                    <div className={styles.checkboxContainer}>
                      <Checkbox
                        id="selectAllCheckbox"
                        type="checkbox"
                        checked={filteredOptions.every((option) =>
                          selectedOptions.includes(getOptionLabel(option))
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
                    className={sizeClass}
                    style={{ marginBottom: "0.5rem" }}
                  >
                    <div
                      className={styles.option}
                      onClick={() =>
                        isMultiSelect
                          ? handleMultiSelect(
                              label,
                              !selectedOptions.includes(label)
                            )
                          : handleSingleSelect(label)
                      }
                    >
                      {isMultiSelect && (
                        <div className={styles.checkboxContainer}>
                          <Checkbox
                            id={`checkbox-${index}`}
                            type="checkbox"
                            checked={selectedOptions.includes(label)}
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