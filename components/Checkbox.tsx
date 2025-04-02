import { useState } from "react";
import styles from "./Checkbox.module.scss";
import useFeedStore from "@/store/feedStore";

type CheckboxProps = {
  id: string;
  className?: string;
  label?: string;
  isFeed?: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  onChange?: (checked: boolean, suggestion?: string) => void;
  checked?: boolean;
  type?: "checkbox" | "radio";
};

const Checkbox = ({
  id,
  className,
  label,
  hoverColour = "#ffff",
  checkedColour = "#14d6ff",
  checkedHovered = "#ccf6ff",
  checked,
  onChange,
  type = "checkbox",
}: CheckboxProps): JSX.Element => {
  const [isChecked, setIsChecked] = useState(checked ?? false);
  const [isHovered, setIsHovered] = useState(false);
  const isFeedOpen = useFeedStore((state) => state.isFeedOpen);

  const handleToggle = (newChecked: boolean) => {
    if (checked === undefined) {
      // Uncontrolled component
      setIsChecked(newChecked);
    }
    onChange?.(newChecked, undefined);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleToggle(e.target.checked);
  };

  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault(); // Prevent default label behavior
    const newChecked = checked !== undefined ? !checked : !isChecked;
    handleToggle(newChecked);
  };

  const isCheckboxChecked = checked !== undefined ? checked : isChecked;

  return (
    <div
      className={`${isFeedOpen ? styles.feedOpen : ""} ${
        styles.checkboxContainer
      }`}
    >
      <input
        type={type}
        id={id}
        className={className}
        onChange={handleCheckboxChange}
        checked={isCheckboxChecked}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ borderRadius: "0.5rem"}}
      />
      <label
        htmlFor={id}
        onClick={handleLabelClick}
        style={{
          backgroundColor: isCheckboxChecked
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

export default Checkbox;