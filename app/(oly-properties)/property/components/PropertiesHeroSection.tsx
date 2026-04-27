import Image from "@/components/Image";
import styles from "./PropertiesHeroSection.module.scss";
import PropertiesHeroSectionFields from "./PropertiesHeroSectionFields";

interface HeroSectionProps {
  mainTitle?: string;
}

const PropertiesHeroSection = ({ mainTitle }: HeroSectionProps) => {
  return (
    <div className={styles.mainSection}>
      <div className={styles.star}>
        <Image src="/brandNew.svg" height={100} width={100} alt="star" />
      </div>
      <h1 className={styles.mainTitle}>{mainTitle}</h1>
      <div className={styles.HeroSectionFieldsContainer}>
        <PropertiesHeroSectionFields />
      </div>
    </div>
  );
};

export default PropertiesHeroSection;
