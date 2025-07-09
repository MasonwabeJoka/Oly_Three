"use client";
import Tabs from "@/components/Tabs";
import { useState } from "react";
import styles from "./Notifications.module.scss";
import { useResponsive } from "@/store/useResponsive";
import useSidebarStore from "@/store/useSidebarStore";

const Notifications = () => {
  const [expanded, setExpanded] = useState(false);
  const [altWidth, setAltWidth] = useState(954);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);

  const notificationOptionsTabs = [
    {
      title: "Unread",
      count: 5,
    },
    "Read",
    "Select All",
    "Delete",
  ];

  return (
    <>
      {!isMobile && (
        <div className={styles.notificationTypesTabs}>
          <Tabs
            tabs={[
              {
                title: "All",
                count: 5,
              },
              {
                title: "Ads",
                count: 1,
              },
              {
                title: "Messages",
                count: 0,
              },
              {
                title: "More+",
                count: 5,
              },
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
      <div className={styles.notificationOptionsTabs}>
        <Tabs
          tabs={notificationOptionsTabs}
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
    </>
  );
};

export default Notifications