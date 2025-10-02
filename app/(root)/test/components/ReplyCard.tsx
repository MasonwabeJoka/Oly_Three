"use client";

import { useCommentsStore } from "../store/useCommentsStore";
import { Reply } from "../data/comments";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import styles from "./ReplyCard.module.scss";

type Props = { reply: Reply; parentId: string };

export const ReplyCard = ({ reply, parentId }: Props) => {
  const { likeReply, dislikeReply } = useCommentsStore();

  return (
    <div className={styles.card}>
      <img src={reply.author.avatarUrl} alt={reply.author.name} className={styles.avatar} />
      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.name}>{reply.author.name}</span>
          <span className={styles.username}>@{reply.author.username}</span>
          <span className={styles.date}>{reply.date}</span>
        </div>
        <p className={styles.content}>{reply.content}</p>
        <div className={styles.actions}>
          <button onClick={() => likeReply(parentId, reply.id)}>
            <ThumbsUp size={16} /> {reply.likes}
          </button>
          <button onClick={() => dislikeReply(parentId, reply.id)}>
            <ThumbsDown size={16} /> {reply.dislikes}
          </button>
        </div>
      </div>
    </div>
  );
};
