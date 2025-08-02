"use client";
import styles from "./PaginatedListingsCollage.module.scss";
import { useEffect, useState } from "react";
import AdCard from "@/components/cards/AdCard";
import Masonry from "react-masonry-css";
import useSidebarStore from "@/store/useSidebarStore";
import Link from "next/link";
import { richTextLength } from "@/lib/richTextLength";
import { useFetchAdStorePaginated } from "@/store/useFetchStore";
import { getImageFilesById } from "@/sanityTemp/actions/getImageFilesById";
import { ImageFile } from "@/sanityTemp/Types/ImageFile";
import { Image as SanityImage } from "sanity";
import Image from "next/image";

export type PaginatedListingsCollageProps = {
  isDeletable?: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  isDashboard: boolean;
  isFeed?: boolean;
  cardSize?: "standard" | "small" | "large";
  limit: number;
  page?: number;
  sortOrder: "asc" | "desc";
  sortBy: string;
};

const PaginatedListingsCollageClient = ({
  isDeletable = false,
  checkedColour,
  hoverColour,
  checkedHovered,
  isDashboard,
  isFeed,
  cardSize,
  limit,
  page = 1,
  sortOrder,
  sortBy,
}: PaginatedListingsCollageProps) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const { ads, fetchAds, imageUrls, hasMore } = useFetchAdStorePaginated();
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [adImages, setAdImages] = useState<SanityImage[]>([]);
  const [pageNumber, setPageNumber] = useState(page);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (isClient) {
        await fetchAds({
          limit: limit,
          page: pageNumber,
          offset: 0,
          sortBy: sortBy,
          sortOrder: sortOrder,
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [isClient, pageNumber]);

  const handleNextPage = () => setPageNumber((prev) => prev + 1);
  const handlePrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    const getImageIds = async () => {
      if (adImages && adImages.length > 0) {
        const imageRefs = adImages.map((image) => image._ref);
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

  const breakpointColumnsObj = {
    default: 4,
    2500: isSidebarOpen || isDashboard ? 4 : 5,
    800: 2,
    639: 1,
  };

  const cards = ads.map((ad, index) => {
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
      <Link href={`/${ad.slug}`} key={ad._id} className={styles.cardContainer}>
        <div className={styles.card}>
          <AdCard
            ad={ad}
            id={ad._id}
            index={index}
            cardType="box"
            cardSize={cardSize}
            images={urls}
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
    <section className={styles.container}>
      {loading && hasMore ? (
        <div className={styles.loading}>
          <Image
            src="/spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className={styles.spinner}
          />
        </div>
      ) : (
        <Masonry
          className={styles.listingsContainer}
          breakpointCols={breakpointColumnsObj}
          columnClassName={styles.listingsContainerColumns}
          style={{
            maxWidth: isDashboard || isFeed ? "59.625rem" : "95vw",
          }}
        >
          {cards}
        </Masonry>
      )}
      <div className={styles.paginationControls}>
        <button onClick={handlePrevPage} disabled={pageNumber === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={loading}>
          Next
        </button>
      </div>
    </section>
  );
};

export default PaginatedListingsCollageClient;
