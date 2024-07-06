"use client";
import Tabs from "@/components/Tabs";
import { useState } from "react";
import styles from "./styles.module.scss";
import { useResponsive } from "@/store/useResponsive";
import useSidebarStore from "@/store/useSidebarStore";
import NotificationsCard from "@/components/cards/NotificationsCard";
import { NotificationsData } from "@/data/NotificationsData";
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
                  title: "Likes",
                  count: 2,
                },
                {
                  title: "More+",
                  count: 0,
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
            tabs={[
              {
                title: "Unread",
                count: 5,
              },
              "Read",
              "Select All",
              "Delete",
            ]}
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
      <div className={styles.notificationsContainer}>
        <div className={styles.timeRangeContainer}>
          <p className={styles.timeRange}>Today</p><div className={styles.count}>5</div>
        </div>
        {NotificationsData.map((notification) => (
          <div className={styles.notificationCard} key={notification.id}>
            <NotificationsCard
              key={notification.id}
              isOnline={notification.isOnline}
              isRead={notification.isRead}
              avatar={notification.avatar}
              notificationType={notification.notificationType}
              name={notification.name}
              message={notification.message}
              messageBody={notification.messageBody}
              time={notification.time}
              image={notification.image}
              buttons={notification.buttons}
              buttonLinks={notification.buttonLinks}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
