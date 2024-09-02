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

const SubmitForm = ({ goTo }: { goTo: (index: number) => void }) => {
  // https://chatgpt.com/share/45cb30a0-a739-4224-bea5-82b0c352dd28
  return (
    <FormWrapper title="Review Your Listing">
      <div className={styles.container}>
        <div className={styles.reviewSectionContainer}>
          <p className={styles.description}>
            Please review the information below to ensure everything is correct.
            If you need to make any changes, click the "Edit" button next to the
            relevant section.
          </p>
          <div className={styles.reviewSection}>
            <div className={styles.section}>
              <ReviewCategories goTo={goTo}/>
            </div>
            <div className={styles.section}>
              <ReviewTitleAndDescription goTo={goTo}/>
            </div>
            <div className={styles.section}>
              <ReviewPrice goTo={goTo}/>
            </div>
            <div className={styles.section}>
              <ReviewDetails goTo={goTo}/>
            </div>
            <div className={styles.section}>
              <ReviewLocation goTo={goTo}/>
            </div>
            <div className={styles.section}>
              <ReviewFeatures goTo={goTo}/>
            </div>
            <div className={styles.section}>
              <ReviewPhotos goTo={goTo}/>
            </div>
            <div className={styles.section}>
              <ReviewVideos goTo={goTo}/>
            </div>
            <div className={styles.section}>
              <ReviewAttachments goTo={goTo}/>
            </div>
          </div>
        </div>
        <div className={styles.confirmation}>
          By clicking the "Finish" button below, you confirm that all the
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
