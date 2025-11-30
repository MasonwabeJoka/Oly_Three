import styles from "./AttachmentUploadSection.module.scss";
import Icon from "./Icon";
import ToggleButton from "./ToggleButton";
import UploadButton from "./UploadButton";

const AttachmentUploadSection = ({ attachments }: { attachments: any[] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {attachments?.map((attachment: any) => (
          <div key={attachment.id} className={styles.attachmentContainer}>
            <div className={styles.iconContainer}></div>
            <div className={styles.text}>
              <p className={styles.title}>{attachment.title}</p>
            </div>
            <div className={styles.publishButtonContainer}>
              <div className={styles.publishButton}>
                <ToggleButton id="publishButton" name="publishButton" />
              </div>
              <span className={styles.publishButtonText}>Publish</span>
            </div>
            <div className={styles.deleteButton}>
              <Icon
                className={styles.X}
                src="/icons/X.png"
                alt="X"
                width={10}
                height={10}
              />
            </div>
          </div>
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
