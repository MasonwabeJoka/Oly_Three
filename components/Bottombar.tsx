import styles from "./Bottombar.module.scss";
import Icon from "./Icon";

const Bottombar = () => {
  return (
    <div className={styles.container}>
      <Icon
        className={styles.menuIcon}
        src="/icons/dashboard-sidebar/home.png"
        alt="Menu Icon"
        width={32}
        height={32}
      />
    </div>
  );
};

export default Bottombar;
