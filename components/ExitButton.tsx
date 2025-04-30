import styles from "./ExitButton.module.scss";
import Icon from "./Icon";
const ExitButton = () => {
  return (
    <div className={styles.container}>
      <Icon src="/icons/x.png" alt="exit Icon" width={16} height={16} />
    </div>
  );
};

export default ExitButton;
