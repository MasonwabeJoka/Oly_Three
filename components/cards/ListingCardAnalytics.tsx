import styles from "./ListingCardAnalytics.module.scss";

import { AdAnalyticsType } from "@/data/adDataAnalytics";

const ListingCardAnalytics = ({
  adAnalyticsData,
}: {
  adAnalyticsData: AdAnalyticsType;
}) => {
  const {
    id,
    adStatus,
    postAge,
    expiryDate,
    bidsCount,
    likesCount,
    viewsCountToday,
    viewsCount,
    unreadMessages,
  } = adAnalyticsData;
  return (
    <div className={styles.container}>
      <div className={styles.analyticsItemsContainer}>
        <div
          className={`${styles.analyticsItems} ${styles.adId} ${styles.whiteOne}`}
        >
          <div>Ad Id</div>
          <div>{id}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteTwo}`}>
          <div>Status</div>
          <div>{adStatus}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteOne}`}>
          <div>Last Posted</div>
          <div>{postAge}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteTwo}`}>
          <div>Expires</div>
          <div>{expiryDate}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteOne}`}>
          <div>Bids</div>
          <div>{bidsCount}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteTwo}`}>
          <div>Likes</div>
          <div>{likesCount}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteOne}`}>
          <div>Todays Views</div>
          <div>{viewsCountToday}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteTwo}`}>
          <div>Total Views</div>
          <div>{viewsCount}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteOne}`}>
          <div>Unread Messages</div>
          <div>{unreadMessages}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCardAnalytics;
