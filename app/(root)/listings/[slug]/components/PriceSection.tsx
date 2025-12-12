import { Ad } from "@/sanityTemp/Types/Ad";
import styles from "./PriceSection.module.scss";
import * as Formatter from "@/utils/formatterFunctions/Formatter";

import { ListingQueryResult } from "@/sanity/types";

const PriceSection = ({ listing, isAuction }: { listing: ListingQueryResult; isAuction: boolean }) => {
  return (
    <>
      <div className={styles.container}>
        {isAuction ? (
        <div className={styles.descriptionSection}>
              <h1 className={styles.title}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </h1>
              <div className={styles.priceSection}>
                <div className={styles.currentPrice}>
                  Current Price&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>R 10000</span>
                </div>
                <div className={styles.buyNow}>
                  Buy Now&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>R 40000</span>
                </div>
              </div>
              <div className={styles.countDown}>
                <span className={styles.countDownPeriod}>1d</span>
                <span className={styles.countDownPeriod}>15h</span>
                <span className={styles.countDownPeriod}>56m</span>
                <span className={styles.countDownPeriod}>08s</span>
              </div>
              <p className={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>
            </div>
        ) : (
          <div className={styles.descriptionSection}>
              <h1 className={styles.title}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </h1>
              <div className={styles.priceSection}>
                <div className={styles.currentPrice}>
                  Price&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>R 10000</span>
                </div>
                
              </div>
              
              <p className={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>
            </div>
        )}
      </div>
    </>
  );
};

export default PriceSection;
