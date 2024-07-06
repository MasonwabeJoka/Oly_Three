import React from "react";
import styles from "./RadioButton.module.scss";

type RadioButtonProps = {
  id: string;
  name: string;
  value: string;
  className?: string;
  label: string;
  checked: boolean;
  minWidth: number; // in rems
  buttonType?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioButton = ({
  id,
  name,
  value,
  className,
  label,
  checked,
  onChange,
  minWidth, // in rems
}: RadioButtonProps): JSX.Element => {
  return (
    <div className={styles.radioButtonContainer}>
      <label className={styles.label} htmlFor={id} style={{ minWidth: `${minWidth}rem` }}>
        {label}
        <input
          type="radio"
          id={id}
          name={name}
          checked={checked}
          value={value}
          className={className || ""}
          onChange={onChange}
          aria-label={label}
        />
        <span></span>
      </label>
    </div>
  );
};

export default RadioButton;
