import styles from "./ReviewAttachments.module.scss";
import { SectionWrapper } from "./SectionWrapper";

const ReviewAttachments = () => {
  return (
    <SectionWrapper title="Attachments" pageNumber={1}>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <div className={styles.contentLabel}>Invoice.pdf</div>
          
          </div>
          <div className={styles.content}>
            <div className={styles.contentLabel}>Contract.pdf</div>
      
          </div>
          <div className={styles.content}>
            <div className={styles.contentLabel}>Blueprint.pdf</div>
      
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ReviewAttachments;
