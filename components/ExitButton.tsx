import styles from "./ExitButton.module.scss";
import Icon from "./Icon";

const ExitButton = () => {
  return (
    <div
      className={styles.container}
      role="button"
      tabIndex={0}
      aria-label="Close chat"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          document.dispatchEvent(new Event("click")); // Trigger parent onClick
        }
      }}
    >
      <Icon src="/icons/x.png" alt="Close chat icon" width={16} height={16} />
    </div>
  );
};

export default ExitButton;