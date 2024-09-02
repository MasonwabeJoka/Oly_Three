import PaginatedListingsCollage from "./PaginatedListingsCollage";
import styles from "./SimilarAds.module.scss";

const SimilarAds = () => {
  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${styles.similarAds}`}>Sponsored Ads</h2>
      <div className={styles.collage}>
        <PaginatedListingsCollage
          isDeletable={false}
          isDashboard={false}
          limit={5}
          page={1}
          sortBy="postedOn"
          sortOrder="desc"
        />
      </div>
    </div>
  );
};
export default SimilarAds;
