"use client";
import { useState, useRef } from "react";
import Avatar from "../Avatar";
import styles from "./FeedbackDetailsCard.module.scss";
import Reaction from "../Reaction";
import TextInputBar from "../TextInputBar";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { formatRelativeTime } from "@/utils/formatterFunctions/Formatter";
import Button from "../Buttons";

interface FeedbackDetailsCardProps {
  id: string;
  user: string;
  title: string;
  feedback: string;
  profilePicture: string;
  date: string;
  time: string;
  type: string;
  status?: string;
}
const FeedbackDetailsCard = ({
  id,
  user,
  title,
  feedback,
  profilePicture,
  date,
  time,
  type,
  status,
}: FeedbackDetailsCardProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const replyRef = useRef<HTMLElement>(null);

  useOnClickOutside(replyRef, (event: MouseEvent | TouchEvent) => {
    const target = event.target as Element;
    if (
      target.closest(`.${styles.chatButton}`) ||
      target.closest(`.${styles.buttonContainer}`)
    )
      return;
    setIsReplying(false);
  });

  const handleReply = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsReplying(!isReplying);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.userContainer}>
            <div className={styles.profile}>
              <div className={styles.avatar}>
                <Avatar avatar={profilePicture} avatarSize="regular" />
              </div>
              <div className={styles.profileNameContainer}>
                <div className={styles.profileName}>
                  <span className={styles.fullName}>{user}</span>{" "}
                </div>
                <div className={styles.feedbackAge}>
                  <span>{formatRelativeTime(date, "en-ZA")}</span>
                </div>
              </div>
            </div>
          </div>
          <p className={styles.title}>{title}</p>
          <p className={styles.feedback}>{feedback}</p>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.chatButton}
            buttonChildren="Chat"
            buttonType="normal"
            buttonSize="medium"
            name="chat-btn"
            type="button"
            ariaLabel="Chat Button"
            autoFocus={false}
            onClick={handleReply}
          />
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
    </div>
  );
};

export default FeedbackDetailsCard;
