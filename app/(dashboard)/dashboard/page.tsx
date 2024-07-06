import MaxWidthWrapper from "@/components/utilComponents/MaxWidthWrapper";
import styles from "./styles.module.scss";
import LinkCard from "@/components/cards/LinkCard";
import Link from "next/link";

const Dashboard = () => {
  return (
    <MaxWidthWrapper className={styles.maxWidthWrapper}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
         
          <h4 className={styles.title}>Dashboard</h4>
          <div className={styles.cards}>
            <Link href="/dashboard/post-your-ad/home" className={styles.card}>
              <LinkCard
                image="/bear.jpg"
                label="Post Your Ads"
                cardSize="large"
              />
            </Link>
            <Link href="/dashboard/my-ads" className={styles.card}>
              <LinkCard 
                image="/bear.jpg"
                label="My Ads"
                cardSize="large"
              />
            </Link>
            <Link href="/dashboard/liked-ads" className={styles.card}>
              <LinkCard
                image="/bear.jpg"
                label="Liked Ads"
                cardSize="large"
              />
            </Link>
            <Link href="/dashboard/notifications" className={styles.card}>
              <LinkCard
                image="/bear.jpg"
                label="Notifications"
                cardSize="large"
              />
            </Link>
            <Link href="/dashboard/messages" className={styles.card}>
              <LinkCard
                image="/bear.jpg"
                label="Messages"
                cardSize="large"
              />
            </Link>
            <Link href="/dashboard/settings" className={styles.card}>
              <LinkCard
                image="/bear.jpg"
                label="Settings"
                cardSize="large"
              />
            </Link>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
    
  );
};

export default Dashboard;
