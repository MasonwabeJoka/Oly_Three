import styles from "./ListingsExpanded.module.scss";
import { useEffect, useState } from "react";
import { listingsData } from "@/data/ListingsData";
import { urlFor } from "@/lib/client";
import { fetchAds } from "@/sanity/actions/adsActions";
import { Ad } from "@/sanity/Types/Ad";
import { fetchListings } from "@/sanity/sanity_utils/tempActions";
import AdCard from "./AdCard";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "sanity";

type ListingsExpandedProps = {
  isDeletable: boolean;
  isDashboard: boolean;
  isFeed: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  avatars: string[];
};
const ListingsExpanded = ({
  isDeletable,
  isDashboard,
  isFeed,
  checkedColour,
  hoverColour,
  checkedHovered,
  avatars,
}: ListingsExpandedProps) => {
  const [imagesData, setImagesData] = useState<any[]>([]);
  const [adData, setAdData] = useState<Ad[]>([]);
  const [adDocuments, setAdDocuments] = useState<any>(null);

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
      // const documents = await fetchDocuments()
      setAdDocuments("");
    };

    documentsFunction();
  }, []);

  type Props = {
    // ... other props ...
    description: string | PortableTextBlock[]; // Allow both string and PortableTextBlock[]
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

  return (
    <div className={styles.listingsContainer}>
      {adData.map((ad, index) => {
        return (
          <Link href={`/${ad.slug}`}>
            <div className={styles.expandedCardContainer} key={ad._id}>
              <AdCard
                id={ad._id}
                cardType="expanded"
                images={ad.images[0].asset.url}
                title={ad.title}
                price={ad.price}
                description={
                  Array.isArray(ad.description) && !isDashboard
                    ? truncateRichText(ad.description, 300)
                    : Array.isArray(ad.description) && isDashboard
                      ? truncateRichText(ad.description, 240)
                      : ad.description
                }
                suburb={ad.location?.suburb}
                city={ad.location?.city}
                postAge={ad.postedOn}
                avatar={avatars ? avatars[index] : ""}
                aspectRatio={ad.images[0].asset.metadata.dimensions.aspectRatio}
                isFeed={isFeed}
                isDashboard={isDashboard}
                isDeletable={isDeletable}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ListingsExpanded;
