// components/AdCard/ExpandedDetails.tsx
import React from "react";
import Avatar from "@/components/Avatars";
import Checkbox from "../Checkbox";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
import styles from "./AdCard.module.scss";
import { Ad } from "./AdCardTypes";

interface Props {
  ad: Ad;
  isDeletable: boolean;
  isFeed: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
}

const PreventLinkClick: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  return <div onClick={handleClick}>{children}</div>;
};

const ExpandedDetails: React.FC<Props> = ({
  ad,
  isDeletable,
  isFeed,
  checkedColour,
  hoverColour,
  checkedHovered,
}) => {
//   const descriptionString = ad.description?.[0]?.children?.[0]?.text || "";
  const descriptionString = "abc defg hijklmnopqrstuvwxyz";

  return (
    <div className={styles.details}>
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
      <div className={styles.detailsWrapper}>
        <Avatar
          className={styles.avatar}
          avatarSize="regular"
          avatar={ad.avatar}
          isOnline={false}
        />
        <div className={styles.detailsText}>
          <div className={styles.titleWrapper}>
            <h3
              className={styles.title}
              style={{
                fontSize: ad.title.length > 48 ? "20px" : "24px",
              }}
            >
              {ad.title.length > 42 ? `${ad.title.slice(0, 42)}...` : ad.title}
            </h3>
            <div className={styles.location}>
              <p className={styles.locationText}>
                {ad.suburb && `${ad.suburb}, `}{ad.city}
              </p>
            </div>
          </div>
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>{descriptionString}</p>
          </div>
          <div className={styles.cardBottom}>
            <h2 className={styles.price}>
              {ad.price ? Formatter.formatLargeNumber(ad.price) : ""}
            </h2>
            <div className={styles.postMetrics}>
              <div className={styles.postAge}>
                {ad.postedOn ? Formatter.formatRelativeTime(ad.postedOn) : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedDetails;