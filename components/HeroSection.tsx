"use client";
import Image from "@/components/Image";
import styles from "./HeroSection.module.scss";
import HeroSectionFields from "./HeroSectionFields";
import ShopsHeroSectionFields from "@/app/(oly-shops)/oly-shops/components/ShopsHeroSectionFields";
import PropertiesHeroSectionFields from "@/app/(oly-properties)/properties/components/PropertiesHeroSectionFields";
import AutoHeroSectionFields from "../app/(oly-auto)/auto/components/AutoHeroSectionFields";
import useBreakpointStore from "@/store/useBreakpointStore";
import { variables } from "@/utils/typescript-variables/variables";

interface HeroSectionProps {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  mainTitle?: string;
}

const HeroSection = ({ category, mainTitle }: HeroSectionProps) => {
  const { isLargeDesktop, isSmallDesktop, isTablet, currentScreenSize} = useBreakpointStore();
  return (
    <>
      <div className={styles.star}>
        <Image src="/brandNew.svg" height={100} width={100} alt="star" />
      </div>

      <div className={styles.mainContainer}>
        
        <div className={styles.titleContainer}>
          <h1 style={{fontSize: isLargeDesktop && (currentScreenSize < 1590 && currentScreenSize === variables.minLargeDesktop) ? "2.625rem" : "3rem"}}>{mainTitle}</h1>
        </div>
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



