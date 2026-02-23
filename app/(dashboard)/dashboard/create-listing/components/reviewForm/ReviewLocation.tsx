import styles from "./ReviewLocation.module.scss";
import { SectionWrapper } from "./SectionWrapper";
import { useParams } from "next/navigation";

const ReviewLocation = () => {
  const params = useParams();
  const site = params.site as string;
  return (
    <SectionWrapper title="Location" path={`/dashboard/create-listing/${site}/location`}>
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
