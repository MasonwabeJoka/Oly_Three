import styles from "./UploadAttachments.module.scss";
import UploadBox from "@/components/UploadBox";
import { FormWrapper } from "./FormWrapper";
import { uploadAttachmentsValidations } from "../validations/multiStepFormValidations";
const UploadAttachments = () => {
  return (
    <FormWrapper title="Upload Attachments">
      <div className={styles.container}>
        <div className={styles.uploadBox}>
          <UploadBox
            mediaType="attachment"
            required={true}
            accept="application/*, text/*,image/*"
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default UploadAttachments;
