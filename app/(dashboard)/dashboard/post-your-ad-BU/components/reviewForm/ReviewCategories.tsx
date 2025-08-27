import { SectionWrapper } from "./SectionWrapper";
import styles from "./ReviewCategories.module.scss";
import Select from "@/components/Select";

const ReviewCategories = () => {
  return (
    <SectionWrapper title="Categories" pageNumber={0}>
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

export default ReviewCategories;
