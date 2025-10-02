import Image from "@/components/Image";
import styles from "./HeroSection.module.scss";
import HeroSectionSearch from "./HeroSectionSearch";
import ShopsHeroSectionSearch from "@/app/(oly-shops)/oly-shops/components/ShopsHeroSectionSearch";
import PropertiesHeroSectionSearch from "@/app/(oly-properties)/properties/components/PropertiesHeroSectionSearch";

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
        <div className={styles.heroSectionSearchContainer}>
          {category === "all" && <HeroSectionSearch />}
          {category === "property" && <PropertiesHeroSectionSearch />}
          {category === "shops" && <ShopsHeroSectionSearch />}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
