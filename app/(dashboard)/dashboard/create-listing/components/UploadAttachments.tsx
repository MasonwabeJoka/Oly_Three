import AttachmentUploadSection from "@/components/AttachmentUploadSection";
import styles from "./UploadAttachments.module.scss";
import { attachments } from "@/data/attachments";
import useUploadFiles from "../store/useUploadFiles";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

const UploadAttachments = () => {
  const {uploadedAttachments } = useUploadFiles();
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue("uploadAttachments", uploadedAttachments);
  }, [uploadedAttachments, setValue]);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.mediaSection} ${styles.uploadedAttachmentsContainer}`}
      >
        <AttachmentUploadSection attachments={attachments} />
      </div>
    </div>
  );
};

export default UploadAttachments;
