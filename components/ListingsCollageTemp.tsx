import styles from "./ListingsCollage.module.scss";
import { useEffect, useState } from "react";
import AdCard from "@/components/AdCard";
import Masonry from "react-masonry-css";
import useSidebarStore from "@/store/useSidebarStore";
import Link from "next/link";
import { richTextLength } from "@/lib/richTextLength";
import { useFetchAdStore } from "@/store/adsData";
import { getImageFilesById } from "@/sanity/actions/getImageFilesById";
import { ImageFile } from "@/sanity/Types/ImageFile";
import { Image as SanityImage } from "sanity";
import Image from "next/image";
import {useInView} from "react-intersection-observer"
import { Ad } from "@/sanity/Types/Ad";

type ListingsCollageProps = {
  isDeletable?: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  isDashboard: boolean;
  isFeed?: boolean;
  cardSize?: "standard" | "small" | "large";
};

const ListingsCollage = ({
  isDeletable = false,
  checkedColour,
  hoverColour,
  checkedHovered,
  isDashboard,
  isFeed,
  cardSize,
}: ListingsCollageProps) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const { ads, fetchAds, imageUrls } = useFetchAdStore();
  const[fetchedAds, setFetchedAds] = useState<Ad[]>([]);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [adImages, setAdImages] = useState<SanityImage[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isClient, steIsClient] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  console.log({fetchedAds});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchAds({
        limit: 50,
        page: page,
        offset: 0,
        sortOrder: "desc",
        sortBy: "postedOn",
      }); // Fetch ads with parameters
      setLoading(false);
    };

    fetchData();
  }, [page]);
  

  // useEffect(() => {
  //   if (inView) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // }, [inView]);

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

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

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

  if (loading) {
    return (
      <div>
        <Image
          src="/spinner.svg"
          alt="spinner"
          width={56}
          height={56}
          className={styles.spinner}
        />
      </div>
    );
  }
  return (
    <>
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
        <div className={styles.paginationControls}>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={loading}>
          Next
        </button>
      </div>
      <div ref={ref} className={styles.loader}>Loading more ads...</div>
      </section>
    </>
  );
};

export default ListingsCollage;