import styles from "./CheckBoxX.module.scss";

interface CheckBoxXProps {
  name: string;
  options: (string | { value: string; label: string })[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  className?: string;
  renderOption?: (option: { value: string; label: string }) => JSX.Element;
}

const CheckBoxX = ({
  name,
  options,
  selectedValues,
  onChange,
  className = "",
  renderOption,
}: CheckBoxXProps) => {
  const handleChange = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  return (
    <div className={`${styles.checkboxGroup} ${className}`}>
      {options.map((option) => (
        renderOption ? (
          <div key={option.value}>{renderOption(option)}</div>
        ) : (
          <label key={option.value} className={styles.checkboxOption}>
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        )
      ))}
    </div>
  );
};

export default CheckBoxX;