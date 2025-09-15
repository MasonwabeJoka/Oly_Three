import styles from "./BoxCard.module.scss";
import type { PortableTextBlock } from "sanity";
import  BoxCardClient from "./BoxCardClient";

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

const BoxCard: React.FC<BoxCardProps> = ({
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
    <>
      {(category === "all" || category === "shops") && (
        <article className={`${sizeClass} ${styles.boxCard}`}>
          <BoxCardClient
            category={category}
            sizeClass={sizeClass}
            imageUrls={imageUrls}
            aspectRatios={aspectRatios}
            isCardHovered={isCardHovered}
            isHeartClicked={isHeartClicked}
            isHeartHovered={isHeartHovered}
            isDeletable={isDeletable}
            id={id}
            isFeed={isFeed}
            checkedColour={checkedColour}
            hoverColour={hoverColour}
            checkedHovered={checkedHovered}
            title={title}
            description={description}
            descriptionLength={descriptionLength}
            price={price}
            postAge={postAge}
            onHeartClick={onHeartClick}
            onHeartHover={onHeartHover}
            setIsCardHovered={setIsCardHovered}
          />
        </article>
      )}
      {category === "property" && (
        <article className={`${sizeClass} ${styles.boxCard}`}>
          <BoxCardClient
            category={category}
            sizeClass={sizeClass}
            imageUrls={imageUrls}
            aspectRatios={aspectRatios}
            isCardHovered={isCardHovered}
            isHeartClicked={isHeartClicked}
            isHeartHovered={isHeartHovered}
            isDeletable={isDeletable}
            id={id}
            isFeed={isFeed}
            checkedColour={checkedColour}
            hoverColour={hoverColour}
            checkedHovered={checkedHovered}
            title={title}
            description={description}
            descriptionLength={descriptionLength}
            price={price}
            postAge={postAge}
            onHeartClick={onHeartClick}
            onHeartHover={onHeartHover}
            setIsCardHovered={setIsCardHovered}
          />
        </article>
      )}
    </>
  );
};

export default BoxCard;