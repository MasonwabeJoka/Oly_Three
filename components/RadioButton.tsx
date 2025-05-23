import styles from "./RadioButton.module.scss";

interface RadioButtonProps {
  name: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
  customRadioButton?: (option: { value: string; label: string }) => JSX.Element; // Added customRadioButton prop
}

const RadioButton = ({
  name,
  options,
  selectedValue,
  onChange,
  className = "",
  customRadioButton,
}: RadioButtonProps) => {
  return (
    <div className={`${styles.radioGroup} ${className}`}>
      {options.map((option) => (
        customRadioButton ? (
          <div key={option.value}>{customRadioButton(option)}</div>
        ) : (
          <label key={option.value} className={styles.radioOption}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        )
      ))}
    </div>
  );
};

export default RadioButton;