import styles from "./AuctionStartTime.module.scss";
import AuctionStartTimeClient from "./AuctionStartTimeClient";

const AuctionStartTime = () => {
  return (
    <div className={styles.container}>
      <AuctionStartTimeClient />
    </div>
  );
};

export default AuctionStartTime;
