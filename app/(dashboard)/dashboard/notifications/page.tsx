"use client";
import Tabs from "@/components/Tabs";
import { useState } from "react";
import styles from "./styles.module.scss";
import { useResponsive } from "@/store/useResponsive";
import useSidebarStore from "@/store/useSidebarStore";

const Notifications = () => {
  const [expanded, setExpanded] = useState(false);
  const [altWidth, setAltWidth] = useState(954);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Notifications</h1>
      <div className={styles.tabsWrapper}>
        {!isMobile && (
          <div className={styles.notificationTabs}>
            <Tabs
              tabs={[
                "All",
                "Ads",
                "Messages",
                // "Likes",
                "More+",
              ]}
              condition={!expanded}
              width={954}
              altWidth={altWidth}
              dashboard
              onClickHandlers={
                [
                  // showAllNotifications
                  // showAds,
                  // showMessages,
                  // ShowLikes,
                  // RevealMore
                ]
              }
            />
          </div>
        )}

        <div className={styles.selectDelete}>
          <Tabs
            tabs={["Select All", "Delete"]}
            condition={!expanded}
            width={954}
            altWidth={altWidth}
            dashboard
            onClickHandlers={
              [
                // selectAll,
                // DeleteSelected,
              ]
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
