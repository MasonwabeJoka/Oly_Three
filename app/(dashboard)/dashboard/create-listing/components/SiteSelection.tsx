"use client";
import styles from "./SiteSelection.module.scss";
import ClassifiedLink from "@/components/cards/ClassifiedLink";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import NavButtons from "@/components/NavButtons";
import useBreakpointStore from "@/store/useBreakpointStore";

export const sites = [
  {
    id: 1,
    text: "Oly",
    image: "/bear.jpg",
    link: "/dashboard/create-listing/oly/listing-type",
  },
  {
    id: 2,
    text: "Oly Properties",
    image: "/properties.jpg",
    link: "/dashboard/create-listing/oly-properties/select-category",
  },
  {
    id: 3,
    text: "Oly Auto",
    image: "/auto.jpg",
    link: "/dashboard/create-listing/oly-auto/listing-type",
  },
  {
    id: 4,
    text: "Oly Services",
    image: "/services.jpg",
    link: "/dashboard/create-listing/oly-services/select-category",
  },
  {
    id: 5,
    text: "Oly Hiring",
    image: "/hiring.jpg",
    link: "/dashboard/create-listing/oly-hiring/select-category",
  },
];

interface SiteSelectionProps {
  onSelect?: (
    site: "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services",
  ) => void;
}

const SiteSelection = ({ onSelect }: SiteSelectionProps) => {
  const { isLargeDesktop, isSmallDesktop, currentScreenSize } =
    useBreakpointStore();
  const siteMap: Record<
    string,
    "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services"
  > = {
    Oly: "oly",
    "Oly Properties": "oly-properties",
    "Oly Auto": "oly-auto",
    "Oly Services": "oly-services",
    "Oly Hiring": "oly-hiring",
  };

  const handleSiteClick = (siteText: string) => {
    if (onSelect) {
      const site = siteMap[siteText];
      if (site) {
        onSelect(site);
      } else {
        console.error(`Site "${siteText}" not found in siteMap`);
      }
    }
  };

  let marginRight = "";
  switch (true) {
    case isLargeDesktop:
      marginRight = currentScreenSize < 1570 ? "20rem" : "12.5rem";
      break;
    case isSmallDesktop:
      marginRight = currentScreenSize < 1340 ? "27rem" : "18.75rem";
      break;
    default:
      marginRight = "12.5rem";
      break;
  }




  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select Site</h1>
      <div className={styles.swiperContainer} 
   
      >
        <Swiper
          className={styles.sitesContainer}
            slidesPerView={'auto'}
          spaceBetween={30}
          
        >
          {sites.map((site) => (
            <SwiperSlide key={site.id} className={styles.swiperSlide}>
              {onSelect ? (
                <div onClick={() => handleSiteClick(site.text)}>
                  <ClassifiedLink text={site.text} image={site.image} />
                </div>
              ) : (
                <Link href={site.link}>
                  <ClassifiedLink text={site.text} image={site.image} />
                </Link>
              )}
            </SwiperSlide>
          ))}

          <div className={styles.navButtons} style={{ marginRight }}>
            <NavButtons />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default SiteSelection;
