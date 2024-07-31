import styles from "./styles.module.scss";
import Link from "next/link";
import Button from "@/components/Buttons";
import UploadBox from "@/components/UploadBox";

const UploadPhotos = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Upload Photos</h4>
      <div className={styles.uploadBox}>
        <UploadBox mediaType="photo" required={true} accept="image/*" />
      </div>
      <div className={styles.buttons}>
        <div className={styles.buttonContainer}>
          <Link href="/dashboard/my-ads/promote-your-ads">
            <Button
              className={styles.proceedButton}
              buttonChildren="Proceed"
              buttonType="normal"
              buttonSize="large"
              name="proceed-btn"
              type="button"
              ariaLabel="Proceed Button"
              autoFocus={false}
              disabled={false}
              dashboard
            />
          </Link>
        </div>
        <div className={styles.buttonContainer}>
          <Link href="/dashboard/post-your-ad/upload-media">
            <Button
              className={styles.backButton}
              buttonChildren="Back"
              buttonType="normal"
              buttonSize="large"
              name="back-btn"
              type="button"
              ariaLabel="Back Button"
              autoFocus={false}
              disabled={false}
              dashboard
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UploadPhotos;
