"use client";
import Image from "@/components/Image";
import styles from "./HeroSection.module.scss";
import HeroSectionFields from "./HeroSectionFields";
import ShopsHeroSectionFields from "@/app/(oly-shops)/oly-shops/components/ShopsHeroSectionFields";
import PropertiesHeroSectionFields from "@/app/(oly-properties)/property/components/PropertiesHeroSectionFields";
import AutoHeroSectionFields from "../app/(oly-auto)/auto/components/AutoHeroSectionFields";
import useBreakpointStore from "@/store/useBreakpointStore";
import { variables } from "@/utils/typescript-variables/variables";

interface HeroSectionData {
  olyMainTitle?: string;
  showBrandNewBadge?: boolean;
}

interface HeroSectionProps {
  site:
    | "oly"
    | "oly-properties"
    | "oly-auto"
    | "oly-hiring"
    | "oly-services"
    | "oly-shops"
    | "oly-agents"
    | "oly-dealerships";
  mainTitle?: string;
  data?: HeroSectionData;
}

const HeroSection = ({ site, mainTitle, data }: HeroSectionProps) => {
  const { isLargeDesktop, currentScreenSize } = useBreakpointStore();


  return (
    <>
      {data?.showBrandNewBadge && (
        <div className={styles.star}>
          <Image src="/brandNew.svg" height={100} width={100} alt="star" />
        </div>
      )}

      <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <h1
            style={{
              fontSize:
                isLargeDesktop &&
                currentScreenSize < 1590 &&
                currentScreenSize === variables.minLargeDesktop
                  ? "2.625rem"
                  : "3rem",
            }}
          >
            {site === "oly" && (data?.olyMainTitle ?? "")}
          </h1>
        </div>
        <div className={styles.HeroSectionFieldsContainer}>
          {site === "oly" && <HeroSectionFields />}
          {site === "oly-properties" && <PropertiesHeroSectionFields />}
          {site === "oly-auto" && <AutoHeroSectionFields />}
          {site === "oly-shops" && <ShopsHeroSectionFields />}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
