import styles from "./HeroSection.module.scss";
import HeroSectionSearch from "@/components/HeroSectionSearch";

const HeroSection = () => {
  return (
    <div className={styles.mainSection}>
      <h1 className={styles.mainTitle}>
        Lacinia ornare veh tellus nisi tempus. Lacinia ornare veh tellus nisi
        tempus.
      </h1>
      <div className={styles.heroSectionSearchContainer}>
        <HeroSectionSearch />
      </div>
    </div>
  );
};

export default HeroSection;
