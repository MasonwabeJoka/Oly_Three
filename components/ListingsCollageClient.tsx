"use client";
import { useEffect, useState } from "react";
import AdCard from "@/components/cards/AdCard";
import Masonry from "react-masonry-css";
import useSidebarStore from "@/store/useSidebarStore";
import Link from "next/link";
import { richTextLength } from "@/lib/richTextLength";
import { useFetchAdStore } from "@/store/useFetchStore";
import { getImageFilesById } from "@/sanityTemp/actions/getImageFilesById";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import styles from "./ListingsCollageClient.module.scss";
import LoadingSpinner from "./LoadingSpinner";
import { ImageFile } from "@/sanityTemp/Types/ImageFile";
import { Image as SanityImage } from "sanity";

export type ListingsCollageProps = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  images: string[][];
  isDeletable: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  isDashboard: boolean;
  cardSize?: "standard" | "small" | "large";
  limit: number;
  page: number;
  sortOrder: "asc" | "desc";
  sortBy: string;
};

const ListingsCollageClient = ({
  category,
  images,
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
  const { ads, fetchAds, imageUrls, hasMore } = useFetchAdStore();
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [adImages, setAdImages] = useState<SanityImage[]>([]);
  const [pageNumber, setPageNumber] = useState(page);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchAds({
        limit: limit,
        page: pageNumber,
        offset: 0,
        sortBy: sortBy,
        sortOrder: sortOrder,
      });
      setLoading(false);
    };

    if (isClient) fetchData();
  }, [pageNumber, fetchAds, isClient, limit, sortBy, sortOrder]);

  useEffect(() => {
    if (inView && hasMore) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    const getImageIds = async () => {
      if (adImages && adImages.length > 0) {
        const imageRefs = adImages.map((image) => image?._ref);
        const imageFilesByIds = await getImageFilesById(imageRefs as string[]);
        setImageFiles(imageFilesByIds);
      }
    };

    getImageIds();
  }, [adImages]);

  useEffect(() => {
    if (ads && Array.isArray(ads)) {
      const adImagesArray = ads.flatMap((ad) => ad.images);
      setAdImages(adImagesArray);
    }
  }, [ads]);

  if (!isClient) {
    return null;
  }

  const breakpointColumnsObj = {
    default: 4,
    2500: isDashboard ? 3 : 5,
    1650: 4,
    1280: 3,
    960: 2,
    650: 1,
  };

  const cards = ads?.map((ad, index) => {
    const adImages = Array.isArray(ad.images) ? ad.images : [];
    const aspectRatios = adImages
      .map((image) => image.aspectRatio)
      .filter((ratio): ratio is number => typeof ratio === "number");

    const urls: string[] = imageFiles
      .map((imageFile) => {
        const matchingImage = adImages.find(
          (img) => img._ref === imageFile._id
        );
        return matchingImage ? imageFile.image.url : undefined;
      })
      .filter((url): url is string => typeof url === "string");

    return (
      <Link
        // href="/"
        href={`listings/${ad.slug}`}
        key={ad._id}
        className={styles.cardContainer}
      >
        <div className={styles.card}>
          {category === "all" && (
            <AdCard
              category={category}
              ad={ad}
              id={ad._id}
              index={index}
              cardType="box"
              cardSize={cardSize}
              images={images[index]}
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
          )}
          {category === "property" && (
            <AdCard
              category={category}
              ad={ad}
              id={ad._id}
              index={index}
              cardType="box"
              cardSize={cardSize}
              images={images[index]}
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
            {loading && hasMore ? <LoadingSpinner /> : null}
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
            {loading && hasMore ? <LoadingSpinner /> : null}
          </div>
        </>
      )}
    </>
  );
};

export default ListingsCollageClient;
