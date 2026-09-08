import styles from "./UploadMediaTEMP.module.scss";
import Button from "@/components/Button";
import useUploadMediaStore from "../store/useUploadMediaStore";

interface UploadMediaProps {
  onNext?: () => void;
}

// Todo: Set validation so that at least one of the media types is selected.
const UploadMedia = ({ onNext }: UploadMediaProps) => {
  const { setUploadPhotos, setUploadVideos, setUploadAttachments } =
    useUploadMediaStore();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upload Media</h2>
      <p className={styles.description}>
        Choose which media types you want to add to your listing: images,
        videos, and attachments.
      </p>
      <div className={styles.mediaType}>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.images}
            children="Upload Images"
            buttonVariant="primary"
            buttonSize="large"
            ariaLabel="Upload Images Button"

            dashboard
            onClick={() => setUploadPhotos([])}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.videos}
            children="Upload Videos"
            buttonVariant="normal"
            buttonSize="large"
            ariaLabel="Upload Videos Button"

            dashboard
            onClick={() => setUploadVideos([])}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.attachment}
            children="Upload Attachments"
            buttonVariant="normal"
            buttonSize="large"
            ariaLabel="Upload Attachment Button"

            dashboard
            onClick={() => setUploadAttachments([])}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadMedia;
