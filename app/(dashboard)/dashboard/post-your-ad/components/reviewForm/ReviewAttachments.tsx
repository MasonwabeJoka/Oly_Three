import styles from "./ReviewAttachments.module.scss"
import { SectionWrapper } from "./SectionWrapper";

const ReviewAttachments = () => {
  return (
    <SectionWrapper title="Attachments" ><div className={styles.container}>
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
  </div></SectionWrapper>
  )
}

export default ReviewAttachments