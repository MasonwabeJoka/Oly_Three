import Comment from "./Comment";
import styles from "./CommentsSection.module.scss";
import TextAreaComponent from "./TextArea";

const CommentsSection = () => {
  return (
    <section className={styles.container}>
      <div className={styles.commentInputContainer}>
        <TextAreaComponent
          className={styles.commentInput}
          id="my-textarea"
          name="my-textarea"
          maxHeight={240}
          placeholder="Share your thoughts..."
          submitButtonText="Comment"
          size="large"
          required
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => console.log(e.target.value)}
        />
      </div>

      <div className={styles.commentsContainer}>
        <div className={styles.commentCount}>
          <span className={styles.count}>100</span>
          <span className={styles.commentLabel}>Comments</span>
        </div>
        <div className={styles.comment}>
          <Comment isPostOpen= {false} />
        </div>
        <div className={styles.comment}>
          <Comment isPostOpen={false}/>
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;
