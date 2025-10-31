import Image from "@/components/Image";
import styles from "./HeroSection.module.scss";
import HeroSectionFields from "./HeroSectionFields";
import ShopsHeroSectionFields from "@/app/(oly-shops)/oly-shops/components/ShopsHeroSectionFields";
import PropertiesHeroSectionFields from "@/app/(oly-properties)/properties/components/PropertiesHeroSectionFields";
import AutoHeroSectionFields from "../app/(oly-auto)/auto/components/AutoHeroSectionFields";

interface HeroSectionProps {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  mainTitle?: string;
}

const HeroSection = ({ category, mainTitle }: HeroSectionProps) => {
  return (
    <>
      <div className={styles.star}>
        <Image src="/brandNew.svg" height={100} width={100} alt="star" />
      </div>
      <div className={styles.mainSection}>
        <h1 className={styles.mainTitle}>{mainTitle}</h1>
        <div className={styles.HeroSectionFieldsContainer}>
          {category === "all" && <HeroSectionFields />}
          {category === "property" && <PropertiesHeroSectionFields />}
          {category === "vehicles" && <AutoHeroSectionFields />}
          {category === "shops" && <ShopsHeroSectionFields />}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
