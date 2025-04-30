import Comment from "./Comment";
import styles from "./CommentsSection.module.scss";
import TextArea from "./TextArea";
import TextAreaComponent from "./TextAreaComponent";
import TextAreaTemp from "./TextAreaTemp";


const CommentsSection = () => {
  return (
    <section className={styles.container}>

      <div className={styles.commentInputContainer}>
      <h2 className={styles.title}>
        <span className={styles.commentCount}>100</span>
        <span className={styles.commentLabel}>Comments</span>
      </h2>
       
      <TextAreaComponent
        className={styles.commentInput}
        id="my-textarea"
        name="my-textarea"
        maxHeight={240}
        height ={50}
        characterLimit={5}
        placeholder="Share your thoughts..."
        submitButtonText="Comment"
        size="large"
        required
        onChange={(e) => console.log(e.target.value)}
      />
      </div>


      <div className={styles.comment}>
        <Comment />
      </div>
      <div className={styles.reply}>
        <Comment />
      </div>
      <div className={styles.replyTwo}>
        <Comment />
      </div>
      <div className={styles.replyThree}>
        <Comment />
      </div>
      <div className={styles.replyFour}>
        <Comment />
      </div>
      <div className={styles.replyFive}>
        <Comment />
      </div>
    </section>
  );
};

export default CommentsSection;
