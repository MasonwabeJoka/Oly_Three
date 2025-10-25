import styles from "./TabOptions.module.scss";

interface TabOptionsProps {
  options: { id: number; result: string | string[] }[];
  onSelect: (option: { id: number; result: string | string[] }) => void;
  width: string;
}

const TabOptions: React.FC<TabOptionsProps> = ({ options, onSelect, width }) => {
  if (!options || options.length === 0) return null;

  return (
    <ul className={styles.options}>
      {options.map((option) => (
        <li
          key={option.id}
          className={styles.option}
          onClick={() => onSelect(option)}
          style={{ width, cursor: "pointer" }}
        >
          {Array.isArray(option.result) ? (
            <div style={{ display: "flex", gap: "16px" }}>
              <span className={styles.optionText}>${option.result[0]}</span>
              <span className={styles.optionText}>-</span>
              <span className={styles.optionText}>${option.result[1]}</span>
            </div>
          ) : (
            <span className={styles.optionText}>{option.result}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TabOptions;
