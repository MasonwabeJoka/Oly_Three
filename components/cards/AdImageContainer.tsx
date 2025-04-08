// components/AdCard/AdImageContainer.tsx
import React from "react";
import BoxImageSlider from "../BoxImageSlider";
import ExpandedImageSlider from "../ExpandedImageSlider";
import styles from "./AdCard.module.scss";
import { CardType } from "./AdCardTypes";

interface Props {
  images: string[];
  cardType: CardType;
  aspectRatios?: number[];
  isHeartClicked: boolean;
  isHeartHovered: boolean;
  isCardHovered: boolean;
  onHeartClick: (e: React.MouseEvent) => void;
  onHeartHover: (hovered: boolean) => void;
}

const AdImageContainer: React.FC<Props> = ({
  images,
  cardType,
  aspectRatios,
  isHeartClicked,
  isHeartHovered,
  isCardHovered,
  onHeartClick,
  onHeartHover,
}) => {
  const Slider = cardType === "box" ? BoxImageSlider : ExpandedImageSlider;

  return (
    <Slider
      urls={images}
      hasLikeButton={true}
      className={styles.image}
      aspectRatios={aspectRatios}
      isHeartClicked={isHeartClicked}
      isHeartHovered={isHeartHovered}
      isCardHovered={isCardHovered}
      onHeartClick={onHeartClick}
      onHeartHover={onHeartHover}
    />
  );
};

export default AdImageContainer;