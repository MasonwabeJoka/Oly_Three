import { Ad } from "@/sanity/Types/Ad";
import styles from "./ListingDetails.module.scss";
import { listingDetails } from "@/data/listingDetails";
type Detail = {
  id: number;
  text: string;
};

const ListingDetails = ({ details }: { details: Detail[] }) => {
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.details}>
        {details.map((detail) => (
          <div className={styles.detail} key={detail.id}>
            <div className={styles.bulletContainer}>
              <div className={styles.bullet}></div>
            </div>

            <div className={styles.textContainer}>
              <p>{detail.text.slice(0, 128)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingDetails;
