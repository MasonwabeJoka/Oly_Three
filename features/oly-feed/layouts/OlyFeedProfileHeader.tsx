import styles from "./OlyFeedProfileHeader.module.scss";
import Button from "@/components/Buttons";
import Avatar from "@/components/Avatars";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  image: string;
  bio: string;
  type?: "User" | "Group";
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  image,
  bio,
  type,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.avatarContainer}>
          <Avatar
            className={styles.avatar}
            avatar={image}
            imageAlt="Profile Picture"
            avatarSize="regular"
            priority
          />
        </div>
        <div className={styles.nameContainer}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.username}>@{username}</p>
        </div>
        <p className={styles.bio}>{bio}</p>
      </div>
      <Button
        className={styles.editButton}
        buttonChildren="Edit"
        buttonType="normal"
        buttonSize="small"
        name="edit-btn"
        type="button"
        ariaLabel="Edit Button"
        autoFocus={false}
        disabled={false}
      />
    </div>
  );
};

export default ProfileHeader;
