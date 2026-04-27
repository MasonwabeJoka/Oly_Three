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
          className={`${styles.analyticsItems} ${styles.adId} ${styles.whiteOne} ${styles.value}`}
        >
          <div className={styles.label}>Ad Id</div>
          <div>{id}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteTwo} ${styles.value}`}>
          <div className={styles.label}>Status</div>
          <div>{adStatus}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteOne} ${styles.value}`}>
          <div className={styles.label}>Last Posted</div>
          <div>{postAge}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteTwo} ${styles.value}`}>
          <div className={styles.label}>Expires</div>
          <div>{expiryDate}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteOne} ${styles.value}`}>
          <div className={styles.label}>Bids</div>
          <div>{bidsCount}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteTwo} ${styles.value}`}>
          <div className={styles.label}>Likes</div>
          <div>{likesCount}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteOne} ${styles.value}`}>
          <div>Todays Views</div>
          <div>{viewsCountToday}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteTwo} ${styles.value}`}>
          <div className={styles.label}>Total Views</div>
          <div>{viewsCount}</div>
        </div>
        <div className={`${styles.analyticsItems} ${styles.whiteOne} ${styles.value}`}>
          <div className={styles.label}>Unread Messages</div>
          <div>{unreadMessages}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCardAnalytics;
