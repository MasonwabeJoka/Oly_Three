import React from "react";
import styles from "./BoxImageContainer.module.scss";
import BoxImageSlider from "./BoxImageSlider";
import Checkbox from "./Checkbox";

type BoxImageContainerProps = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  imageUrls?: string[];
  aspectRatios?: number[];
  isHeartClicked: boolean;
  isHeartHovered: boolean;
  isCardHovered: boolean;
  isDeletable: boolean;
  id?: string;
  isFeed: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  onHeartClick: (e: React.MouseEvent) => void;
  onHeartHover: (hovered: boolean) => void;
};

const PreventLinkClick = ({ children }: any) => {
  const handleClick = (event: any) => {
    event.stopPropagation();
  };
  return <div onClick={handleClick}>{children}</div>;
};

export const BoxImageContainer: React.FC<BoxImageContainerProps> = ({
  category,
  imageUrls,
  aspectRatios,
  isHeartClicked,
  isHeartHovered,
  isCardHovered,
  isDeletable,
  id,
  isFeed,
  checkedColour,
  hoverColour,
  checkedHovered,
  onHeartClick,
  onHeartHover,
}) => {
  return (
    <div className={styles.BoxImageContainer}>
      <BoxImageSlider
        category={category}
        imagesUrls={imageUrls}
        hasLikeButton={true}
        className={styles.image}
        aspectRatios={aspectRatios}
        isHeartClicked={isHeartClicked}
        isHeartHovered={isHeartHovered}
        isCardHovered={isCardHovered}
        onHeartClick={onHeartClick}
        onHeartHover={onHeartHover}
      />
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
          <PreventLinkClick>
            <Checkbox
              className={styles.checkbox}
              id={id || ""}
              label=""
              isFeed={isFeed}
              checkedColour={checkedColour || ""}
              hoverColour={hoverColour || ""}
              checkedHovered={checkedHovered || ""}
            />
          </PreventLinkClick>
        </div>
      )}
    </div>
  );
};
