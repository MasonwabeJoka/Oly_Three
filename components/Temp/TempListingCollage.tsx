"use client";
import { useEffect, useState } from "react";
import ListingCard from "@/components/cards/ListingCard";
import Masonry from "react-masonry-css";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import styles from "./../ListingsCollage.module.scss";
import { ListingsQueryResult } from "@/sanity.types";
import LoadingSpinner from "../LoadingSpinner";
import {listingsData} from "@/data/ListingsData";

export type ListingsCollageProps = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  listings: ListingsQueryResult;
  isDeletable: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  isDashboard: boolean;
  cardSize?: "standard" | "small" | "large";
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

const TempListingsCollage = ({
  category,
//   listings,
  isDeletable,
  checkedColour,
  hoverColour,
  checkedHovered,
  isDashboard,
  cardSize,
}: ListingsCollageProps) => {

  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
  });
  useEffect(() => {
    setIsClient(true);
  }, []);


  if (!isClient) {
    return null;
  }

  const breakpointColumnsObj = {
    default: 4,
    2500: isDashboard ? 3 : 5,
    1650: 4,
    1382: 3,
    1025: 2,
    650: 1,
  };


  const cards = listingsData.slice(0, 30)?.map((listing, index) => {
    const { _id,  imageUrls, title, text, price, user } = listing;
  
   
    const aspectRatios = imageUrls.map((url) => {
  const match = url.match(/\/(\d+)\/(\d+)/);
  if (!match) return null; // handle unexpected URLs
  const width = Number(match[1]);
  const height = Number(match[2]);
  return width / height;
});


    return (
      <div key={_id} className={styles.cardContainer}>
        <Link href={`/listings/${_id}`}>
          <div className={styles.card}>
          {category === "all" && (
            <ListingCard
              category={category}
              slug={`${_id}`}
              listing={listing}
              index={index}
              id={_id}
              cardType="box"
              imageUrls={imageUrls}
              aspectRatios={aspectRatios as number[]}
              title={title}
              price={price}
              cardSize={cardSize}
              description={text}
              isDeletable={isDeletable}
              isDashboard={isDashboard}
              checkedColour={checkedColour}
              hoverColour={hoverColour}
              checkedHovered={checkedHovered}
            />
          )}
          {category === "property" && (
            <ListingCard
              category={category}
              slug={`${_id}`}
              listing={listing}
              index={index}
              id={_id}
              cardType="box"
              imageUrls={imageUrls}
              aspectRatios={aspectRatios as number[]}
              title={title}
              price={price}
              cardSize={cardSize}
              description={text}
              isDeletable={isDeletable}
              isDashboard={isDashboard}
              checkedColour={checkedColour}
              hoverColour={hoverColour}
              checkedHovered={checkedHovered}
            />
          )}
          </div>
        </Link>
      </div>
    );
  });

  return (
    <>
      {category === "all" && (
        <>
          <Masonry
            className={styles.listingsContainer}
            breakpointCols={breakpointColumnsObj}
            columnClassName={styles.listingsContainerColumns}
            style={{
              maxWidth: isDashboard ? "59.625rem" : "95vw",
            }}
          >
            {cards || []}
          </Masonry>
          <div ref={ref} className={styles.loading}>
            {loading ? <LoadingSpinner /> : null}
            {/* {loading && hasMore ? <LoadingSpinner /> : null} */}
          </div>
        </>
      )}
      {category === "property" && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              columnGap: "20px",
            }}
          >
            {cards || []}
          </div>
          <div ref={ref} className={styles.loading}>
            {loading ? <LoadingSpinner /> : null}
          </div>
        </>
      )}
    </>
  );
};

export default TempListingsCollage;
