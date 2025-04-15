import React from "react";
import styles from "./ExpandedImageContainer.module.scss";
import ExpandedImageSlider from "./ExpandedImageSlider";
import Checkbox from "./Checkbox";
type ExpandedImageContainerProps = {
  id?: string;
  images?: string[];
  aspectRatios?: number[];
  isHeartClicked: boolean;
  isHeartHovered: boolean;
  isCardHovered: boolean;
  isFeed: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  onHeartClick: (e: React.MouseEvent) => void;
  onHeartHover: (hovered: boolean) => void;
};

export const ExpandedImageContainer: React.FC<ExpandedImageContainerProps> = ({
  id,
  isFeed,
  checkedColour,
  hoverColour,
  checkedHovered,
  images,
  aspectRatios,
  isHeartClicked,
  isHeartHovered,
  isCardHovered,
  onHeartClick,
  onHeartHover,
}) => {
  return (
    <div className={styles.centerImageWrapper}>
      <div className={styles.imageContainer}>
        <ExpandedImageSlider
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
      </div>
    </div>
  );
};
