import styles from "./UploadAttachments.module.scss";
import Link from "next/link";
import Button from "@/components/Buttons";
import UploadBox from "@/components/UploadBox";
import { FormWrapper } from "./FormWrapper";

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
