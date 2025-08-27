"use client";
import styles from "./ListingsExpanded.module.scss";
import { useEffect, useState } from "react";
import { urlFor } from "@/lib/client";
import Link from "next/link";
import { richTextLength } from "@/lib/richTextLength";
import useSidebarStore from "@/store/useSidebarStore";
import { useFetchAdStore } from "@/store/useFetchStore";
import { useInView } from "react-intersection-observer";
import { ImageFile } from "@/sanityTemp/Types/ImageFile";
import { getImageFilesById } from "@/sanityTemp/actions/getImageFilesById";
import ListingCard from "./cards/ListingCard";
import multipleImages from "@/data/multipleImages";
import { Ad, SanityImage } from "@/sanityTemp/Types/Ad";

export type ListingsExpandedProps = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  listings: any;
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

const ListingsExpanded = (props: ListingsExpandedProps) => {
  const {
    category,
    listings,
    isDeletable,
    isDashboard,
    checkedColour,
    hoverColour,
    checkedHovered,
    limit,
    page = 1,
    sortOrder,
    sortBy,
  } = props;
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const { ads, fetchAds, imageUrls, hasMore } = useFetchAdStore();
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [pageNumber, setPageNumber] = useState(page);
  const [adImages, setAdImages] = useState<SanityImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [tempAspectRatios, setTempAspectRatios] = useState<number[][]>([]);
  const { ref, inView } = useInView({ triggerOnce: false });

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
  //   fetchData();
  // }, [pageNumber, fetchAds]);

  useEffect(() => {
    if (inView && hasMore) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  // useEffect(() => {
  //   const getImageIds = async () => {
  //     if (adImages && adImages.length > 0) {
  //       const imageRefs = adImages.map((image: SanityImage) => image?._ref);
  //       const imageFilesByIds = await getImageFilesById(imageRefs as string[]);
  //       setImageFiles(imageFilesByIds);
  //     }
  //   };
  //   getImageIds();
  // }, [adImages]);

  // useEffect(() => {
  //   if (ads && Array.isArray(ads)) {
  //     const adImagesArray = ads.flatMap((listing: Ad) => listing.images || []);
  //     setAdImages(adImagesArray);
  //   }
  // }, [ads]);

  // useEffect(() => {
  //   fetchAspectRatios();
  // }, []);

  // const getTempAspectRatios = async () => {
  //   const tempAspectRatios = await Promise.all(
  //     multipleImages.map(async (item) => {
  //       const aspectRatios = await Promise.all(
  //         item.images.map(async (imageUrl: string) => {
  //           try {
  //             const img = new window.Image();
  //             img.src = imageUrl;
  //             await new Promise((resolve, reject) => {
  //               img.onload = resolve;
  //               img.onerror = reject;
  //             });
  //             return img.naturalWidth / img.naturalHeight;
  //           } catch (error) {
  //             console.error(`Failed to load image: ${imageUrl}`, error);
  //             return 1;
  //           }
  //         })
  //       );
  //       return aspectRatios;
  //     })
  //   );
  //   return tempAspectRatios;
  // };

  // const fetchAspectRatios = async () => {
  //   const tempAspectRatios = await getTempAspectRatios();
  //   setTempAspectRatios(tempAspectRatios);
  // };

  return (
    <ul className={styles.listingsContainer}>
      {listings?.map((listing: any, index: number) => {
        const { _id, slug, images, title, description, price, user } = listing;
        const imageUrls = images.map((image) => image.url);
        const aspectRatios = images.map((image) => image.aspectRatio);

        // const aspectRatios = (listing.images || [])
        //   .map((image: SanityImage) => image.aspectRatio)
        //   .filter(
        //     (ratio: number | undefined): ratio is number => ratio !== undefined
        //   );
        return (
          <li key={listing._id}>
            <Link href="/">
              <div className={styles.expandedCardContainer}>
                <ListingCard
                  category={category}
                  slug={slug.current}
                  listing={listing}
                  index={index}
                  id={_id}
                  cardType="expanded"
                  avatar={user?.avatar?.url}
                  imageUrls={imageUrls}
                  aspectRatios={aspectRatios}
                  title={title}
                  price={price}
                  // description={
                  //   Array.isArray(listing.description)
                  //     ? richTextLength(listing.description, 400)
                  //     : listing.description
                  // }
                  isDeletable={isDeletable}
                  isDashboard={isDashboard}
                  checkedColour={checkedColour}
                  hoverColour={hoverColour}
                  checkedHovered={checkedHovered}
                  postAge={listing?.postedOn}
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
