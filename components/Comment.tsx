import Avatar from "./Avatar";
import styles from "./Comment.module.scss";
// TODO: Add icons for reactions
const Comments = () => {
  return (
    <div className={styles.container}>
      <div className={styles.userContainer}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <Avatar avatar="/profilePic.jpg" avatarSize="regular" />
          </div>
          <div className={styles.profileNameContainer}>
            <div className={styles.profileName}>
              <span className={styles.fullName}>John Doe</span>{" "}
              <span className={styles.username}>@johndoe</span>
            </div>
            <div className={styles.commentAge}>
              <span>Aug 4</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.comment}>
        <span className={styles.replyTo}>reply to @manseeker</span>: This is a
        sample comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        his is a sample comment. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </div>
      <div className={styles.reactions}>
        <div className={styles.wrapper}>
          <span className={styles.reply}>Reply</span>
          <span className={styles.like}>Like</span>
          <span className={styles.like}>Dislike</span>
        </div>
      </div>
    </div>
  );
};

export default Comments;
