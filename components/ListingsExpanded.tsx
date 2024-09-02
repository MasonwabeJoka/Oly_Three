import styles from "./ListingsExpanded.module.scss";
import { useEffect, useState } from "react";
import { listingsData } from "@/data/ListingsData";
import { urlFor } from "@/lib/client";
import { fetchAds } from "@/sanity/actions/fetchAds";
import { Ad } from "@/sanity/Types/Ad";
import { fetchListings } from "@/sanity/sanity_utils/tempActions";
import AdCard from "./AdCard";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "sanity";
import { richTextLength } from "@/lib/richTextLength";
import useSidebarStore from "@/store/useSidebarStore";
import { useFetchAdStore } from "@/store/useFetchStore";

type ListingsExpandedProps = {
  isDeletable: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  isDashboard: boolean;
  isFeed?: boolean;
  avatars: string[];
};
const ListingsExpanded = ({
  isDeletable = false,
  isDashboard,
  isFeed,
  checkedColour,
  hoverColour,
  checkedHovered,
  avatars,
}: ListingsExpandedProps) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const { adsData, fetchAds, imageUrls } = useFetchAdStore();

  useEffect(() => {
    fetchAds(); // Fetch ads when the component mounts
  }, [fetchAds]);

  return (
    <div className={styles.listingsContainer}>
      {adsData?.map((ad, index) => {
        // Filter out undefined values from aspectRatios
        const aspectRatios = ad.images
          ?.map((image) => image.aspectRatio)
          .filter((ratio): ratio is number => ratio !== undefined);

        return (
          <Link href={`/listings/${ad?.slug}`} key={ad?._id}>
            <div className={styles.expandedCardContainer}>
              <AdCard
                slug={ad?.slug}
                ad={ad}
                index={index}
                id={ad?._id}
                cardType="expanded"
                images={imageUrls}
                aspectRatios={aspectRatios}
                title={ad?.title}
                price={ad?.price}
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
      })}
    </div>
  );
};

export default ListingsExpanded;
