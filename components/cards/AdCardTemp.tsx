"use client";
import styles from "./AdCard.module.scss";
import { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import Checkbox from "../Checkbox";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
import AdSkeleton from "../skeletons/AdSkeleton";
import useSidebarStore from "@/store/useSidebarStore";
import { Ad } from "@/sanityTemp/Types/Ad";
import BoxImageSlider from "../BoxImageSlider";
import ExpandedImageSlider from "../ExpandedImageSlider";
import { PortableTextBlock } from "sanity";

type Props = {
  ad: Ad | null;
  index: number;
  cardType: "expanded" | "box";
  id?: Ad["_id"];
  images?: string[];
  title?: Ad["title"];
  description?: string | PortableTextBlock[] | null;
  postAge?: Ad["postedOn"];
  price?: Ad["price"];
  cardSize?:
    | keyof typeof CARD_SIZE.regular
    | keyof typeof CARD_SIZE.feed
    | keyof typeof CARD_SIZE.dashboard;
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
};

const AdCard: React.FC<Props> = ({
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

  const descriptionString = description && description[0].children[0].text;

  // Reset isCardHovered 2 seconds after mouse leave, not during hover
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isCardHovered && !isHeartClicked && !isHeartHovered) {
      timer = setTimeout(() => {
        // No action needed here, just keeping the structure
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isCardHovered, isHeartClicked, isHeartHovered]);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsHeartClicked(!isHeartClicked);
  };

  const PreventLinkClick = ({ children }: any) => {
    const handleClick = (event: any) => {
      event.stopPropagation();
    };
    return <div onClick={handleClick}>{children}</div>;
  };

  let sizeClass = "";
  sizeClass = isSidebarOpen
    ? CARD_SIZE.feed[cardSize]
    : isDashboard
      ? CARD_SIZE.dashboard[cardSize]
      : CARD_SIZE.regular[cardSize];

  const ImageContainer = () => {
    return (
      <div className={styles.imageContainer}>
        <BoxImageSlider
          urls={images}
          hasLikeButton={true}
          className={styles.image}
          aspectRatios={aspectRatios}
          isHeartClicked={isHeartClicked}
          isHeartHovered={isHeartHovered}
          isCardHovered={isCardHovered}
          onHeartClick={handleHeartClick}
          onHeartHover={(hovered) => setIsHeartHovered(hovered)}
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
                id={id ? id : ""}
                label=""
                isFeed={isFeed}
                checkedColour={checkedColour ? checkedColour : ""}
                hoverColour={hoverColour ? hoverColour : ""}
                checkedHovered={checkedHovered ? checkedHovered : ""}
              />
            </PreventLinkClick>
          </div>
        )}
      </div>
    );
  };

  const Details = () => {
    return (
      <>
        {!isCardHovered ? (
          <div className={styles.details}>
            <div className={styles.titleDescription}>
              <p className={styles.title}>
                {title
                  ? title.length > 64
                    ? `${title.slice(0, 64)}...`
                    : title
                  : ""}
              </p>
            </div>
            <h3 className={styles.price}>
              {price ? Formatter.formatLargeNumber(price) : ""}
            </h3>
          </div>
        ) : (
          <div
            className={`${styles.details} ${styles.detailsHovered}`}
            onMouseEnter={() => setIsCardHovered(true)}
          >
            <div className={styles.titleDescription}>
              <p className={styles.title}>{`${title?.slice(0, 96)}`}</p>
              <p className={styles.description}>{descriptionString}</p>
            </div>
            <h3 className={styles.price}>
              {price
                ? Formatter.formatPrice(price, {
                    showCurrency: false,
                    formatMillions: false,
                    formatThousands: false,
                  })
                : ""}
            </h3>
          </div>
        )}
      </>
    );
  };

  const BoxCard = () => {
    return (
      <article
        className={`${cardSize ? sizeClass : ""} ${styles.boxCard} `}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(isHeartClicked || isHeartHovered)}
        style={{ paddingBottom: isCardHovered ? "0" : "6rem" }}
      >
        <ImageContainer />
        <Details />
      </article>
    );
  };

  const ExpandedImageContainer = () => {
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

  const ExpandedDetails = () => {
    return (
      <div className={styles.details}>
        {isDeletable && (
          <div className={styles.checkboxContainer}>
            <PreventLinkClick>
              <Checkbox
                className={styles.checkbox}
                id={id ? id : ""}
                label=""
                isFeed={isFeed}
                checkedColour={checkedColour ? checkedColour : ""}
                hoverColour={hoverColour ? hoverColour : ""}
                checkedHovered={checkedHovered ? checkedHovered : ""}
              />
            </PreventLinkClick>
          </div>
        )}
        <div className={styles.detailsWrapper}>
          <Avatar
            className={styles.avatar}
            avatarSize="regular"
            avatar={avatar}
            isOnline={false}
          />
          <div className={styles.detailsText}>
            <div className={styles.titleWrapper}>
              <h3
                className={styles.title}
                style={{
                  fontSize: title ? (title.length > 48 ? "20px" : "24px") : "",
                }}
              >
                {title
                  ? title?.length > 42
                    ? `${title.slice(0, 42)}...`
                    : title
                  : ""}
              </h3>
              <div className={styles.location}>
                <p className={styles.locationText}>
                  {suburb && suburb}, {city && city}
                </p>
              </div>
            </div>
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>{descriptionString}</p>
            </div>
            <div className={styles.cardBottom}>
              <h2 className={styles.price}>
                {price ? Formatter.formatLargeNumber(price) : ""}
              </h2>
              <div className={styles.postMetrics}>
                <div className={styles.postAge}>
                  {postAge ? Formatter.formatRelativeTime(postAge) : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ExpandedCard = () => {
    return (
      <article
        className={styles.expandedCard}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(isHeartClicked || isHeartHovered)}
      >
        <div className={styles.expandedCardWrapper}>
          <ExpandedImageContainer />
          <ExpandedDetails />
        </div>
      </article>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div>
      {!isVisible || !ad ? (
        <AdSkeleton
          orientation="portrait"
          cardSize={cardSize ? cardSize : "standard"}
        />
      ) : cardType === "box" ? (
        <BoxCard />
      ) : cardType === "expanded" ? (
        <ExpandedCard />
      ) : null}
    </div>
  );
};

export default AdCard;
