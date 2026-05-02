"use client";
import styles from "./AttachmentUploadSection.module.scss";
import UploadButton from "./UploadButton";
import AttachmentCard from "./cards/AttachmentCard";
import useUploadFiles from "@/app/(dashboard)/dashboard/create-listing/store/useUploadFiles";
import { useCallback, useEffect } from "react";
import { DropZone, Text } from "react-aria-components";

type AttachmentItem = {
  id: string;
  title: string;
  url: string;
  size: string;
  type: string;
  uploadedAt: string;
};

const AttachmentUploadSection = ({
  attachments = [],
}: {
  attachments?: AttachmentItem[];
}) => {
  const uploadedAttachments = useUploadFiles((state) => state.uploadedAttachments);
  const addAttachment = useUploadFiles((state) => state.addAttachment);
  const cleanupEmptyFiles = useUploadFiles((state) => state.cleanupEmptyFiles);

  useEffect(() => {
    cleanupEmptyFiles();
  }, [cleanupEmptyFiles]);

  const processAttachment = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        if (!url?.trim()) return;
        addAttachment(url);
      };
      reader.readAsDataURL(file);
    },
    [addAttachment],
  );

  const attachmentItems =
    uploadedAttachments.length > 0
      ? uploadedAttachments.map((url, index) => ({
          id: `${index + 1}`,
          title: `Attachment ${index + 1}`,
          url,
          size: "",
          type: "",
          uploadedAt: "",
        }))
      : attachments;
  const hasAttachments = (attachmentItems?.length ?? 0) > 0;

  return (
    <div className={styles.container}>
      <DropZone
        className={`${styles.dropzone} ${
          hasAttachments ? styles.hasAttachments : ""
        }`}
        onDrop={(e: any) =>
          e.items
            .filter((item: any) => item.kind === "file")
            .forEach(async (item: any) => {
              if (item.kind !== "file") return;
              const file = await item.getFile();
              processAttachment(file);
            })
        }
      >
        {!hasAttachments && <Text className={styles.text}>Drop Attachments Here</Text>}
        {attachmentItems?.map((attachment: AttachmentItem) => (
          <AttachmentCard key={attachment.id} {...attachment} />
        ))}
        <div className={styles.buttonContainer}>
          <UploadButton
            mediaType="attachment"
            colour="primary"
            size="small"
            required={true}
            className={styles.uploadButton}
            accept="application/*,.pdf, .doc, .docx, .txt, .rtf, .odt, .xls, .xlsx, .ppt, .pptx"
          />
        </div>
      </DropZone>
    </div>
  );
};

export default AttachmentUploadSection;
