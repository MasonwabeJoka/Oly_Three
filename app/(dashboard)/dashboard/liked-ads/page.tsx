import styles from "./styles.module.scss";
import MaxWidthWrapper from "@/components/utilComponents/MaxWidthWrapper";
import LikedAds from "./components/LikedAds";

const Page = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Liked Ads</h4>
      <div className={styles.listingsContainer}>
        <LikedAds />
      </div>
    </div>
  );
};

export default Page;
