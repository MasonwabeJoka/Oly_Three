import AttachmentUploadSection from "@/components/AttachmentUploadSection";
import styles from "./UploadAttachments.module.scss";
import useUploadFiles from "../store/useUploadFiles";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";


const UploadAttachments = () => {
  const { uploadedAttachments } = useUploadFiles();
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue("uploadAttachments", uploadedAttachments);
  }, [uploadedAttachments, setValue]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Attachments</h1>
      <p className={styles.description}>
        Upload supporting files like brochures, manuals, or documents relevant
        to your listing.
      </p>
      <AttachmentUploadSection />
    </div>
  );
};

export default UploadAttachments;
