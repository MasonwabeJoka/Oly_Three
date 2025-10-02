"use client";
import { useState } from "react";
import { Comment } from "../data/comments";
import { ReplyCard } from "./ReplyCard";
import { useCommentsStore } from "../store/useCommentsStore";
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import styles from "./CommentCard.module.scss";

type Props = { comment: Comment };

export const CommentCard = ({ comment }: Props) => {
  const { addReply, likeComment, dislikeComment } = useCommentsStore();
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);

  const submitReply = () => {
    if (!replyText.trim()) return;
    addReply(comment.id, replyText);
    setReplyText("");
    setShowReplyBox(false);
  };

  return (
    <div className={styles.card}>
      <img src={comment.author.avatarUrl} alt={comment.author.name} className={styles.avatar} />
      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.name}>{comment.author.name}</span>
          <span className={styles.username}>@{comment.author.username}</span>
          <span className={styles.date}>{comment.date}</span>
        </div>
        <p className={styles.content}>{comment.content}</p>
        <div className={styles.actions}>
          <button onClick={() => setShowReplyBox(!showReplyBox)}>
            <MessageSquare size={16} /> Reply
          </button>
          <button onClick={() => likeComment(comment.id)}>
            <ThumbsUp size={16} /> {comment.likes}
          </button>
          <button onClick={() => dislikeComment(comment.id)}>
            <ThumbsDown size={16} /> {comment.dislikes}
          </button>
        </div>

        {showReplyBox && (
          <div className={styles.replyBox}>
            <textarea
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button onClick={submitReply}>Reply</button>
          </div>
        )}

        {comment.replies.length > 0 && (
          <div className={styles.replies}>
            {comment.replies.map((r) => (
              <ReplyCard key={r.id} reply={r} parentId={comment.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
