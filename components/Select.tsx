import styles from "./Select.module.scss";
import { useState, useRef, useEffect } from "react";
import Icon from "@/components/Icon";
import useSidebarStore from "@/store/useSidebarStore";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectProps {
  className?: string;
  selectSize:
    | keyof typeof SELECT_SIZE.regular
    | keyof typeof SELECT_SIZE.feed
    | keyof typeof SELECT_SIZE.dashboard;
  selectColourType?: keyof typeof SELECT_COLOUR_TYPE;
  label: string;
  options: string[];
  reactHookFormProps?: UseFormRegisterReturn;
  error?: string;
  id: string;
  name: string;
  ariaLabel: string;
  autoFocus: boolean;
  autoComplete?: "on" | "off";
  required: boolean;
  selectDescription?: string;
  form?: string;
  initialValue: any;
  setterValue?: any;
  value?: any;
  onChange?: any;
  onBlur?: any;
  [key: string]: any;
  dashboard?: boolean;
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

const Select = ({
  value,
  options,
  reactHookFormProps,
  error,
  selectSize,
  selectColourType = "normal",
  className,
  legend,
  label,
  autoComplete,
  id,
  initialValue,
  setterValue,
  name,
  ariaLabel,
  required,
  selectDescription,
  onChange,
  onBlur,
  children,
  dashboard = false,
  ...otherProps
}: SelectProps) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const [selectedOption, setSelectedOption] = useState<string>(initialValue);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useOnClickOutside(selectRef, () => setShowOptions(false));

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

  const handleSelect = (optionText: string) => {
    setSelectedOption(optionText);
    setShowOptions(false);

    // Trigger onChange event with the new value using type assertion
    if (onChange) {
      onChange({
        target: { value: optionText, name } as unknown as EventTarget &
          HTMLSelectElement,
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  };

  let sizeClass = "";

  if (isSidebarOpen) {
    sizeClass = SELECT_SIZE.feed[selectSize];
  } else {
    if (dashboard) {
      sizeClass = SELECT_SIZE.dashboard[selectSize];
    } else {
      sizeClass = SELECT_SIZE.regular[selectSize];
    }
  }

  const selectClass = `${styles.select}  ${sizeClass} ${
    selectColourType ? SELECT_COLOUR_TYPE[selectColourType] : ""
  } ${className}`;

  return (
    <div ref={selectRef}>
      <div className={`${styles.selectMenu}`}>
      {error &&<p className={styles.errorMessage}>{error as string}</p>}
      
        <div
          className={styles.selectContainer}
          onClick={() => setShowOptions(!showOptions)}
          // onChange={onChange}
          // onBlur={onBlur}
          // ref={selectRef}
          {...(reactHookFormProps ?? {})}
        >
          
          <div className={selectClass}>
            <p
              style={{
                color: selectedOption === initialValue ? "#67787c" : "#434b4d",
              }}
            >
              {selectedOption}
            </p>
          </div>

          <span className={styles.dropdownIconContainer} ref={selectRef}>
            <Icon
              className={`${styles.dropdownIconOpen}  ${styles.dropdownIcon}`}
              src="/icons/chevron-down.png"
              alt="chevron"
              width={28}
              height={28}
            />
          </span>
        </div>
      </div>
      {showOptions && (
        <ul className={showOptions ? styles.options : styles.hideOptions}>
          {options.map((option, index) => (
            <li
              key={option?.id || index}
              className={sizeClass}
              onClick={() => {
                handleSelect(option);
              }}
              style={{
                marginBottom: "0.5rem",
              }}
            >
              <div className={styles.option}>
                <span className={styles.optionText}>{option}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;

{
  /* <Select
  options={[]}
  initialValue="Select your province"
  selectSize="large"
  label="Provinces"
  id="provinces"
  name="provinces"
  ariaLabel="Provinces"
  autoFocus={false}
  required={false}
/>; */
}
