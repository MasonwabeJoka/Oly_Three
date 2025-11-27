import { FormWrapper } from "./FormWrapper";
import styles from "./UploadPhotos.module.scss";
import UploadBox from "@/components/UploadBox";
import ImageUploadSection from "./ImageUploadSection";
import Button from "@/components/Buttons";
import useUploadMediaStore from "../store/useUploadMediaStore";
import useUploadFiles from "../store/useUploadFiles";
import { uploadPhotosValidations } from "../validations/multiStepFormValidations";

const UploadPhotos = () => {
  const { uploadedImages } = useUploadFiles();
  const { setReorderPhotos, setUploadPhotos } = useUploadMediaStore();
  const reorderPhotos = () => {
    setReorderPhotos(true);
    setUploadPhotos(false);
  };
  return (
    <FormWrapper title="Upload Photos">
      <div className={styles.container}>
        <div className={styles.uploadBox}>
          <UploadBox mediaType="photo" required={true} accept="image/*" />
        </div>
        <div className={styles.uploadedPhotos}>
          <ImageSlider uploadedFiles={uploadedImages} />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.reorderButton}
            buttonChildren="Reorder Photos"
            buttonType="normal"
            buttonSize="large"
            name="reorder-btn"
            type="button"
            ariaLabel="Reorder Photos Button"
            autoFocus={false}
            disabled={false}
            dashboard
            onClick={reorderPhotos}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default UploadPhotos;
