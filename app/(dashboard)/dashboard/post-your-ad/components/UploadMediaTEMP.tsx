import styles from "./UploadMedia.module.scss";
import Button from "@/components/Buttons";
import { FormWrapper } from "./FormWrapper";
import useUploadMediaStore from "../store/useUploadMediaStore";
import { uploadMediaValidations } from "../validations/multiStepFormValidations";
// Todo: Set validation so that at least one of the media types is selected.
const UploadMedia = () => {
  const {setUploadPhotos, setUploadVideos, setUploadAttachments} = useUploadMediaStore();
  return (
    <FormWrapper title="Upload Media">
      <div className={styles.container}>
        <div className={styles.mediaType}>
          <div className={styles.buttonContainer}>
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
              onClick={() => setUploadPhotos(true)}
            />
          </div>
          <div className={styles.buttonContainer}>
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
              onClick={() => setUploadVideos(true)}
            />
          </div>
          <div className={styles.buttonContainer}>
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
              onClick={() => setUploadAttachments(true)}
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default UploadMedia;
