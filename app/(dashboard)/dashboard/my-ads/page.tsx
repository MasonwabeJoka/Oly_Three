import MyAds from "./components/MyAds";
import styles from "./styles.module.scss";
import { listingsData } from "@/data/ListingsData";

const Page = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>My Ads</h4>

      <div className={styles.cardsContainer}>
        <MyAds listingsData={listingsData} />
      </div>
    </div>
  );
};

export default Page;
