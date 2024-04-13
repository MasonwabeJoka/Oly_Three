import styles from "./ListingsCollage.module.scss";
import { useEffect, useState } from "react";
import AdCard from "@/components/AdCard";
import Masonry from "react-masonry-css";
import { fetchAds } from "@/sanity/sanity_utils/sanityServerActions";
import { Ad } from "@/sanity/Types/Ad";
import { fetchListings } from "@/sanity/sanity_utils/tempActions";
import { categoriesArray } from "@/utils/categoriesArray";
import useSidebarStore from "@/store/useSidebarStore";
import useIsDashboardStore from "@/store/isDashboardStore";
import Link from "next/link";
import {ads} from "@/data/adData"

type ImageMetadata = {
  dimensions: {
    width: number;
    height: number;
    aspectRatio: number;
  };
};

type ListingsCollageProps = {
  isDeletable: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  isDashboard: boolean;
  isFeed?: boolean;
};

const ListingsCollage = ({
  isDeletable,
  checkedColour,
  hoverColour,
  checkedHovered,
  isDashboard,
  isFeed,
}: ListingsCollageProps) => {
  const [imagesData, setImagesData] = useState<any[]>([]);
  const [adData, setAdData] = useState<Ad[]>([]);
  const [adDocuments, setAdDocuments] = useState<any>(null);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  
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

  useEffect(() => {
    const adsFunction = async () => {
      const ads = await fetchAds();
      setAdData(ads);
    };

    adsFunction();
  }, []);

  useEffect(() => {
    const documentsFunction = async () => {
      setAdDocuments(categoriesArray);
    };

    documentsFunction();
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    2500: isSidebarOpen || isDashboard ? 3 : 4,
    800: 2,
    639: 1,
  };

  type Props = {
    // ... other props ...
    description: string // Allow both string and PortableTextBlock[]
    // ... other props ...
  };

  function truncateRichText(blocks, maxLength) {
    let totalLength = 0;
    let truncatedBlocks = [];

    for (const block of blocks) {
      if (block._type !== "block" || !block.children) {
        truncatedBlocks.push(block);
        continue;
      }

      let newChildren = [];
      for (const child of block.children) {
        if (child._type !== "span") {
          newChildren.push(child);
          continue;
        }

        const remainingLength = maxLength - totalLength;
        if (remainingLength <= 0) {
          // Add ellipsis to the last text span if truncated
          if (newChildren.length > 0) {
            const lastChild = newChildren[newChildren.length - 1];
            lastChild.text += "...";
          }
          return truncatedBlocks;
        }

        const truncatedText = child.text.slice(0, remainingLength);
        totalLength += truncatedText.length;
        newChildren.push({ ...child, text: truncatedText });

        if (truncatedText.length < child.text.length) {
          // Text was truncated, append ellipsis and stop processing further
          newChildren[newChildren.length - 1].text += "...";
          truncatedBlocks.push({ ...block, children: newChildren });
          return truncatedBlocks;
        }
      }

      truncatedBlocks.push({ ...block, children: newChildren });
    }

    return truncatedBlocks;
  }

  const images = imagesData.map(image => image)


  // Convert array to JSX items
  const cards = ads.map((ad, index) => {
    return (
      <Link href={`/listings/${ad.id}`}>
        <div className={styles.card} key={ad.id}>
          <AdCard
            id={ad.id}
            cardType="box"
            images={ad.images[0]}
            title={ad.title}
            price={ad.price}
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
  });

  return (
    <Masonry
      className={styles.listingsContainer}
      breakpointCols={breakpointColumnsObj}
      columnClassName={styles.listingsContainerColumns}
      style={{
        maxWidth: isDashboard || isFeed ? "59.625rem" : "81.25rem",
      }}
    >
      {cards}
    </Masonry>
  );
};

export default ListingsCollage;
