import styles from "./BoxCard.module.scss";
import type { PortableTextBlock } from "sanity";
import  BoxCardClient from "./BoxCardClient";

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

const BoxCard: React.FC<BoxCardProps> = ({
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
        <article className={`${sizeClass} ${styles.boxCard}`}>
          <BoxCardClient
            category={category}
            sizeClass={sizeClass}
            images={images}
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
            images={images}
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