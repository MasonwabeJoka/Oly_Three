"use client";
import { useEffect, useState } from "react";
import ListingCard from "@/components/cards/ListingCard";
import Masonry from "react-masonry-css";
import useSidebarStore from "@/store/useSidebarStore";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import styles from "./ListingsCollage.module.scss";
import LoadingSpinner from "./LoadingSpinner";
import { ListingsQueryResult } from "@/sanity.types";

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

const ListingsCollage = ({
  category,
  listings,
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


  const cards = listings?.map((listing, index) => {
    const { _id, slug, images, title, description, price, user } = listing;
    const text = description?.[0]?.children?.[0]?.text ?? "";
    const slugCurrent = slug?.current;
    const imageUrls =
      images
        ?.map((image: Image, index) => image.url)
        .filter((url): url is string => url !== null) ?? [];
    const aspectRatios = images?.map((image: any) => image.aspectRatio);

    return (
      <div key={listing._id} className={styles.cardContainer}>
        <Link href={`/listings/${slugCurrent}`}>
          <div className={styles.card}>
          {category === "all" && (
            <ListingCard
              category={category}
              slug={slugCurrent}
              listing={listing}
              index={index}
              id={_id}
              cardType="box"
              imageUrls={imageUrls}
              aspectRatios={aspectRatios}
              title={title || undefined}
              price={price || undefined}
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
              slug={slugCurrent}
              listing={listing}
              index={index}
              id={_id}
              cardType="box"
              imageUrls={imageUrls}
              aspectRatios={aspectRatios}
              title={title || undefined}
              price={price || undefined}
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

export default ListingsCollage;
