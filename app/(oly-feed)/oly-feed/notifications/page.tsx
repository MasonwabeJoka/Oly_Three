import styles from "./styles.module.scss";
import NotificationsCard from "@/features/oly-feed/components/cards/NotificationsCard";
import { fetchUser, getNotifications } from "@/utils/serverActions/userActions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const Notifications = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch Notifications
  const notifications = await getNotifications(userInfo.id);
  return (
    <section>
      <h1>Notifications</h1>
      <section>
        {notifications.length > 0 ? (
          <>
            {notifications.map((notification: any) => (
              <Link
                key={notification._id}
                href={`/oly-feed/post/${notification.parentId}`}
              >
                <NotificationsCard image={notification.author.image} />
                <p>
                  <span>{notification.author.name}</span> replied to your post
                </p>
              </Link>
            ))}
          </>
        ) : (
          <p>No notifications yet</p>
        )}
      </section>
    </section>
  );
};

export default Notifications;
