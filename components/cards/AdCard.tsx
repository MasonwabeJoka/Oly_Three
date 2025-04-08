// components/AdCard/AdCard.tsx
"use client";
import React, { useState, useEffect } from "react";
import styles from "./AdCard.module.scss";
import AdSkeleton from "../skeletons/AdSkeleton";
import useSidebarStore from "@/store/useSidebarStore";
import AdImageContainer from "./AdImageContainer";
import BoxDetails from "./BoxDetails";
import ExpandedDetails from "./ExpandedDetails";
import Checkbox from "../Checkbox";
import { Ad, CardSize, CardType } from "./AdCardTypes";

interface Props {
  ad: Ad | null;
  index: number;
  cardType: CardType;
  cardSize?: CardSize;
  isFeed: boolean;
  isDashboard: boolean;
  isDeletable: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  aspectRatios?: number[];
}

const CARD_SIZE = {
  regular: {
    large: styles.large,
    standard: styles.standard,
    small: styles.small,
  },
  feed: {
    large: styles.largeFeed,
    standard: styles.standardFeed,
    small: styles.smallFeed,
  },
  dashboard: {
    large: styles.largeDashboard,
    standard: styles.standardDashboard,
    small: styles.smallDashboard,
  },
};

const PreventLinkClick: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  return <div onClick={handleClick}>{children}</div>;
};

const AdCard: React.FC<Props> = ({
  ad,
  index,
  cardType,
  cardSize = "standard",
  isFeed,
  isDashboard,
  isDeletable,
  checkedColour,
  hoverColour,
  checkedHovered,
  aspectRatios,
}) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);
    return () => clearTimeout(timer);
  }, [index]);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsHeartClicked((prev) => !prev);
  };

  const handleHeartHover = (hovered: boolean) => {
    setIsHeartHovered(hovered);
  };

  if (!isVisible || !ad) {
    return <AdSkeleton orientation="portrait" cardSize={cardSize} />;
  }

  const sizeClass = isSidebarOpen
    ? CARD_SIZE.feed[cardSize]
    : isDashboard
      ? CARD_SIZE.dashboard[cardSize]
      : CARD_SIZE.regular[cardSize];

  if (cardType === "box") {
    return (
      <article
        className={`${sizeClass} ${styles.boxCard}`}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(isHeartClicked || isHeartHovered)}
      >
        <div className={styles.imageContainer}>
          <AdImageContainer
            images={ad.images}
            cardType={cardType}
            aspectRatios={aspectRatios}
            isHeartClicked={isHeartClicked}
            isHeartHovered={isHeartHovered}
            isCardHovered={isCardHovered}
            onHeartClick={handleHeartClick}
            onHeartHover={handleHeartHover}
          />
          {isDeletable && (
            <div className={styles.checkboxContainer}>
              <PreventLinkClick>
                <Checkbox
                  className={styles.checkbox}
                  id={ad._id}
                  label=""
                  isFeed={isFeed}
                  checkedColour={checkedColour}
                  hoverColour={hoverColour}
                  checkedHovered={checkedHovered}
                />
              </PreventLinkClick>
            </div>
          )}
        </div>
        <BoxDetails ad={ad} isCardHovered={isCardHovered} />
      </article>
    );
  }

  return (
    <article className={styles.expandedCard}>
      <div className={styles.expandedCardWrapper}>
        <div className={styles.centerImageWrapper}>
          <div className={styles.imageContainer}>
            <AdImageContainer
              images={ad.images}
              cardType={cardType}
              aspectRatios={aspectRatios}
              isHeartClicked={isHeartClicked}
              isHeartHovered={isHeartHovered}
              onHeartClick={handleHeartClick}
              onHeartHover={handleHeartHover}
            />
          </div>
        </div>
        <ExpandedDetails
          ad={ad}
          isDeletable={isDeletable}
          isFeed={isFeed}
          checkedColour={checkedColour}
          hoverColour={hoverColour}
          checkedHovered={checkedHovered}
        />
      </div>
    </article>
  );
};

export default AdCard;