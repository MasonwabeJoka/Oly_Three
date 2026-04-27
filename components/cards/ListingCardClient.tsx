"use client";
import { useEffect, useState } from "react";
import styles from "./ListingCard.module.scss";
import useSidebarStore from "@/store/useSidebarStore";

import ExpandedCard from "../ExpandedCard";
import BoxCard from "../BoxCard";
import type { PortableTextBlock } from "sanity";
import ListingCardSkeleton from "../skeletons/ListingCardSkeleton";

type Props = {
  site:
    | "oly"
    | "oly-properties"
    | "oly-auto"
    | "oly-hiring"
    | "oly-services"
    | "oly-shops"
    | "oly-agents"
    | "oly-dealerships";
  listing: any | null;
  index: number;
  cardType: "expanded" | "box";
  id?: string;
  slug?: string;
  imageUrls?: string[];
  title?: string;
  vehicleVariant?: string;
  description?: string | PortableTextBlock[] | null;
  descriptionLength?: number;
  postAge?: string;
  price?: number;
  cardSize?: "large" | "standard" | "small";
  aspectRatios?: number[];
  width?: number;
  height?: number;
  isFeed: boolean;
  isDashboard: boolean;
  isDeletable: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  avatar?: string;
  suburb?: string;
  city?: string;
};

const CARD_SIZE = {
  regular: {
    large: `${styles.large}`,
    standard: `${styles.standard}`,
    small: `${styles.small}`,
  },
  feed: {
    large: `${styles.largeFeed}`,
    standard: `${styles.standardFeed}`,
    small: `${styles.smallFeed}`,
  },
  dashboard: {
    large: `${styles.largeDashboard}`,
    standard: `${styles.standardDashboard}`,
    small: `${styles.smallDashboard}`,
  },
  property: {
    large: `${styles.largeProperty}`,
    standard: `${styles.standardProperty}`,
    small: `${styles.smallProperty}`,
  },
};

const ListingCardClient: React.FC<Props> = ({
  site,
  listing,
  id,
  index,
  aspectRatios,
  width,
  height,
  cardType,
  imageUrls,
  title,
  vehicleVariant,
  description,
  descriptionLength,
  postAge,
  price,
  cardSize = "standard",
  isFeed,
  isDashboard,
  isDeletable,
  checkedColour,
  hoverColour,
  checkedHovered,
  avatar,
  city,
  suburb,
}) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isCardHovered && !isHeartClicked && !isHeartHovered) {
      timer = setTimeout(() => {}, 2000);
    }
    return () => clearTimeout(timer);
  }, [isCardHovered, isHeartClicked, isHeartHovered]);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsHeartClicked(!isHeartClicked);
  };

  let sizeClass = "";
  sizeClass = isSidebarOpen
    ? CARD_SIZE.feed[cardSize]
    : isDashboard
      ? CARD_SIZE.dashboard[cardSize]
      : site === "oly-properties"
        ? CARD_SIZE.property[cardSize]
        : CARD_SIZE.regular[cardSize];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);
    return () => clearTimeout(timer);
  }, [index]);

  return cardType === "box" ? (
    listing ? (
      <BoxCard
        site={site}
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
        onHeartClick={handleHeartClick}
        onHeartHover={(hovered) => setIsHeartHovered(hovered)}
        setIsCardHovered={setIsCardHovered}
      />
    ) : (
      <ListingCardSkeleton
        orientation="portrait"
        cardSize={cardSize || "standard"}
      />
    )
  ) : cardType === "expanded" ? (
    listing ? (
      <ExpandedCard
        site={site}
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
        avatar={avatar}
        title={title}
        vehicleVariant={vehicleVariant}
        description={description}
        descriptionLength={descriptionLength}
        suburb={suburb}
        city={city}
        price={price}
        postAge={postAge}
        onHeartClick={handleHeartClick}
        onHeartHover={(hovered) => setIsHeartHovered(hovered)}
        setIsCardHovered={setIsCardHovered}
      />
    ) : (
      <ListingCardSkeleton
        orientation="landscape"
        cardSize={cardSize || "standard"}
      />
    )
  ) : null;
};

export default ListingCardClient;
