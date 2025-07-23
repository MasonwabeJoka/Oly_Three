import styles from "./ExpandedCard.module.scss";
import type { PortableTextBlock } from "sanity";
import ExpandedCardClient from "./ExpandedCardClient";

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
  descriptionLength?: number;
  suburb?: string;
  city?: string;
  price?: number;
  postAge?: string;
  onHeartClick: (e: React.MouseEvent) => void;
  onHeartHover: (hovered: boolean) => void;
  setIsCardHovered: (value: boolean) => void;
};

const ExpandedCard: React.FC<ExpandedCardProps> = ({
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
    <article className={styles.expandedCard}>
      <ExpandedCardClient
        category={category}
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
        avatar={avatar}
        title={title}
        description={description}
        descriptionLength={descriptionLength}
        suburb={suburb}
        city={city}
        price={price}
        postAge={postAge}
        onHeartClick={onHeartClick}
        onHeartHover={onHeartHover}
        setIsCardHovered={setIsCardHovered}
      />
    </article>
  );
};

export default ExpandedCard;
