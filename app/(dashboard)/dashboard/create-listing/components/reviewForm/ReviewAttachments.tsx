import styles from "./ReviewAttachments.module.scss";
import { SectionWrapper } from "./SectionWrapper";
import { useParams } from "next/navigation";

const ReviewAttachments = () => {
  const params = useParams();
  const site = params.site as string;
  return (
    <SectionWrapper title="Attachments" path={`/dashboard/create-listing/${site}/attachments`}>
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
