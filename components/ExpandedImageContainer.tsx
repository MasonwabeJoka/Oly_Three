import React from "react";
import styles from "./ExpandedImageContainer.module.scss";
import ExpandedImageSlider from "./ExpandedImageSlider";

type ExpandedImageContainerProps = {
  images?: string[];
  aspectRatios?: number[];
};

export const ExpandedImageContainer: React.FC<ExpandedImageContainerProps> = ({
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
    </div>
  );
};