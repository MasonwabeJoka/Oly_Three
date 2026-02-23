"use client";
import styles from "./FeedbackCard.module.scss";
import Button from "@/components/Buttons";
import Avatar from "@/components/Avatar";
import Image from "@/components/Image";
import Checkbox from "@/components/Checkbox";
import Link from "next/link";
import { useState } from "react";
import Icon from "../Icon";
import { FeedbackType } from "@/data/feedbackData";
import {formatRelativeTime } from "@/utils/formatterFunctions/Formatter";

type NotificationProps = {
  id: string;
  title: string;
  description: string;
  user?: string;
  profilePicture: string;
  date: string; // ISO string for sorting/filtering
  type: FeedbackType;
  status?: "open" | "in-progress" | "resolved" | "closed";
};

const FeedbackCard = ({
  id,
  title,
  description,
  user,
  profilePicture,
  date,
  type,
  status,
}: NotificationProps) => {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.deleteButton}>
        <Icon
          className={styles.X}
          src="/icons/X.png"
          alt="X"
          width={14}
          height={14}
        />
      </div>
      <section
        className={styles.mainSection}
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        <div className={styles.isRead} />
        <div className={styles.avatar}>
          <Avatar
            className={styles.avatar}
            avatar={profilePicture}
            avatarSize="regular"
          />
        </div>
        <div className={styles.info}>
          <p className={styles.feedbackType}>{type}</p>
          <div className={styles.message}>
            <p className={styles.title}>
             {title}
            </p>
     
            <p className={styles.body}>{description}</p>
          </div>
          <p className={styles.time}>{formatRelativeTime(date, "en-ZA")}</p>
        </div>
      
        <div className={styles.checkContainer}>
          <Checkbox
            className={styles.checkbox}
            id="1"
            isFeed={false}
            checkedColour="#14d6ff"
            hoverColour="#ffff"
            checkedHovered="#ccf6ff"
          />
        </div>
      </section>
  
    </div>
  );
};

export default FeedbackCard;
