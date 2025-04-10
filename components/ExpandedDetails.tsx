import React from "react";
import styles from "./ExpandedDetails.module.scss";
import Avatar from "@/components/Avatars";
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
  suburb?: string;
  city?: string;
  price?: number;
  postAge?: string;
};

const PreventLinkClick = ({ children }: any) => {
  const handleClick = (event: any) => {
    event.stopPropagation();
  };
  return <div onClick={handleClick}>{children}</div>;
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
  suburb,
  city,
  price,
  postAge,
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
                ? title.length > 42
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