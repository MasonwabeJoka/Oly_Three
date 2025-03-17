import Avatar from "./Avatars";
import styles from "./Comment.module.scss";

const Comments = () => {
  return (
    <div className={styles.container}>
      <div className={styles.userContainer}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <Avatar avatar="/profilePic.jpg" avatarSize="small" />
          </div>
          <div className={styles.profileName}>
            <span>John Doe</span>
          </div>
        </div>
        {/* <div className={styles.bullet}>
          <span>&#8226;</span>
        </div> */}

        <div className={styles.commentAge}>
          <span>Aug 4</span>
        </div>
      </div>
      <div className={styles.comment}>
        This is a sample comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit. his is a sample comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
      <div className={styles.reactions}>
        <div className={styles.wrapper}>

        <span className={styles.reply}>Reply</span>
        <span className={styles.like}>Like</span>
        </div>
      </div>
    </div>
  );
};

export default Comments;
