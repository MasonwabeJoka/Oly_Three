import React from "react";
import styles from "./ExpandedImageContainer.module.scss";
import ExpandedImageSlider from "./ExpandedImageSlider";
import Checkbox from "./Checkbox";
type ExpandedImageContainerProps = {
  id?: string;
  isDeletable: boolean;
  images?: string[];
  aspectRatios?: number[];
  isFeed: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
};

export const ExpandedImageContainer: React.FC<ExpandedImageContainerProps> = ({
  id,
  isDeletable,
  isFeed,
  checkedColour,
  hoverColour,
  checkedHovered,
  images,
  aspectRatios,
}) => {
  return (
    <div className={styles.centerImageWrapper}>
      <div className={styles.imageContainer}>
        <ExpandedImageSlider
          urls={images}
          hasLikeButton={true}
          className={styles.image}
          aspectRatios={aspectRatios}
        />
      </div>
      {isDeletable && (
        <div
          className={styles.checkboxContainer}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            margin: "1rem 1rem 0 0",
            backgroundColor: "white",
            borderRadius: "1rem",
          }}
        >
      
        </div>
      )}
    </div>
  );
};