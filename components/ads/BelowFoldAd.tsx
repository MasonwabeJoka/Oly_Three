import Image from "next/image";
import styles from "./BelowFoldAd.module.scss";
import VideoAd from "../VideoAd";

const BelowFoldAd = () => {
  return (
    <div className={styles.container}>
      <div className={styles.adContainer}>
        Ad
        <VideoAd />
      </div>
    </div>
  );
};

export default BelowFoldAd;
