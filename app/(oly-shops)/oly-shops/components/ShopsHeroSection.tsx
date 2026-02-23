import Image from "@/components/Image";
import styles from "./ShopsHeroSection.module.scss";
import ShopsHeroSectionFields from "./ShopsHeroSectionFields";

interface HeroSectionProps {
  mainTitle?: string;
}

const ShopsHeroSection = ({ mainTitle }: HeroSectionProps) => {
  return (
    <div className={styles.mainSection}>
      <div className={styles.star}>
        <Image src="/brandNew.svg" height={100} width={100} alt="star" />
      </div>
      <h1 className={styles.mainTitle}>{mainTitle}</h1>
      <div className={styles.HeroSectionFieldsContainer}></div>
    </div>
  );
};

export default ShopsHeroSection;
