"use client";
import styles from "./ExpandedCardClient.module.scss";
import { ExpandedImageContainer } from "./ExpandedImageContainer";
import { ExpandedDetails } from "./ExpandedDetails";
import type { PortableTextBlock } from "sanity";

type ExpandedCardProps = {
  site:
    | "oly"
    | "oly-properties"
    | "oly-auto"
    | "oly-hiring"
    | "oly-services"
    | "oly-shops"
    | "oly-agents"
    | "oly-dealerships";
  imageUrls?: string[];
  aspectRatios?: number[];
  isCardHovered: boolean;
  isHeartClicked: boolean;
  isHeartHovered: boolean;
  isDeletable: boolean;
  id?: string;
  isFeed: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  avatar?: string;
  title?: string;
  vehicleVariant?: string;
  description?: string | PortableTextBlock[] | null;
  descriptionLength?: number;
  suburb?: string;
  city?: string;
  price?: number;
  postAge?: string;
  onHeartClick: (e: React.MouseEvent) => void;
  onHeartHover: (hovered: boolean) => void;
  setIsCardHovered: (value: boolean) => void;
};

const ExpandedCardClient: React.FC<ExpandedCardProps> = ({
  site,
  imageUrls,
  aspectRatios,
  isCardHovered,
  isHeartClicked,
  isHeartHovered,
  isDeletable,
  id,
  isFeed,
  checkedColour,
  hoverColour,
  checkedHovered,
  avatar,
  title,
  vehicleVariant,
  description,
  descriptionLength,
  suburb,
  city,
  price,
  postAge,
  onHeartClick,
  onHeartHover,
  setIsCardHovered,
}) => {
  return (
    <div
      className={styles.expandedCardWrapper}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(isHeartClicked || isHeartHovered)}
    >
      <ExpandedImageContainer
        imageUrls={imageUrls}
        aspectRatios={aspectRatios}
        checkedHovered={checkedHovered}
        isHeartClicked={isHeartClicked}
        isHeartHovered={isHeartHovered}
        isCardHovered={isCardHovered}
        id={id}
        isFeed={isFeed}
        checkedColour={checkedColour}
        hoverColour={hoverColour}
        onHeartClick={onHeartClick}
        onHeartHover={onHeartHover}
      />
      <ExpandedDetails
        site={site}
        isDeletable={isDeletable}
        id={id}
        isFeed={isFeed}
        checkedColour={checkedColour}
        hoverColour={hoverColour}
        checkedHovered={checkedHovered}
        avatar={avatar}
        title={title}
        description={description as any}
        descriptionLength={descriptionLength}
        vehicleVariant={vehicleVariant}
        suburb={suburb}
        city={city}
        price={price}
        postAge={postAge}
        isCardHovered={isCardHovered}
      />
    </div>
  );
};

export default ExpandedCardClient;
