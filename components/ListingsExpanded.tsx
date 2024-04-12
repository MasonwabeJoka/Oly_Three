import styles from "./ListingsExpanded.module.scss";
import { useEffect, useState } from "react";
import { listingsData } from "@/data/ListingsData";
import { urlFor } from "@/lib/client";
import { fetchAds } from "@/sanity/sanity_utils/sanityServerActions";
import { Ad } from "@/sanity/Types/Ad";
import { fetchListings } from "@/sanity/sanity_utils/tempActions";
import AdCard from "./AdCard";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "sanity";
// import { TQueryValidator } from "@/lib/validations/query-validator";
// import { getAds } from "@/lib/serverActions/getAds";
import useSidebarStore from "@/store/useSidebarStore";

type ListingsExpandedProps = {
  isDeletable: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  isDashboard: boolean;
  isFeed?: boolean;
  query: TQueryValidator;
  avatars: string[];
};
const ListingsExpanded = ({
  isDeletable,
  isDashboard,
  isFeed,
  checkedColour,
  hoverColour,
  checkedHovered,
  query,
  avatars,
}: ListingsExpandedProps) => {

  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  // const FALLBACK_LIMIT = 10;
  // const data = getAds(query, FALLBACK_LIMIT)
  return (
    <div className={styles.listingsContainer}>
      {fetchListings?.map((ad, index) => {
        return (
          <Link href={`/listings/${ad?.slug}`} key={ad?.id}>
            <div className={styles.expandedCardContainer} >
              <AdCard
                slug={ad?.slug}
                ad={ad}
                index={index}
                id={ad?.id}
                cardType="expanded"
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
          </Link>
        );
      })}
    </div>
  );
};

export default ListingsExpanded;
