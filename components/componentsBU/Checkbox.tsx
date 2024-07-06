import { useState } from "react";
import styles from "./Checkbox.module.scss";
import useSidebarStore from "@/store/useSidebarStore";

type CheckboxProps = {
  id: string;
  className: string;
  label?: string;
  isFeed: boolean;
  checkedColour: string;
  hoverColour: string;
  checkedHovered: string;
};

const Checkbox = ({
  id,
  className,
  label,
  hoverColour = "#ffff",
  checkedColour = "#14d6ff",
  checkedHovered = "#ccf6ff",
}: CheckboxProps): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={`${isSidebarOpen ? styles.feedOpen : ""} ${
        styles.checkboxContainer
      }`}
    >
      <input
        type="checkbox"
        id={id}
        className={className}
        onChange={handleCheckboxChange}
        checked={isChecked}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ borderRadius: "0.5rem" }}
      />
      <label
        htmlFor={id}
        style={{
          backgroundColor: isChecked
            ? isHovered
              ? checkedHovered
              : checkedColour
            : isHovered
            ? hoverColour
            : "#edf2f7",

          borderRadius: "0.5rem",
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
