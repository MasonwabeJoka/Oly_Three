import styles from "./ListingsExpanded.module.scss";
import { useEffect, useState } from "react";
import { listingsData } from "@/data/ListingsData";
import { urlFor } from "@/lib/client";
import { fetchAds } from "@/sanity/sanity_utils/sanityServerActions";
import { Ad } from "@/sanity/Types/Ad";
import { fetchListings } from "@/sanity/sanity_utils/tempActions";
import AdCard from "./AdCard";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "sanity";
// import { TQueryValidator } from "@/lib/validations/query-validator";
// import { getAds } from "@/lib/serverActions/getAds";
import useSidebarStore from "@/store/useSidebarStore";
import {ads} from "@/data/adData"

type ListingsExpandedProps = {
  isDeletable: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  isDashboard: boolean;
  isFeed?: boolean;
  // query: TQueryValidator;
  avatars: string[];
};
const ListingsExpanded = ({
  isDeletable,
  isDashboard,
  isFeed,
  checkedColour,
  hoverColour,
  checkedHovered,
  query,
  avatars,
}: ListingsExpandedProps) => {
  const [imagesData, setImagesData] = useState<any[]>([]);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const images = imagesData.map(image => image)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchListings();
        if (data) {
          setImagesData(data);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchData();
  }, []);
  // const FALLBACK_LIMIT = 10;
  // const data = getAds(query, FALLBACK_LIMIT)
  return (
    <div className={styles.listingsContainer}>
      {ads?.map((ad, index) => {
        return (
          <Link href={`/listings/${ad?.id}`} key={ad?.id}>
            <div className={styles.expandedCardContainer} >
            <AdCard
            id={ad.id}
            cardType="expanded"
            // images={images[index]?.src.original}
            avatar={ad.images[0]}
            images={ad.images[0]}
            title={ad.title}
            price={ad.price}
            city={ad.location.city}
            suburb={ad.location.suburb}
            description={ad.description}
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
      })}
    </div>
  );
};

export default ListingsExpanded;
