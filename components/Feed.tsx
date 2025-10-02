"use client";
import styles from "./Feed.module.scss";
import { useState } from "react";
import OlyFeed from "@/features/oly-feed/OlyFeed";
import Button from "@/components/Buttons";
import useFeedStore from "@/store/feedStore";
import { usePathname } from 'next/navigation'

const Feed = () => {

  const isFeedOpen = useFeedStore((state) => state.isFeedOpen)
  const setIsFeedOpen = useFeedStore((state) => state.setIsFeedOpen)
  const pathname = usePathname()

  // const openOlyFeed = () => {
  //   setIsFeedOpen(true);
  // };

  const closeOlyFeed = () => {
    setIsFeedOpen(false);
  };
  return (
    <>
    {pathname !== '/listing' && (<aside className={`${styles.OlyFeed} ${isFeedOpen ? styles.open : styles.closed}`}>
      <Button
        className={`${styles.exitButton} ${styles.openCloseButtons} ${
          isFeedOpen ? styles.showBtn : styles.hideBtn
        }`}
        buttonChildren="X"
        buttonType="icon"
        buttonSize="small"
        name="exit-btn"
        type="button"
        ariaLabel="Exit Button"
        autoFocus={false}
        disabled={false}
        onClick={closeOlyFeed}
      />

      <OlyFeed />
    </aside>)}
    </>
  );
};

export default Feed;
