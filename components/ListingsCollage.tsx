import { useEffect, useState } from "react";
import AdCard from "@/components/cards/AdCard";
import Masonry from "react-masonry-css";
import useSidebarStore from "@/store/useSidebarStore";
import Link from "next/link";
import { richTextLength } from "@/lib/richTextLength";
import { useFetchAdStore } from "@/store/useFetchStore";
import { getImageFilesById } from "@/sanity/actions/getImageFilesById";
import { ImageFile } from "@/sanity/Types/ImageFile";
import { Image as SanityImage } from "sanity";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Ad } from "@/sanity/Types/Ad";
import styles from "./ListingsCollage.module.scss";
import Spinner from "./Spinner";
import PropertyAdCard from "@/app/(oly-properties)/properties/components/cards/PropertyAdCard";

type ListingsCollageProps = {
  category: "all" | "property" | "vehicle" | "service" | "job";
  images: string[][];
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

const ListingsCollage = ({
  category,
  images,
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
          {category === "all" && (
            // <AdCard
            //   ad={ad}
            //   id={ad._id}
            //   index={index}
            //   cardType="box"
            //   cardSize={cardSize}
            //   images={images[index]}
            //   title={ad.title}
            //   price={ad.price}
            //   aspectRatios={aspectRatios}
            //   description={
            //     Array.isArray(ad.description)
            //       ? richTextLength(ad.description, 400)
            //       : ad.description
            //   }
            //   isDeletable={isDeletable}
            //   isDashboard={isDashboard}
            //   isFeed={isSidebarOpen}
            //   checkedColour={checkedColour}
            //   hoverColour={hoverColour}
            //   checkedHovered={checkedHovered}
            // />
            <AdCard
              ad={{
                _id: "123",
                images: ['/listing_images/landscape/1.jpg'],
                title: "Sample Ad",
                description: 'This is a sample ad description.',
                price: 1000,
                postedOn: "2023-01-01",
                avatar: "avatar.jpg",
                suburb: "Downtown",
                city: "Metropolis",
              }}
              index={0}
              cardType="box"
              cardSize="standard"
              isFeed={true}
              isDashboard={false}
              isDeletable={true}
            />
          )}
          {category === "property" && (
            <PropertyAdCard
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

  if (isClient) {
    return (
      <section className={styles.container}>
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
        <div ref={ref} className={styles.loading}>
          {loading && hasMore ? <Spinner /> : null}
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default ListingsCollage;
