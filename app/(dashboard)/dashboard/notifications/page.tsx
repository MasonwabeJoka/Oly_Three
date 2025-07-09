import styles from "./styles.module.scss";
import { NotificationsData } from "@/data/NotificationsData";
import Notifications from "./components/Notifications";
import NotificationsCard from "@/components/cards/NotificationsCard";

const Page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Notifications</h1>
      <div className={styles.tabsWrapper}>
        <Notifications/>
      </div>
      <div className={styles.notificationsContainer}>
        <div className={styles.timeRangeContainer}>
          <p className={styles.timeRange}>Today</p>
          <div className={styles.count}>5</div>
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

export default Page;