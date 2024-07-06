import styles from "./ListingsCollage.module.scss";
import { useEffect, useState } from "react";
import AdCard from "@/components/AdCard";
import Masonry from "react-masonry-css";
import { fetchAds } from "@/sanity/actions/adsActions";
import { Ad } from "@/sanity/Types/Ad";
import useSidebarStore from "@/store/useSidebarStore";
import Link from "next/link";

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
  const [adData, setAdData] = useState<Ad[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  useEffect(() => {
    const adsFunction = async () => {
      const ads = await fetchAds();
      setAdData(ads);
    };

    adsFunction();
  }, []);

  useEffect(() => {
    // Gather all image URLs from adData
    const allImageUrls = adData.flatMap((ad) =>
      ad.images.map((image) => image.url)
    );

    // Update the state with all image URLs
    setImageUrls(allImageUrls);
  }, [adData]);

  const breakpointColumnsObj = {
    default: 3,
    2500: isSidebarOpen || isDashboard ? 3 : 4,
    800: 2,
    639: 1,
  };

  function truncateRichText(blocks: any, maxLength: number) {
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

  // Convert array to JSX items
  const cards = adData.map((ad, index) => {
    return (
      <Link href={`/${ad.slug}`} key={ad._id}>
        <div className={styles.card}>
          <AdCard
            ad={ad}
            id={ad._id}
            index={index}
            cardType="box"
            cardSize={cardSize}
            images={imageUrls}
            title={ad.title}
            price={ad.price}
            description={
              Array.isArray(ad.description)
                ? truncateRichText(ad.description, 400)
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
