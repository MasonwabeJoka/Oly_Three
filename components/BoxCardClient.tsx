"use client";
import { BoxImageContainer } from "./BoxImageContainer";
import { BoxCardDetails } from "./BoxCardDetails";
import type { PortableTextBlock } from "sanity";

type BoxCardProps = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  sizeClass: string;
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
  title?: string;
  description?: string | PortableTextBlock[] | null;
  descriptionLength?: number;
  price?: number;
  postAge?: string;
  onHeartClick: (e: React.MouseEvent) => void;
  onHeartHover: (hovered: boolean) => void;
  setIsCardHovered: (value: boolean) => void;
};

const BoxCardClient: React.FC<BoxCardProps> = ({
  category,
  sizeClass,
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
  title,
  description,
  descriptionLength,
  price,
  postAge,
  onHeartClick,
  onHeartHover,
  setIsCardHovered,
}) => {
  return (
    <div
      onMouseEnter={
        category === "property" ? () => {} : () => setIsCardHovered(true)
      }
      onMouseLeave={() => setIsCardHovered(isHeartClicked || isHeartHovered)}
      style={{ position: "relative"}}
    >
   
        <BoxImageContainer
          category={category}
          imageUrls={imageUrls}
          aspectRatios={aspectRatios}
          isHeartClicked={isHeartClicked}
          isHeartHovered={isHeartHovered}
          isCardHovered={isCardHovered}
          isDeletable={isDeletable}
          id={id}
          isFeed={isFeed}
          checkedColour={checkedColour}
          hoverColour={hoverColour}
          checkedHovered={checkedHovered}
          onHeartClick={onHeartClick}
          onHeartHover={onHeartHover}
        />
      
     
        <BoxCardDetails
          category={category}
          isCardHovered={isCardHovered}
          title={title}
          description={description}
          descriptionLength={descriptionLength}
          price={price}
          postAge={postAge}
        />
     
    </div>
  );
};

export default BoxCardClient;
