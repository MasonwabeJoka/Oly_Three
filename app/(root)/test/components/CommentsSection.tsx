"use client";
import { useState } from "react";
import { useCommentsStore } from "../store/useCommentsStore";
import { CommentCard } from "./CommentCard";
import styles from "./CommentsSection.module.scss";

export const CommentsSection = () => {
  const { comments, addComment } = useCommentsStore();
  const [newComment, setNewComment] = useState("");

  const handleAdd = () => {
    if (!newComment.trim()) return;
    addComment(newComment);
    setNewComment("");
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.inputBox}>
        <textarea
          placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAdd}>Comment</button>
      </div>

      <h3 className={styles.count}>{comments.length} Comments</h3>

      <div className={styles.list}>
        {comments.map((c) => (
          <CommentCard key={c.id} comment={c} />
        ))}
      </div>
    </section>
  );
};
