import { SectionWrapper } from "./SectionWrapper";
import styles from "./ReviewCategories.module.scss";
import Select from "@/components/Select";
import { useParams } from "next/navigation";

const ReviewCategories = () => {
  const params = useParams();
  const site = params.site as string;
  return (
    <SectionWrapper
      title="Categories"
      path={`/dashboard/create-listing/${site}/select-category`}
    >
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
