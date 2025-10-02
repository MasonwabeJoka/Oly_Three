import styles from "./FeaturedServicesSlideFrontend.module.scss";
import { FeaturedServicesData } from "@/data/FeaturedServicesData";
import FeaturedServicesSlideFrontendClient from "./FeaturedServicesSlideFrontendClient";

const FeaturedServicesSlideFrontend = () => {
  return (
    <div className={styles.container}>
      <div className={styles.featureContainer}>
        <FeaturedServicesSlideFrontendClient
          productData={FeaturedServicesData}
        />
      </div>
    </div>
  );
};

export default FeaturedServicesSlideFrontend;
