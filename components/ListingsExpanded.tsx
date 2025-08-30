"use client";
import styles from "./ListingsExpanded.module.scss";
import { useEffect, useState } from "react";
import { urlFor } from "@/lib/client";
import Link from "next/link";
import { richTextLength } from "@/lib/richTextLength";
import useSidebarStore from "@/store/useSidebarStore";
import { useInView } from "react-intersection-observer";
import ListingCard from "./cards/ListingCard";

import { ListingsQueryResult } from "@/sanity.types";

export type ListingsExpandedProps = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  listings: ListingsQueryResult;
  isDeletable: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  isDashboard: boolean;
  isFeed?: boolean;
  limit: number;
  page?: number;
  sortOrder: "asc" | "desc";
  sortBy: string;
};

type Image = {
  alt: string | null;
  id: string | null;
  url: string | null;
  width: number | null;
  height: number | null;
  aspectRatio: number | null;
};
const ListingsExpanded = (props: ListingsExpandedProps) => {
  const {
    category,
    listings,
    isDeletable,
    isDashboard,
    checkedColour,
    hoverColour,
    checkedHovered,

  } = props;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);



  return (
    <ul className={styles.listingsContainer}>
      {listings?.map((listing: any, index: number) => {
        const { _id, slug, images, title, description, price, user } = listing;
        const { text } = description[0]?.children[0];
        const imageUrls = images?.map((image: Image) => image.url);
        const aspectRatios = images?.map((image: Image) => image.aspectRatio);

   
        return (
          <li key={listing._id}>
            <Link href="/">
              <div className={styles.expandedCardContainer}>
                <ListingCard
                  category={category}
                  slug={slug?.current}
                  listing={listing}
                  index={index}
                  id={_id}
                  cardType="expanded"
                  avatar={user?.profileImage}
                  imageUrls={imageUrls}
                  aspectRatios={aspectRatios}
                  title={title}
                  price={price}
                  description={text}
                  isDeletable={isDeletable}
                  isDashboard={isDashboard}
                  checkedColour={checkedColour}
                  hoverColour={hoverColour}
                  checkedHovered={checkedHovered}
                  postAge={listing?.postedOn}
                  city={user?.cityAbbr}
                  suburb={user?.suburb}
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ListingsExpanded;
