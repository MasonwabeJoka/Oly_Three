import styles from "./AttachmentUploadSection.module.scss";
import Icon from "./Icon";
import ToggleButton from "./ToggleButton";
import UploadButton from "./UploadButton";
import AttachmentCard from "./cards/AttachmentCard";

const AttachmentUploadSection = ({
  attachments,
}: {
  attachments: {
    id: string;
    title: string;
    url: string;
    size: string;
    type: string;
    uploadedAt: string;
  }[];
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {attachments?.map((attachment: any) => (
          <AttachmentCard key={attachment.id} {...attachment} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <UploadButton
          mediaType="attachment"
          colour="normal"
          required={true}
          accept="application/*,.pdf, .doc, .docx, .txt, .rtf, .odt, .xls, .xlsx, .ppt, .pptx"
        />
      </div>
    </div>
  );
};

export default AttachmentUploadSection;
