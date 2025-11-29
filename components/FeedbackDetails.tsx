import FeedbackChatComponent from "./cards/FeedbackDetailsCard";
import styles from "./FeedbackDetails.module.scss";
interface FeedbackDetailsProps {
  id: string;
  email: string;
  title: string;
  feedback: string;
  user?: string;
  profilePicture: string;
  date: string;
  time: string;
  type: string;
  status?: string;
}

const FeedbackDetails = ({
  id,
  user,
  email,
  title,
  feedback,
  profilePicture,
  date,
  time,
  type,
  status,
}: FeedbackDetailsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.userDetails}>
          <div>
            <div className={`${styles.nameContainer} ${styles.detail}`}>
              <p>Name:</p>
              <p>{user}</p>
            </div>
            <div className={`${styles.emailContainer} ${styles.detail}`}>
              <p>Email:</p>
              <p>{email}</p>
            </div>
            <div className={`${styles.dateContainer} ${styles.detail}`}>
              <p>Date:</p>
              <p>{date}</p>
            </div>
            <div className={`${styles.timeContainer} ${styles.detail}`}>
              <p>Time:</p>
              <p>{time}</p>
            </div>
            <div className={`${styles.typeContainer} ${styles.detail}`}>
              <p>Type:</p>
              <p>{type}</p>
            </div>
          </div>
        </div>
        <FeedbackChatComponent title={title} feedback={feedback} user={user} profilePicture={profilePicture} date={date} time={time} type={type} status={status} />
      </div>
    </div>
  );
};

export default FeedbackDetails;
