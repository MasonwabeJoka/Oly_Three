import React from "react";
import { PortableTextBlock } from "sanity";
import styles from "./BoxCard.module.scss";
import { BoxImageContainer } from "./BoxImageContainer";
import { BoxCardDetails } from "./BoxCardDetails";

type BoxCardProps = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  sizeClass: string;
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
  title?: string;
  description?: string | PortableTextBlock[] | null;
  price?: number;
  postAge?: string;
  onHeartClick: (e: React.MouseEvent) => void;
  onHeartHover: (hovered: boolean) => void;
  setIsCardHovered: (value: boolean) => void;
};

export const BoxCard: React.FC<BoxCardProps> = ({
  category,
  sizeClass,
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
  title,
  description,
  price,
  postAge,
  onHeartClick,
  onHeartHover,
  setIsCardHovered,
}) => {
  return (
    <>
      {category === "all" && (
        <article
          className={`${sizeClass} ${styles.boxCard}`}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() =>
            setIsCardHovered(isHeartClicked || isHeartHovered)
          }
          style={{ paddingBottom: isCardHovered ? "0" : "6rem" }}
        >
          <BoxImageContainer
            category={category}
            images={images}
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
            price={price}
            postAge={postAge}
          />
        </article>
      )}

      {category === "property" && (
        <article
          className={`${sizeClass} ${styles.boxCard}`}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() =>
            setIsCardHovered(isHeartClicked || isHeartHovered)
          }
          style={{ paddingBottom: isCardHovered ? "0" : "6rem" }}
        >
          <BoxImageContainer
            category={category}
            images={images}
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
            price={price}
            postAge={postAge}
          />
        </article>
      )}
    </>
  );
};
