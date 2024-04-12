import MaxWidthWrapper from "@/components/utilComponents/MaxWidthWrapper";
import styles from "./styles.module.scss";
import LinkCard from "@/components/cards/LinkCard";

const Dashboard = () => {
  return (
    <MaxWidthWrapper className={styles.maxWidthWrapper}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
         
          <h4 className={styles.title}>Dashboard</h4>
          <div className={styles.cards}>
            <div className={styles.card}>
              <LinkCard
                image="/bear.jpg"
                label="Post Your Ads"
                cardSize="large"
              />
            </div>
            <div className={styles.card}>
              <LinkCard 
                image="/bear.jpg"
                label="My Ads"
                cardSize="large"
              />
            </div>
            <div className={styles.card}>
              <LinkCard
                image="/bear.jpg"
                label="Liked Ads"
                cardSize="large"
              />
            </div>
            <div className={styles.card}>
              <LinkCard
                image="/bear.jpg"
                label="Notifications"
                cardSize="large"
              />
            </div>
            <div className={styles.card}>
              <LinkCard
                image="/bear.jpg"
                label="Messages"
                cardSize="large"
              />
            </div>
            <div className={styles.card}>
              <LinkCard
                image="/bear.jpg"
                label="Settings"
                cardSize="large"
              />
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
    
  );
};

export default Dashboard;
