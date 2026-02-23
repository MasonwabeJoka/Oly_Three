import styles from "./ReviewPrice.module.scss";
import { SectionWrapper } from "./SectionWrapper";
import { useParams } from "next/navigation";

const ReviewPrice = () => {
  const params = useParams();
  const site = params.site as string;
  return (
    <SectionWrapper title="Price" path={`/dashboard/create-listing/${site}/price`}>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <div className={styles.contentLabel}>Pricing Option</div>
            <div className={styles.contentItem}>Fixed Price</div>
          </div>
          <div className={styles.content}>
            <div className={styles.contentLabel}>Price</div>
            <div className={styles.contentItem}>R540</div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ReviewPrice;
