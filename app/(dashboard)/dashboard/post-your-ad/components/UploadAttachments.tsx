import styles from "./UploadAttachments.module.scss";
import Link from "next/link";
import Button from "@/components/Buttons";
import UploadBox from "@/components/UploadBox";

const UploadAttachments = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Upload Attachments</h4>
      <div className={styles.uploadBox}>
        <UploadBox
          mediaType="attachment"
          required={true}
          accept="application/*, text/*,image/*"
        />
      </div>
      {/* <div className={styles.buttons}>
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
            />
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default UploadAttachments;
