import Icon from "../Icon";
import ToggleButton from "../ToggleButton";
import styles from "./AttachmentCard.module.scss";
interface AttachmentCardProps {
  id: string;
  title: string;
  url: string;
  size: string;
  type: string;
  uploadedAt: string;
}

const AttachmentCard = ({
  id,
  title,
  url,
  size,
  type,
  uploadedAt,
}: AttachmentCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}></div>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.publishButtonContainer}>
        <div className={styles.publishButton}>
          <ToggleButton
            id={`publishButton-${id}`}
            name={`publishButton-${id}`}
          />
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
  );
};

export default AttachmentCard;
