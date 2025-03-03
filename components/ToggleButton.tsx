import styles from "./ToggleButton.module.scss";

interface ToggleButtonProps {
  id: string;
  name: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ id, name }) => {
  return (
    <label className={styles.container} htmlFor={id}>
      <input className={styles.checkbox} type="checkbox" id={id} name={name} />
      <div className={styles.toggleContainer}></div>
    </label>
  );
};

export default ToggleButton;
