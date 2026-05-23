import MyAds from "./components/MyListings";
import styles from "./styles.module.scss";
import { listingsData } from "@/data/ListingsData";

const Page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Listings</h1>

      <div className={styles.cardsContainer}>
        <MyAds listingsData={listingsData} />
      </div>

      
    </div>
  );
};

export default Page;
