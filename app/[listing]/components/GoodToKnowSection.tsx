import styles from "../styles.module.scss";
import { Ad } from "@/sanity/Types/Ad";
import GoodToKnow from "./ListingSpecifications";

interface GoodToKnowSectionProps {
  ad: Ad | null;
}

const GoodToKnowSection = ({ ad }: GoodToKnowSectionProps) => {
  return (
    <div className={`${styles.moreInfoContainer} ${styles.detailsContainer}`}>
      <h4 className={`${styles.title} ${styles.detailsTitle}`}>Good To Know</h4>
      <GoodToKnow ad={ad} />
    </div>
  );
};

export default GoodToKnowSection;
