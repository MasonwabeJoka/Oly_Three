import Button from "@/components/Buttons";
import styles from "./ReviewListing.module.scss";

interface Props {
  onNext: () => void;
  onPublish?: () => void;
  goTo?: () => void;
}

const ReviewListing = ({ onNext, onPublish }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.descriptionContainer}>
        <p className={styles.title}>Review Your Listing</p>
        <p className={styles.description}>
          Your listing is ready to go live. Please review all the details
          you've entered, and when you're ready, click "Publish My Listing" to
          share it with the world.
        </p>
        {onPublish && (
          <div className={styles.publishImmediately}>
            <p className={styles.description}>
              Already happy with everything? Skip the review and go live now.
            </p>
            <Button
              buttonChildren="Publish Immediately"
              buttonType="normal"
              buttonSize="large"
              name="publish-immediately-btn"
              type="button"
              ariaLabel="Publish Immediately"
              autoFocus={false}
              disabled={false}
              dashboard
              onClick={onPublish}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewListing;
