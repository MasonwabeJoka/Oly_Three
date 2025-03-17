import Comment from "./Comment";
import styles from "./CommentsSection.module.scss";
import TextArea from "./TextArea";

const CommentsSection = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        <span className={styles.commentCount}>100</span>
        <span className={styles.commentLabel}>Comments</span>
      </h2>
      <TextArea 
       className={styles.commentInput}
       id="comment"
       required={false}
       name="comment"
       placeholder="Write a comment..."
       label="Comment"
       size="large"
      
      //  onClick={onClick}
      //  onFocus={onFocus}
      //  onBlur={onBlur}
      //  onChange={onChange}
      />
      <Comment />
    </section>
  );
};

export default CommentsSection;
