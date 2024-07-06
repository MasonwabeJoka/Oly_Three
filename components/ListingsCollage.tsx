import styles from "./ListingsCollage.module.scss";
import { useEffect, useState } from "react";
import AdCard from "@/components/AdCard";
import Masonry from "react-masonry-css";
import { fetchAds } from "@/sanity/actions/adsActions";
import { Ad } from "@/sanity/Types/Ad";
import useSidebarStore from "@/store/useSidebarStore";
import Link from "next/link";
import { richTextLength } from "@/lib/richTextLength";
import { useFetchAdStore } from "@/store/adsData";

type ListingsCollageProps = {
  isDeletable?: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  isDashboard: boolean;
  isFeed?: boolean;
  cardSize?: "standard" | "small" | "large";
};

const ListingsCollage = ({
  isDeletable = false,
  checkedColour,
  hoverColour,
  checkedHovered,
  isDashboard,
  isFeed,
  cardSize,
}: ListingsCollageProps) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const { adsData, fetchAds, imageUrls } = useFetchAdStore();

  useEffect(() => {
    fetchAds(); // Fetch ads when the component mounts
  }, [fetchAds]);

  const breakpointColumnsObj = {
    default: 3,
    2500: isSidebarOpen || isDashboard ? 3 : 4,
    800: 2,
    639: 1,
  };

  // Convert array to JSX items
  const cards = adsData.map((ad, index) => {

    // Filter out undefined values from aspectRatios
    const aspectRatios = ad.images?.map((image) => image.aspectRatio).filter((ratio): ratio is number => ratio !== undefined);

    return (
      <Link href={`/${ad.slug}`}>
        <div className={styles.card} key={ad._id}>
          <AdCard
            ad={ad}
            id={ad._id}
            index={index}
            cardType="box"
            cardSize={cardSize}
            images={imageUrls}
            title={ad.title}
            price={ad.price}
            aspectRatios={aspectRatios}
            description={
              Array.isArray(ad.description)
                ? richTextLength(ad.description, 400)
                : ad.description
            }
            isDeletable={isDeletable}
            isDashboard={isDashboard}
            isFeed={isSidebarOpen}
            checkedColour={checkedColour}
            hoverColour={hoverColour}
            checkedHovered={checkedHovered}
          />
        </div>
      </Link>
    );
  });

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

export default ListingsCollage;
