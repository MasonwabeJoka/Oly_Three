"use client";
import { useState, useRef } from "react";
import Avatar from "./Avatar";
import styles from "./Comment.module.scss";
import Reaction from "./Reaction";
import TextAreaComponent from "./TextArea";
import TextInputBar from "./TextInputBar";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Link from "next/link";
// TODO: Add icons for reactions
const Comment = ({ isPostOpen }: { isPostOpen: boolean }) => {
  const [isReplying, setIsReplying] = useState(false);
  const replyRef = useRef<HTMLElement>(null);
  const text =
    "This is a sample comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit. his is a sample comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a sample comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit. his is a sample comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

  useOnClickOutside(replyRef, (event: MouseEvent | TouchEvent) => {
    const target = event.target as Element;
    if (target.closest(`.${styles.reply}`)) return;
    setIsReplying(false);
  });

  const handleReply = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsReplying(!isReplying);
  };

  const href = isPostOpen ? "#" : "/articles/oly-shops/${articleId}/post";

  return (
    <Link
      href={href}
      className={`${styles.container} ${isPostOpen ? styles.postOpenContainer : styles.standardContainer}`}
    >
      <div className={styles.wrapper}>
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
          {!isPostOpen && text.length > 260 ? `${text.slice(0, 260)}...` : text}
        </div>
        <div className={styles.reactions}>
          <div className={styles.reactionsWrapper}>
            <span
              onClick={handleReply}
              className={`${styles.reaction} ${styles.reply}`}
            >
              <Reaction
                icon="/icons/comments.svg"
                label="Reply"
                showLabel={false}
              />
            </span>
            <span className={`${styles.reaction} ${styles.like}`}>Like</span>
            <span className={`${styles.reaction} ${styles.unlike}`}>
              Dislike
            </span>
          </div>
        </div>
      </div>
      <div
        ref={replyRef as any}
        className={`${styles.replyContainer} ${isReplying ? styles.visible : ""}`}
      >
        {isReplying && (
          <TextInputBar
            containerClassName={styles.commentInput}
            textareaClassName={styles.textarea}
            id="reply-textarea"
            name="reply-textarea"
            maxHeight={240}
            placeholder="Reply..."
            submitButtonText="Reply"
            required
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              console.log(e.target.value)
            }
            hasShadow={false}
          />
        )}
      </div>
    </Link>
  );
};

export default Comment;
