import Link from "next/link";
import styles from "./ReviewAndSubmit.module.scss";
import ReviewAttachments from "./reviewForm/ReviewAttachments";
import ReviewCategories from "./reviewForm/ReviewCategories";
import ReviewDetails from "./reviewForm/ReviewDetails";
import ReviewFeatures from "./reviewForm/ReviewFeatures";
import ReviewLocation from "./reviewForm/ReviewLocation";
import ReviewPhotos from "./reviewForm/ReviewPhotos";
import ReviewPrice from "./reviewForm/ReviewPrice";
import ReviewTitleAndDescription from "./reviewForm/ReviewTitleAndDescription";
import ReviewVideos from "./reviewForm/ReviewVideos";
import { FormWrapper } from "./FormWrapper";

const SubmitForm = () => {
  // https://chatgpt.com/share/45cb30a0-a739-4224-bea5-82b0c352dd28
  return (
    <FormWrapper>
      <div className={styles.container}>
        <h2 className={styles.title}>Review Your Listing</h2>
        <div className={styles.reviewSectionContainer}>
          <div className={styles.reviewSection}>
            <div className={styles.section}>
              <ReviewCategories />
            </div>
            <div className={styles.section}>
              <ReviewTitleAndDescription />
            </div>
            <div className={styles.section}>
              <ReviewPrice />
            </div>
            <div className={styles.section}>
              <ReviewDetails />
            </div>
            <div className={styles.section}>
              <ReviewLocation />
            </div>
            <div className={styles.section}>
              <ReviewFeatures />
            </div>
            <div className={styles.section}>
              <ReviewPhotos />
            </div>
            <div className={styles.section}>
              <ReviewVideos />
            </div>
            <div className={styles.section}>
              <ReviewAttachments />
            </div>
          </div>
        </div>
        <div className={styles.confirmation}>
          By clicking the "Publish My Listing" button below, you confirm that all the
          information provided is accurate and that you agree to our{" "}
          <Link href="#" className={styles.link}>
            terms and conditions.
          </Link>
        </div>
      </div>
    </FormWrapper>
  );
};

export default SubmitForm;
