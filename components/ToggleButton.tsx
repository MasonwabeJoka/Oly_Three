import styles from "./ToggleButton.module.scss";

interface ToggleButtonProps {
  id: string;
  name: string;
  className?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ id, name, className }) => {
  return (
    <label className={`${styles.container} ${className || ''}`} htmlFor={id}>
      <input 
        className={styles.checkbox} 
        type="checkbox" 
        id={id} 
        name={name}
        role="switch"
        aria-label={`Toggle ${name}`}
      />
      <div className={styles.toggleContainer}></div>
    </label>
  );
};

export default ToggleButton;
