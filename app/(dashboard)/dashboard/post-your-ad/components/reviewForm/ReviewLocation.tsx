import styles from "./ReviewLocation.module.scss";
import { SectionWrapper } from "./SectionWrapper";
const ReviewLocation = () => {
  return (
    <SectionWrapper title="Location" pageNumber={10}>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <div className={styles.contentLabel}>Category</div>
            <div className={styles.contentItem}>Vehicles</div>
          </div>
          <div className={styles.content}>
            <div className={styles.contentLabel}>Sub Category</div>
            <div className={styles.contentItem}>Motorbikes</div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ReviewLocation;
