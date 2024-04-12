import styles from "./styles.module.scss";
import Button from "@/components/Buttons";
import Link from "next/link";

const UploadMedia = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Upload Media</h4>
      <div className={styles.mediaType}>
        <Link
          href="/dashboard/post-your-ad/upload-media/upload-photos"
          className={styles.buttonContainer}
        >
          <Button
            className={styles.images}
            buttonChildren="Upload Images"
            buttonType="primary"
            buttonSize="large"
            name="upload-images-btn"
            type="button"
            ariaLabel="Upload Images Button"
            autoFocus={false}
            disabled={false}
            dashboard
          />
        </Link>
        <Link
          href="/dashboard/post-your-ad/upload-media/upload-videos"
          className={styles.buttonContainer}
        >
          <Button
            className={styles.videos}
            buttonChildren="Upload Videos"
            buttonType="normal"
            buttonSize="large"
            name="upload-videos-btn"
            type="button"
            ariaLabel="Upload Videos Button"
            autoFocus={false}
            disabled={false}
            dashboard
          />
        </Link>
        <Link
          href="/dashboard/post-your-ad/upload-media/upload-attachments"
          className={styles.buttonContainer}
        >
          <Button
            className={styles.attachment}
            buttonChildren="Upload Attachments"
            buttonType="normal"
            buttonSize="large"
            name="upload-attachment-btn"
            type="button"
            ariaLabel="Upload Attachment Button"
            autoFocus={false}
            disabled={false}
            dashboard
          />
        </Link>
      </div>
      <div className={styles.buttons}>
        <div className={styles.buttonContainer}>
          <Link href="/dashboard/post-your-ad/location">
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
          <Link href="/dashboard/post-your-ad/ad-description">
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

export default UploadMedia;
