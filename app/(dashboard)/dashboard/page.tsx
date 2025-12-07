import styles from "./styles.module.scss";
import LinkCard from "@/components/cards/LinkCard";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Dashboard</h1>
        <div className={styles.cards}>
          <Link href="/dashboard/create-listing" className={styles.card}>
            <LinkCard
              image="/bear.jpg"
              label="Post Your Ads"
              cardSize="large"
            />
          </Link>
          <Link href="/dashboard/my-listings" className={styles.card}>
            <LinkCard image="/bear.jpg" label="My Ads" cardSize="large" />
          </Link>
          <Link href="/dashboard/liked-ads" className={styles.card}>
            <LinkCard image="/bear.jpg" label="Liked Ads" cardSize="large" />
          </Link>
          <Link href="/dashboard/notifications" className={styles.card}>
            <LinkCard
              image="/bear.jpg"
              label="Notifications"
              cardSize="large"
            />
          </Link>
          <Link href="/dashboard/messages" className={styles.card}>
            <LinkCard image="/bear.jpg" label="Messages" cardSize="large" />
          </Link>
          <Link href="/dashboard/settings" className={styles.card}>
            <LinkCard image="/bear.jpg" label="Settings" cardSize="large" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
