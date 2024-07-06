import styles from "./AdCard.module.scss";
import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import Avatar from "@/components/Avatars";
import Checkbox from "./Checkbox";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "sanity";
import { Ad } from "@/sanity/Types/Ad";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
type Props = {
  cardType: "expanded" | "box";
  id: string | number;
  images: string;
  title: string;
  description: PortableTextBlock[];
  postAge: Ad["postedOn"];
  price: number;
  cardSize?: keyof typeof CARD_SIZE;
  aspectRatio?: number;
  isFeed: boolean;
  isDashboard: boolean;
  isDeletable: boolean;
  checkedColour: string;
  hoverColour: string;
  checkedHovered: string;
  avatar?: string;
  suburb?: string;
  city?: string;
};

const CARD_SIZE = {
  largeDesktop: styles.largeDesktop,
  medium: styles.medium,
  small: styles.small,
  largeDesktopFeedDesktop: styles.largeDesktopFeedDesktop,
  mediumFeed: styles.mediumFeed,
  smallFeed: styles.smallFeed,
  "": "",
};

const AdCard: React.FC<Props> = ({
  id,
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

  const handleIconClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  const getImageSrc = () => {
    if (isHeartClicked) return "/icons/heart-clicked.svg";
    if (isHeartHovered) return "/icons/heart-hover.svg";
    return "/icons/heart.svg";
  };

  const PreventLinkClick = ({ children }) => {
    const handleClick = (event) => {
      event.stopPropagation();
    };

    return <div onClick={handleClick}>{children}</div>;
  };

  return (
    <>
      {cardType === "box" && !isDeletable ? (
        <article
          className={`${cardSize ? CARD_SIZE[cardSize] : ""} ${
            styles.boxCard
          } `}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
        >
          <div
            className={`${styles.imageContainer} ${
              isCardHovered && styles.imageContainerHovered
            }`}
          >
            <Image
              className={`${styles.image} ${
                isCardHovered && styles.imageHovered
              }`}
              src="/listing_images/Portrait/2.jpg" 
              width={310}
              height={248}
              alt={title}
              style={{
                verticalAlign: "top",
                minHeight: 248,
                objectFit: "cover",
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

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

          {!isCardHovered ? (
            <div className={styles.details}>
              <div className={styles.titleDescription}>
                <p className={styles.title}>
                  {title.length > 56 ? `${title.slice(0, 56)}...` : title}
                </p>
              </div>
              <h3 className={styles.price}>{Formatter.formatLargeNumber(price)}</h3>
            </div>
          ) : (
            <div
              className={`${styles.details} ${styles.detailsHovered}`}
              onMouseEnter={() => setIsCardHovered(true)}
            >
              <div className={styles.titleDescription}>
                <p className={styles.title}>{`${title.slice(0, 96)}...`}</p>

                <p className={styles.description}>
                  <PortableText value={description} />
                </p>
              </div>
              <h3 className={styles.price}>{Formatter.formatLargeNumber(price)}</h3>
            </div>
          )}
        </article>
      ) : cardType === "box" && isDeletable ? (
        <article
          className={`${cardSize ? CARD_SIZE[cardSize] : ""} ${
            styles.boxCard
          } `}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
        >
          <div
            className={`${styles.imageContainer} ${
              isCardHovered && styles.imageContainerHovered
            }`}
            style={{ position: "relative" }}
          >
            <Image
              className={`${styles.image} ${
                isCardHovered && styles.imageHovered
              }`}
              src="/listing_images/Portrait/2.jpg" 
              width={310}
              height={248}
              alt={title}
              style={{
                verticalAlign: "top",
                minHeight: 248,
                objectFit: "cover",
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
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
                  id={id}
                  label=""
                  isFeed={isFeed}
                  checkedColour={checkedColour}
                  hoverColour={hoverColour}
                  checkedHovered={checkedHovered}
                />
              </PreventLinkClick>
            </div>
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

          {!isCardHovered ? (
            <div className={styles.details}>
              <div className={styles.titleDescription}>
                <p className={styles.title}>
                  {title.length > 56 ? `${title.slice(0, 56)}...` : title}
                </p>
              </div>
              <h3 className={styles.price}>{Formatter.formatLargeNumber(price)}</h3>
            </div>
          ) : (
            <div
              className={`${styles.details} ${styles.detailsHovered}`}
              onMouseEnter={() => setIsCardHovered(true)}
            >
              <div className={styles.titleDescription}>
                <p className={styles.title}>{`${title.slice(0, 96)}...`}</p>

                <p className={styles.description}>
                  <PortableText value={description} />
                </p>
              </div>
              <h3 className={styles.price}>{Formatter.formatLargeNumber(price)}</h3>
            </div>
          )}
        </article>
      ) : cardType === "expanded" && !isDeletable ? (
        <article
          className={styles.expandedCard}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
        >
          <div className={styles.expandedCardWrapper}>
            <div className={styles.centerImageWrapper}>
              <div
                className={styles.imageContainer}
                style={{
                  height: "18rem",
                  width: `calc(18rem * ${aspectRatio})`,
                }}
              >
                <Image
                  className={styles.image}
                  src={"/listing_images/2.jpg" }
                  fill={true}
                  alt={title}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    right: "0",
                    verticalAlign: "top",
                    objectFit: "contain",
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

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

            <div className={styles.details}>
              <div className={styles.detailsWrapper}>
                <Avatar
                  className={styles.avatar}
                  avatarSize="regular"
                  avatar={avatar}
                  imageAlt={title}
                />

                <div className={styles.detailsText}>
                  <div className={styles.titleWrapper}>
                    <h3
                      className={styles.title}
                      style={{
                        fontSize: title.length > 48 ? "20px" : "24px",
                      }}
                    >
                      {`${
                        title.length > 42 ? `${title.slice(0, 42)}...` : title
                      }`}
                    </h3>

                    <div className={styles.location}>
                      <p className={styles.locationText}>
                        {suburb}, {city}
                      </p>
                    </div>
                  </div>
                  <div className={styles.descriptionContainer}>
                    <p className={styles.description}>
                      <PortableText value={description} />
                    </p>
                  </div>
                  <div className={styles.cardBottom}>
                    <h2 className={styles.price}>{Formatter.formatLargeNumber(price)}</h2>
                    <div className={styles.postMetrics}>
                      <div className={styles.postAge}>
                        {Formatter.formatRelativeTime(postAge)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      ) : (
        <article
          className={styles.expandedCard}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
        >
          <div className={styles.expandedCardWrapper}>
            <div className={styles.centerImageWrapper}>
              <div
                className={styles.imageContainer}
                style={{
                  height: "18rem",
                  width: `calc(18rem * ${aspectRatio})`,
                }}
              >
                <Image
                  className={styles.image}
                  src="/listing_images/Portrait/2.jpg" 
                  fill={true}
                  alt={title}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    right: "0",
                    verticalAlign: "top",
                    objectFit: "contain",
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

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

            <div className={styles.details}>
              <div className={styles.checkboxContainer}>
                <PreventLinkClick>
                  <Checkbox
                    className={styles.checkbox}
                    id={id}
                    label=""
                    isFeed={isFeed}
                    checkedColour={checkedColour}
                    hoverColour={hoverColour}
                    checkedHovered={checkedHovered}
                  />
                </PreventLinkClick>
              </div>
              <div className={styles.detailsWrapper}>
                <Avatar
                  className={styles.avatar}
                  avatarSize="regular"
                  avatar={avatar}
                  imageAlt={title}
                />

                <div className={styles.detailsText}>
                  <div className={styles.titleWrapper}>
                    <h3
                      className={styles.title}
                      style={{
                        fontSize: title.length > 48 ? "20px" : "24px",
                      }}
                    >
                      {`${
                        title.length > 42 ? `${title.slice(0, 42)}...` : title
                      }`}
                    </h3>

                    <div className={styles.location}>
                      <p className={styles.locationText}>
                        {suburb}, {city}
                      </p>
                    </div>
                  </div>
                  <div className={styles.descriptionContainer}>
                    <p className={styles.description}>
                      <PortableText value={description} />
                    </p>
                  </div>
                  <div className={styles.cardBottom}>
                    <h2 className={styles.price}>{Formatter.formatLargeNumber(price)}</h2>
                    <div className={styles.postMetrics}>
                      <div className={styles.postAge}>{Formatter.formatRelativeTime(postAge)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default AdCard;
