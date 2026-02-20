"use client";

import styles from "./PropertiesFilter.module.scss";

type FilterMode = "single" | "multiple";

type FilterOption = {
  value: string;
  label: string;
};

type FilterField = {
  id: string;
  label: string;
  type: "radio" | "checkbox";
  mode: FilterMode;
  options: FilterOption[];
};

interface PropertiesFilterProps {
  fields: FilterField[];
  selectedValues: Record<string, string[]>;
  onFilterChange: (fieldId: string, selected: string[]) => void;
}

const PropertiesFilter = ({ fields, selectedValues, onFilterChange }: PropertiesFilterProps) => {
  const handleOptionClick = (field: FilterField, value: string) => {
    const currentSelected = selectedValues[field.id] || [];
    let newSelected: string[];

    if (field.mode === "single") {
      newSelected = currentSelected.includes(value) ? [] : [value];
    } else {
      newSelected = currentSelected.includes(value)
        ? currentSelected.filter((v) => v !== value)
        : [...currentSelected, value];
    }

    onFilterChange(field.id, newSelected);
  };

  const hasSelection = fields.some(
    (field) => (selectedValues[field.id] || []).length > 0
  );

  return (
    <div className={`${styles.container} ${hasSelection ? styles.hasSelection : ""}`}>
      <div className={styles.wrapper}>
        {fields.map((field) => {
          const selected = selectedValues[field.id] || [];

          return field.options.map((option) => (
            <div
              className={`${styles.option} ${
                selected.includes(option.value) ? styles.selected : ""
              }`}
              key={`${field.id}-${option.value}`}
              onClick={() => handleOptionClick(field, option.value)}
            >
              <span>{option.label}</span>
            </div>
          ));
        })}
      </div>
    </div>
  );
};

export default PropertiesFilter;
