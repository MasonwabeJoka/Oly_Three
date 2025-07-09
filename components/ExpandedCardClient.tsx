
"use client";
import styles from "./ExpandedCardClient.module.scss";
import { ExpandedImageContainer } from "./ExpandedImageContainer";
import { ExpandedDetails } from "./ExpandedDetails";
import type { PortableTextBlock } from "sanity";

type ExpandedCardProps = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  images?: string[];
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
  description?: string | PortableTextBlock[] | null;
  suburb?: string;
  city?: string;
  price?: number;
  postAge?: string;
  onHeartClick: (e: React.MouseEvent) => void;
  onHeartHover: (hovered: boolean) => void;
  setIsCardHovered: (value: boolean) => void;
};

const ExpandedCardClient: React.FC<ExpandedCardProps> = ({
  category,
  images,
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
  description,
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
        images={images}
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
        isDeletable={isDeletable}
        id={id}
        isFeed={isFeed}
        checkedColour={checkedColour}
        hoverColour={hoverColour}
        checkedHovered={checkedHovered}
        avatar={avatar}
        title={title}
        description={description}
        suburb={suburb}
        city={city}
        price={price}
        postAge={postAge}
        isCardHovered={isCardHovered}
      />
    </div>
  );
}

export default ExpandedCardClient;