import styles from "./ListingsExpanded.module.scss";
import { useEffect, useState } from "react";
import { listingsData } from "@/data/ListingsData";
import { urlFor } from "@/lib/client";
import { fetchAds } from "@/sanity/actions/fetchAds";
import { Ad } from "@/sanity/Types/Ad";
import { fetchListings } from "@/sanity/sanity_utils/tempActions";
import multipleImages from "@/data/multipleImages";
import AdCard from "./cards/AdCard";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "sanity";
import { richTextLength } from "@/lib/richTextLength";
import useSidebarStore from "@/store/useSidebarStore";
import { useFetchAdStore } from "@/store/useFetchStore";
import { useInView } from "react-intersection-observer";
import { ImageFile } from "@/sanity/Types/ImageFile";
import { getImageFilesById } from "@/sanity/actions/getImageFilesById";
type ListingsExpandedProps = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  images: string[][];
  isDeletable: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  isDashboard: boolean;
  isFeed?: boolean;
  avatars: string[];
  limit: number;
  page?: number;
  sortOrder: "asc" | "desc";
  sortBy: string;
};
const ListingsExpanded = ({
  category,
  images,
  isDeletable = false,
  isDashboard,
  isFeed,
  checkedColour,
  hoverColour,
  checkedHovered,
  avatars,
  limit,
  page = 1,
  sortOrder,
  sortBy,
}: ListingsExpandedProps) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const { ads, fetchAds, imageUrls, hasMore } = useFetchAdStore();
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [pageNumber, setPageNumber] = useState(page);
  const [adImages, setAdImages] = useState<SanityImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [tempAspectRatios, setTempAspectRatios] = useState<number[][]>([]);
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
      }); // Fetch ads with parameters
      setLoading(false);
    };

    fetchData();
  }, [pageNumber, fetchAds]);

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

  useEffect(() => {
    fetchAspectRatios();
  }, []);

  const getTempAspectRatios = async () => {
    const tempAspectRatios = await Promise.all(
      multipleImages.map(async (item) => {
        const aspectRatios = await Promise.all(
          item.images.map(async (imageUrl) => {
            try {
              const img = new Image();
              img.src = imageUrl;
              await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
              });
              return img.naturalWidth / img.naturalHeight;
            } catch (error) {
              console.error(`Failed to load image: ${imageUrl}`, error);
              return 1; // Fallback aspect ratio (e.g., 1 for square)
            }
          })
        );
        return aspectRatios;
      })
    );
    return tempAspectRatios;
  };

  const fetchAspectRatios = async () => {
    const tempAspectRatios = await getTempAspectRatios();
    console.log("Aspect Ratios:", tempAspectRatios);
    setTempAspectRatios(tempAspectRatios);
  };

  return (
    <div className={styles.listingsContainer}>
      {ads?.map((ad, index) => {
        // Filter out undefined values from aspectRatios
        const aspectRatios = ad.images
          ?.map((image) => image.aspectRatio)
          .filter((ratio): ratio is number => ratio !== undefined);

        return (
          <Link href="/" key={index}>
            {/* <Link href={`/listings/${ad?.slug}`} key={index}> */}
            <div className={styles.expandedCardContainer}>
              <AdCard
                slug={ad?.slug}
                ad={ad}
                index={index}
                id={ad?._id}
                cardType="expanded"
                // images={imageUrls}
                images={images[index]}
                aspectRatios={tempAspectRatios && tempAspectRatios[index]}
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
                postAge={ad?.postedOn}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ListingsExpanded;
