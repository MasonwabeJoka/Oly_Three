import { Ad } from "@/sanity/Types/Ad";
import styles from "./GoodToKnow.module.scss";

const GoodToKnow = ({ ad }: { ad: Ad }) => {
  return (
    <div className={styles.infoItems}>
      {ad?.details?.map((details, index) => {
        let updatedDetails = { ...details };

        // Check if the details object has an array value
        if (Array.isArray(details.arrayKey)) {
          // Join the array elements into a comma-separated string
          const arrayString = details.arrayKey.join(", ");
          // Create a new object with the string value instead of the array
          updatedDetails = { ...details, arrayKey: arrayString };
        }

        const detailsArray = Object.values(updatedDetails) as string[];

        return (
          <div className={`${styles.infoItem} ${styles.detail}`} key={index}>
            <div className={styles.bulletContainer}>
              <div className={styles.bullet} key={index}></div>
            </div>
            <div
              className={`${styles.infoItemContainer} ${styles.detailContainer}`}
            >
              {detailsArray.map((detail, detailIndex) => (
                <p key={detailIndex}>{detail}</p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GoodToKnow;
