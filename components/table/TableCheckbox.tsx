'use client'
import { useEffect, useRef, useState } from "react";
import styles from "./TableCheckbox.module.scss";
import useFeedStore from "@/store/feedStore";
import { Checkbox } from "@/components/ui/checkbox";

type TableCheckboxProps = {
  id: string;
  className?: string;
  name?: string;
  label?: string;
  isFeed?: boolean;
  indeterminate?: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  onChange?: (checked: boolean, suggestion?: string) => void;
  checked?: boolean;
  disabled?: boolean;
  type?: "checkbox" | "radio";
};

const TableCheckbox = ({
  id,
  className,
  name,
  label,
  indeterminate = false,
  hoverColour = "#ffff",
  checkedColour = "#14d6ff",
  checkedHovered = "#14d6ff",
  checked,
  disabled,
  onChange,
  type = "checkbox",
}: TableCheckboxProps): JSX.Element => {
  const [isChecked, setIsChecked] = useState(checked ?? false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFeedOpen = useFeedStore((state) => state.isFeedOpen);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  const handleToggle = (newChecked: boolean) => {
    if (checked === undefined) {
      // Uncontrolled component
      setIsChecked(newChecked);
    }
    onChange?.(newChecked, undefined);
  };

  const handleTableCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (checked === undefined) {
      setIsChecked(newChecked);
    }
    onChange?.(newChecked, undefined);
  };

  const isTableCheckboxChecked = checked !== undefined ? checked : isChecked;

  return (
    <div
      className={`${isFeedOpen ? styles.feedOpen : ""} ${
        styles.checkboxContainer
      } ${className || ''}`}
    >
      <input
        ref={inputRef}
        type={type}
        id={id}
        name={name}
        className={`${styles.checkboxInput} ${className || ''}`}
        onChange={handleTableCheckboxChange}
        checked={isTableCheckboxChecked}
        disabled={disabled ?? false}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
     
      />
      <label
        htmlFor={id}
        style={{
          backgroundColor: isTableCheckboxChecked
            ? isHovered
              ? checkedHovered
              : checkedColour
            : isHovered
              ? hoverColour
              : "#edf2f7",
          borderRadius: "0.5rem",
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {label}
      </label>
    </div>
  );
};

export default TableCheckbox;
