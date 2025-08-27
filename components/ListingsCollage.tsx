"use client";
import { useEffect, useState } from "react";
import ListingCard from "@/components/cards/ListingCard";
import Masonry from "react-masonry-css";
import useSidebarStore from "@/store/useSidebarStore";
import Link from "next/link";
import { richTextLength } from "@/lib/richTextLength";
import { useFetchAdStore } from "@/store/useFetchStore";
import { getImageFilesById } from "@/sanityTemp/actions/getImageFilesById";
import { useInView } from "react-intersection-observer";
import styles from "./ListingsCollage.module.scss";
import LoadingSpinner from "./LoadingSpinner";
import { ImageFile } from "@/sanityTemp/Types/ImageFile";
import { Image as SanityImage } from "sanity";

export type ListingsCollageProps = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  listings: any;
  images: string[][];
  isDeletable: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  isDashboard: boolean;
  cardSize?: "standard" | "small" | "large";
  limit: number;
  page?: number;
  sortOrder: "asc" | "desc";
  sortBy: string;
};

const ListingsCollage = ({
  category,
  listings,
  // images,
  isDeletable,
  checkedColour,
  hoverColour,
  checkedHovered,
  isDashboard,
  cardSize,
  limit,
  page,
  sortOrder,
  sortBy,
}: ListingsCollageProps) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  // const { listings, fetchAds, imageUrls, hasMore } = useFetchAdStore();
  // const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  // const [adImages, setAdImages] = useState<SanityImage[]>([]);
  const [pageNumber, setPageNumber] = useState(page);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
  });
  // const {_id, description, images, postedOn, price, slug, title, user } = listings
  useEffect(() => {
    setIsClient(true);
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     await fetchAds({
  //       limit: limit,
  //       page: pageNumber,
  //       offset: 0,
  //       sortBy: sortBy,
  //       sortOrder: sortOrder,
  //     });
  //     setLoading(false);
  //   };

  //   if (isClient) fetchData();
  // }, [pageNumber, fetchAds, isClient, limit, sortBy, sortOrder]);

  useEffect(() => {
    if (inView && hasMore) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  // useEffect(() => {
  //   const getImageIds = async () => {
  //     if (adImages && adImages.length > 0) {
  //       const imageRefs = adImages.map((image) => image?._ref);
  //       const imageFilesByIds = await getImageFilesById(imageRefs as string[]);
  //       setImageFiles(imageFilesByIds);
  //     }
  //   };

  //   getImageIds();
  // }, [adImages]);

  // useEffect(() => {
  //   if (listings && Array.isArray(listings)) {
  //     const adImagesArray = listings.flatMap((listing) => listing.images);
  //     setAdImages(adImagesArray);
  //   }
  // }, [listings]);

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
    const { _id, slug, images, title, description, price } = listing;
    
    console.log("IMAGES ARRAY", images);

    return (
      <Link
        href={`listings/${listing.slug}`}
        key={listing._id}
        className={styles.cardContainer}
      >
        <div className={styles.card}>
          {category === "all" && (
            <ListingCard
              category={category}
              slug={slug.current}
              listing={listing}
              index={index}
              id={_id}
              cardType="box"
              images={images[index].url}
              aspectRatios={images[index]?.aspectRatio}
              title={title}
              price={price}
              cardSize={cardSize}
              description={description}
              // description={
              //   Array.isArray(listing.description)
              //     ? richTextLength(listing.description, 400)
              //     : listing.description
              // }
              isDeletable={isDeletable}
              isDashboard={isDashboard}
              // isFeed={isSidebarOpen}
              checkedColour={checkedColour}
              hoverColour={hoverColour}
              checkedHovered={checkedHovered}
            />
          )}
          {category === "property" && (
            <ListingCard
              category={category}
              slug={slug.current}
              listing={listing}
              index={index}
              id={_id}
              cardType="box"
              images={images[index].url}
              aspectRatios={images[index]?.aspectRatio}
              title={title}
              price={price}
              cardSize={cardSize}
              description={description}
              // description={
              //   Array.isArray(listing.description)
              //     ? richTextLength(listing.description, 400)
              //     : listing.description
              // }
              isDeletable={isDeletable}
              isDashboard={isDashboard}
              // isFeed={isSidebarOpen}
              checkedColour={checkedColour}
              hoverColour={hoverColour}
              checkedHovered={checkedHovered}
            />
          )}
        </div>
      </Link>
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
