"use client";
import { useEffect, useState } from "react";
import styles from "./AdCard.module.scss";
import useSidebarStore from "@/store/useSidebarStore";
import { Ad } from "@/sanity/Types/Ad";
import AdSkeleton from "../skeletons/AdSkeleton";
import { BoxCard } from "../BoxCard";
import { ExpandedCard } from "../ExpandedCard";

type Props = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  ad: Ad | null;
  index: number;
  cardType: "expanded" | "box";
  id?: Ad["_id"];
  images?: string[];
  // title?: string;
  title?: Ad["title"];
  description?: string | PortableTextBlock[] | null;
  postAge?: Ad["postedOn"];
  price?: Ad["price"];
  cardSize?:
    | keyof typeof CARD_SIZE.regular
    | keyof typeof CARD_SIZE.feed
    | keyof typeof CARD_SIZE.dashboard
    | keyof typeof CARD_SIZE.property;
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

const AdCard: React.FC<Props> = ({
  category,
  ad,
  id,
  index,
  aspectRatios,
  width,
  height,
  cardType,
  images,
  title,
  description,
  postAge,
  price,
  cardSize = "standard",
  isFeed,
  isDashboard,
  isDeletable = false,
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
      : category === "property"
        ? CARD_SIZE.property[cardSize]
        : CARD_SIZE.regular[cardSize];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div>
      {!isVisible || !ad ? (
        <AdSkeleton orientation="portrait" cardSize={cardSize || "standard"} />
      ) : cardType === "box" ? (
        <BoxCard
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
          onHeartClick={handleHeartClick}
          onHeartHover={(hovered) => setIsHeartHovered(hovered)}
          setIsCardHovered={setIsCardHovered}
        />
      ) : cardType === "expanded" ? (
        <ExpandedCard
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
          suburb={suburb}
          city={city}
          price={price}
          postAge={postAge}
          onHeartClick={handleHeartClick}
          onHeartHover={(hovered) => setIsHeartHovered(hovered)}
          setIsCardHovered={setIsCardHovered}
        />
      ) : null}
    </div>
  );
};

export default AdCard;
