"use client";
import styles from "./AdCard.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import Avatar from "@/components/Avatars";
import Checkbox from "./Checkbox";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
import AdSkeleton from "./skeletons/AdSkeleton";
import useSidebarStore from "@/store/useSidebarStore";
import { Ad } from "@/payload.types";
import Link from "next/link";
import ImageSlider from "./ImageSlider";
import { listingsData } from "@/data/ListingsData";

type AdTemp = {
  id: number;
  userName: string;
  images: string; // URL to the image
  title: string;
  description: string;
  location: {
    suburb: string;
    city: string;
  };
  price: string; // Assuming price is a string to include currency symbols or codes, consider using number if you only intend to store numeric values
  postAge: string; // Consider using Date or number (for timestamp) for more precise date handling
  adStatus: "Active" | "Inactive" | "Expired"; // Enum-like type if you have a fixed set of statuses
  expiryDate: string; // Same note as for postAge, consider Date or number for timestamps
  bidsCount: number;
  likesCount: number;
  viewsCount: number;
  viewsCountToday: number;
  unreadMessages: number;
};
type Props = {
  ad: AdTemp;
  index: number;
  slug?: string;
  cardType: "expanded" | "box";
  id?: number;
  images?: string;
  title?: string;
  description?: string;
  postAge?: string;
  price?: string;
  cardSize?:
    | keyof typeof CARD_SIZE.regular
    | keyof typeof CARD_SIZE.feed
    | keyof typeof CARD_SIZE.dashboard;
  aspectRatio?: number;
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
// type Props = {
//   ad: Ad | null;
//   index: number;
//   slug?: Ad["slug"];
//   cardType: "expanded" | "box";
//   id?: Ad["id"];
//   images?: Ad["images"];
//   title?: Ad["title"];
//   description?: string;
//   postAge?: Ad["postedOn"];
//   price?: Ad["price"];
//   cardSize?:
//     | keyof typeof CARD_SIZE.regular
//     | keyof typeof CARD_SIZE.feed
//     | keyof typeof CARD_SIZE.dashboard;
//   aspectRatio?: number;
//   isFeed: boolean;
//   isDashboard: boolean;
//   isDeletable: boolean;
//   checkedColour?: string;
//   hoverColour?: string;
//   checkedHovered?: string;
//   avatar?: string;
//   suburb?: string;
//   city?: string;
// };

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
  aspectRatio,
  cardType,
  images,
  title,
  description,
  postAge,
  price,
  cardSize,
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
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  // const imageUrl = ads.
  const handleIconClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  const getImageSrc = () => {
    if (isHeartClicked) return "/icons/heart-clicked.svg";
    if (isHeartHovered) return "/icons/heart-hover.svg";
    return "/icons/heart.svg";
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

  // const urls = ad?.images
  //   .map((image) =>
  //     typeof image.image === "string" ? image.image : image?.image?.url
  //   )
  //   .filter(Boolean) as string[];

  const tempUrls = listingsData.map((listing) => listing.images);

  const ImageContainer = () => {
    return (
      <div
        className={`${styles.imageContainer} ${
          isCardHovered && styles.imageContainerHovered
        }`}
        style={{ position: "relative" }}
      >
        <ImageSlider
          // urls={urls}
          urls={tempUrls}
          className={`${styles.image} ${isCardHovered && styles.imageHovered}`}
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

        <div
          className={styles.likeIconContainer}
          onMouseEnter={() => setIsHeartHovered(true)}
          onMouseLeave={() => setIsHeartHovered(false)}
          onClick={handleIconClick}
        >
          {isCardHovered ? (
            <Icon
              className={styles.likeIcon}
              src={getImageSrc()}
              alt="Like Icon"
              width={isHeartHovered ? 64 : 52}
              height={isHeartHovered ? 64 : 52}
            />
          ) : isHeartClicked ? (
            <Icon
              className={styles.likeIcon}
              src={getImageSrc()}
              alt="Like Icon"
              width={isHeartHovered ? 64 : 52}
              height={isHeartHovered ? 64 : 52}
            />
          ) : null}
        </div>
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
                  ? title.length > 56
                    ? `${title.slice(0, 56)}...`
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
              <p className={styles.title}>{`${title?.slice(0, 96)}...`}</p>

              <p className={styles.description}>{description}</p>
            </div>
            <h3 className={styles.price}>
              {price ? Formatter.formatLargeNumber(price) : ""}
            </h3>
          </div>
        )}
      </>
    );
  };

  // const Details = () => {
  //   return (
  //     <>
  //       {!isCardHovered ? (
  //         <div className={styles.details}>
  //           <div className={styles.titleDescription}>
  //             <p className={styles.title}>
  //               {title
  //                 ? title.length > 56
  //                   ? `${title.slice(0, 56)}...`
  //                   : title
  //                 : ""}
  //             </p>
  //           </div>
  //           <h3 className={styles.price}>
  //             {price ? Formatter.formatLargeNumber(price) : ""}
  //           </h3>
  //         </div>
  //       ) : (
  //         <div
  //           className={`${styles.details} ${styles.detailsHovered}`}
  //           onMouseEnter={() => setIsCardHovered(true)}
  //         >
  //           <div className={styles.titleDescription}>
  //             <p className={styles.title}>{`${title?.slice(0, 96)}...`}</p>

  //             <p className={styles.description}>{description}</p>
  //           </div>
  //           <h3 className={styles.price}>
  //             {price ? Formatter.formatLargeNumber(price) : ""}
  //           </h3>
  //         </div>
  //       )}
  //     </>
  //   );
  // };

  const BoxCard = () => {
    return (
      <article
        className={`${cardSize ? sizeClass : ""} ${styles.boxCard} `}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        <ImageContainer />
        <Details />
      </article>
    );
  };

  const ExpandedImageContainer = () => {
    return (
      <div className={styles.centerImageWrapper}>
        <div
          className={styles.imageContainer}
          style={{
            height: "18rem",
            width: `calc(18rem * ${aspectRatio})`,
          }}
        >
          <ImageSlider urls={urls} className={styles.image} />

          <div
            className={styles.likeIconContainer}
            onMouseEnter={() => setIsHeartHovered(true)}
            onMouseLeave={() => setIsHeartHovered(false)}
            onClick={handleIconClick}
          >
            {isCardHovered ? (
              <Icon
                className={styles.likeIcon}
                src={getImageSrc()}
                alt="Like Icon"
                width={isHeartHovered ? 64 : 52}
                height={isHeartHovered ? 64 : 52}
              />
            ) : isHeartClicked ? (
              <Icon
                className={styles.likeIcon}
                src={getImageSrc()}
                alt="Like Icon"
                width={isHeartHovered ? 64 : 52}
                height={isHeartHovered ? 64 : 52}
              />
            ) : null}
          </div>
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
        ``
        <div className={styles.detailsWrapper}>
          <Avatar
            className={styles.avatar}
            avatarSize="regular"
            avatar={avatar}
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
              <p className={styles.description}>{description}</p>
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
        onMouseLeave={() => setIsCardHovered(false)}
      >
        <div className={styles.expandedCardWrapper}>
          <ExpandedImageContainer />
          <ExpandedDetails />
        </div>
      </article>
    );
  };

  useEffect(() => {
    // staggard delay animation
    // when the index changes set isVisible to true after the delay.
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  const animateCardStyle: React.CSSProperties = {
    visibility: "visible",
    animation: "fadeIn 5s ease-in-out",
  };

  return (
    <Link href={`/listings/${ad?.id}`} style={animateCardStyle}>
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
    </Link>
  );
};

export default AdCard;
