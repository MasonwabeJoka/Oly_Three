"use client";
import Image from "@/components/Image";
import styles from "./HeroSection.module.scss";
import HeroSectionFields from "./HeroSectionFields";
import ShopsHeroSectionFields from "@/app/(oly-shops)/oly-shops/components/ShopsHeroSectionFields";
import PropertiesHeroSectionFields from "@/app/(oly-properties)/property/components/PropertiesHeroSectionFields";
import AutoHeroSectionFields from "../app/(oly-auto)/auto/components/AutoHeroSectionFields";
import useBreakpointStore from "@/store/useBreakpointStore";
import { variables } from "@/utils/typescript-variables/variables";

interface HeroSectionProps {
  site: "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services" | "oly-shops";
  mainTitle?: string;
  displayOptions?: {
    showBadge?: boolean;
    showTitle?: boolean;
    showFields?: boolean;
  };
}

const HeroSection = ({ site, mainTitle, displayOptions }: HeroSectionProps) => {
  const { isLargeDesktop, isSmallDesktop, isTablet, currentScreenSize} = useBreakpointStore();

  // Default display options if not provided
  const { 
    showBadge = true, 
    showTitle = true, 
    showFields = true 
  } = displayOptions || {};

  return (
    <>
      {showBadge && (
        <div className={styles.star}>
          <Image src="/brandNew.svg" height={100} width={100} alt="star" />
        </div>
      )}

      <div className={styles.mainContainer}>
        {showTitle && mainTitle && (
          <div className={styles.titleContainer}>
            <h1 style={{fontSize: isLargeDesktop && (currentScreenSize < 1590 && currentScreenSize === variables.minLargeDesktop) ? "2.625rem" : "3rem"}}>
              {mainTitle}
            </h1>
          </div>
        )}
        
        {showFields && (
          <div className={styles.HeroSectionFieldsContainer}>
            {site === "oly" && <HeroSectionFields />}
            {site === "oly-properties" && <PropertiesHeroSectionFields />}
            {site === "oly-auto" && <AutoHeroSectionFields />}
            {site === "oly-shops" && <ShopsHeroSectionFields />}
          </div>
        )}
      </div>
    </>
  );
};

export default HeroSection;



