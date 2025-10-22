'use client';
import styles from "./Feedback.module.scss";
import { feedbackLabels } from "@/data/feedbackData";
import Tabs from "./Tabs";
import FeedbackCard from "./cards/FeedbackCard";
import { feedbackData } from "@/data/feedbackData";
import { useState } from "react";
import Link from "next/link";

const Feedback = () => {
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const { id, title, feedback, user, profilePicture, date, type, status } = feedbackData;

  const data = feedbackData.filter(feedback =>  selectedTab === "All" || feedback.type === selectedTab)
  return (
    <div className={styles.container}>
      <div className={styles.titleTabWrapper}>

      <h1 className={styles.title}>Feedback</h1>
      <div className={styles.tabsContainer}>
        <Tabs
          tabs={feedbackLabels}
          condition={false}
          width={954}
          collageViewWidth={988}
          dashboard={false}
          onClickHandlers={feedbackLabels.map(label => () => setSelectedTab(label))}
        />
      </div>
      </div>
      <div className={styles.feedbackCardsContainer}>
        {data.map((feedback) => (
          <Link href={`/feedback/${feedback.id}`} key={feedback.id}>
            <FeedbackCard key={feedback.id} {...feedback} />
          </Link>
        ))}
        

      </div>
    </div>
  );
};

export default Feedback;