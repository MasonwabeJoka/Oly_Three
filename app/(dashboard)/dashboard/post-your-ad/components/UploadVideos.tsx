import { FormWrapper } from "./FormWrapper";
import styles from "./UploadVideos.module.scss";
import UploadBox from "@/components/UploadBox";
import { uploadVideosValidations } from "../validations/multiStepFormValidations";

const UploadVideos = () => {
  return (
    <FormWrapper title="Upload Videos">
      <div className={styles.container}>
        <div className={styles.uploadBox}>
          <UploadBox mediaType="video" required={true} accept="video/*" />
        </div>
      </div>
    </FormWrapper>
  );
};

export default UploadVideos;
