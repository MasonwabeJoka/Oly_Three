import { FormWrapper } from "./FormWrapper";
import styles from "./UploadPhotos.module.scss";
import UploadBox from "@/components/UploadBox";
import UploadsSection from "../components/UploadsSection";
import Button from "@/components/Buttons";

const UploadPhotos = ({ goTo }: { goTo: (index: number) => void }) => {
  return (
    <FormWrapper title="Upload Photos">
      <div className={styles.container}>
        <div className={styles.uploadBox}>
          <UploadBox mediaType="photo" required={true} accept="image/*" />
        </div>
        <div className={styles.uploadedPhotos}>
          <UploadsSection />
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
            onClick={() => goTo(14)}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default UploadPhotos;
