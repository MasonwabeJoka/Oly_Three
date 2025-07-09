import styles from "./ProductOfferSlideFrontend.module.scss";
import { ProductOfferData } from "@/data/ProductOfferData";
import ProductOfferSlideFrontendClient from "./ProductOfferSlideFrontendClient";

const ProductOfferSlideFrontend = () => {
  return (
    <div className={styles.container}>
      <div className={styles.featureContainer}>
        <ProductOfferSlideFrontendClient productData={ProductOfferData} />
      </div>
    </div>
  );
};

export default ProductOfferSlideFrontend;