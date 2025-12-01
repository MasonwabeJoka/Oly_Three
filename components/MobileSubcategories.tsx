import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useEffect, useRef, useState } from "react";
import styles from "./MobileSubcategories.module.scss";

interface SelectProps {
  className?: string;
  options: any[];
  category: string;
  id: string | number;
  name: string;
  ariaLabel: string;
  form?: string;
  value?: any;
  onChange?: any;
  onBlur?: any;
  [key: string]: any;
}

const MobileSubcategories = ({
  category,
  value,
  options,
  id,
  name,
  ariaLabel,
  onChange,
  onBlur,
  children,
  ...otherProps
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useOnClickOutside(selectRef as any, () => setShowOptions(false));

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

  return (
    <>
      <div className={`${styles.selectMenu}`}>
        <div
          className={styles.selectContainer}
          onClick={() => setShowOptions(!showOptions)}
          ref={selectRef}
        >
          <div className={styles.select}>{category}</div>
        </div>
      </div>
      {showOptions && (
        <ul
          className={showOptions ? styles.options : styles.hideOptions}
          ref={selectRef as any}
        >
          {options.map((option, index) => (
            <li
              className={styles.option}
              key={option.id || index}
              onClick={() => {
                handleSelect(option);
              }}
            >
              <span className={styles.optionText}>{option}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MobileSubcategories;
