import Image from "next/image";
import styles from "./ShopsHeroSection.module.scss";
import ShopsHeroSectionSearch from "./ShopsHeroSectionSearch";

interface HeroSectionProps {
  mainTitle?: string;
}

const ShopsHeroSection = ({ mainTitle }: HeroSectionProps) => {
  return (
    <div className={styles.mainSection}>
      <div className={styles.star}>
        <Image
        src="/brandNew.svg"
        height={100}
        width={100}
        alt="star"
        />
      </div>
      <h1 className={styles.mainTitle}>
       {mainTitle}
      </h1>
      <div className={styles.heroSectionSearchContainer}>
      </div>
    </div>
  );
};

export default ShopsHeroSection;
