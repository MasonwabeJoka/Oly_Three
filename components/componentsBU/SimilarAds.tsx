import AdCard from "@/components/AdCard";
// import { getAds } from "@/lib/serverActions/getAds";
import { TQueryValidator } from "@/lib/validations/query-validator";
import { Ad } from "@/payload.types";
import useSidebarStore from "@/store/useSidebarStore";
import { useState } from "react";
import Masonry from "react-masonry-css";
import styles from "./SimilarAds.module.scss";


type SimilarAdsProps = {
  isDeletable: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  isDashboard: boolean;
  isFeed?: boolean;
  query: TQueryValidator;
  cardSize: "standard" | "large" | "small";
};

const FALLBACK_LIMIT = 10;

const SimilarAds = ({
  isDeletable,
  checkedColour,
  hoverColour,
  checkedHovered,
  isDashboard,
  isFeed,
  query,
  cardSize,
}: SimilarAdsProps) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const data = getAds(query, FALLBACK_LIMIT)

  const cards = data?.map((ad, index) => {
    
    return (
      <div className={styles.card} key={index}>
        <AdCard
          slug={ad?.slug}
          ad={ad}
          index={index}
          id={ad?.id}
          cardType="box"
          cardSize={cardSize}
          images={ad?.images}
          title={ad?.title}
          price={ad?.price}
          description={ad?.description}
          isDeletable={isDeletable}
          isDashboard={isDashboard}
          isFeed={isSidebarOpen}
          checkedColour={checkedColour}
          hoverColour={hoverColour}
          checkedHovered={checkedHovered}
        />
      </div>
    );
  });

  const breakpointColumnsObj = {
    default: 3,
    2500: isSidebarOpen || isDashboard ? 3 : 4,
    800: 2,
    639: 1,
  };

  return (
    <Masonry
      className={styles.listingsContainer}
      breakpointCols={breakpointColumnsObj}
      columnClassName={styles.listingsContainerColumns}
      style={{
        maxWidth: isDashboard || isFeed ? "59.625rem" : "81.25rem",
      }}
    >
      {cards}
    </Masonry>
  );
};

export default SimilarAds;
