import Image from "@/components/Image";
import styles from "./AboveFoldAd.module.scss";

const AboveFoldAd = () => {
  return (
    <div className={styles.container}>
      <div className={styles.adContainer}>
        Ad
        <div className={styles.imageContainer}>
          <Image
            src="https://fastly.picsum.photos/id/830/1300/200.jpg?hmac=m8fdkf3QoO94k44M5vVpB1h-qZKOb46CuIJl43h9QDQ"
            alt="above fold ad"
            width={1300}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default AboveFoldAd;
