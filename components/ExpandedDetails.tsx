import React from "react";
import styles from "./ExpandedDetails.module.scss";
import Avatar from "@/components/Avatar";
import Checkbox from "./Checkbox";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
import { PortableTextBlock } from "sanity";

type ExpandedDetailsProps = {
  isDeletable: boolean;
  id?: string;
  isFeed: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  avatar?: string;
  title?: string;
  description?: string | PortableTextBlock[] | null;
  descriptionLength?: number;
  suburb?: string;
  city?: string;
  price?: number;
  postAge?: string;
  isCardHovered: boolean;
};

const PreventLinkClick = ({ children }: any) => {
  const handleClick = (event: any) => {
    event.stopPropagation();
  };
  return (
    <div className={styles.childrenContainer} onClick={handleClick}>
      {children}
    </div>
  );
};

export const ExpandedDetails: React.FC<ExpandedDetailsProps> = ({
  isDeletable,
  id,
  isFeed,
  checkedColour,
  hoverColour,
  checkedHovered,
  avatar,
  title,
  description,
  descriptionLength,
  suburb,
  city,
  price,
  postAge,
  isCardHovered,
}) => {
  const descriptionString = description && description[0]?.children[0]?.text;

  return (
    <div className={styles.details}>
      {isDeletable && (
        <div className={styles.checkboxContainer}>
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
      <div className={styles.infoSectionContainer}>
        <div className={styles.infoSection}>
          <div className={styles.topSection}>
            <Avatar
              className={styles.avatar}
              avatarSize="regular"
              avatar={avatar}
              isOnline={false}
            />
            <div className={styles.titleWrapper}>
              <p className={styles.title}>
                {title
                  ? title.length > 42
                    ? `${title.slice(0, 44)}`
                    : title
                  : ""}
              </p>
              <div className={styles.location}>
                <p className={styles.locationText}>
                  {/* {suburb && suburb}, {city && city} */}
                  Bryanston, JHB
                </p>
              </div>
            </div>
          </div>
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>
              {descriptionLength
                ? descriptionString.length > descriptionLength
                  ? `${descriptionString.slice(0, descriptionLength)}...`
                  : descriptionString
                : ""}
            </p>
          </div>
          <div className={styles.cardBottom}>
            <div className={styles.postMetrics}>
              <div className={styles.postAge}>
                {postAge ? Formatter.formatRelativeTime(postAge) : ""}
              </div>
            </div>
            <h2 className={styles.price}>
              {price ? Formatter.formatPrice(price) : ""}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
