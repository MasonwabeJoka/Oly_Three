import styles from "./Contact.module.scss";
import Avatar from "@/components/Avatar";
import { User } from "@/sanityTemp/Types/User";

interface ContactProps {
  name: string;
  avatar: string;
  avatarSize: "small" | "regular" | "large";
  isOnline: boolean;
  user: User;
}

const Contact: React.FC<ContactProps> = ({
  name,
  avatar,
  avatarSize,
  isOnline,
  user,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar
          className={styles.avatar}
          avatar={avatar}
          avatarSize={avatarSize}
          imageAlt={`${name}'s profile picture`}
        />
        {isOnline && <div className={styles.onlineIndicator} />}
      </div>
      <div className={styles.contactInfo}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.status}>
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default Contact;
