import styles from "./NotificationsCard.module.scss";
import Avatar from "@/components/Avatar";

const NotificationsCard = (image: any) => {
  return (
    <article>
      <div className={styles.avatarContainer}>
        <Avatar
          className="avatar"
          avatar={image}
          imageAlt="Profile Picture"
          avatarSize="small"
          priority
        />
      </div>
    </article>
  );
};

export default NotificationsCard;
