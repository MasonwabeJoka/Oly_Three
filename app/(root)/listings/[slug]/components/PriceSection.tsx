import { Ad } from "@/sanityTemp/Types/Ad";
import styles from "./PriceSection.module.scss";
import * as Formatter from "@/utils/formatterFunctions/Formatter";

import { ListingQueryResult } from "@/sanity/types";

const PriceSection = ({ listing, isAuction }: { listing: ListingQueryResult; isAuction: boolean }) => {
  return (
    <>
      <div className={styles.priceSection}>
        {isAuction ? (
          <>
            <p className={styles.priceLabel}>Current Price</p>
            <p className={styles.price}>
              {/* {listing?.price && `R${Formatter.formatLargeNumber(listing?.price)}`} */}
              R 50000
            </p>
            <div className={styles.countDown}>
              <span className={styles.countDownPeriod}>1d</span>
              <span className={styles.countDownPeriod}>15h</span>
              <span className={styles.countDownPeriod}>56m</span>
              <span className={styles.lastCountDownPeriod}>08s</span>
            </div>
            <p className={styles.buyNowLabel}>Buy Now</p>
            <h3 className={styles.buyNow}>R2550</h3>
          </>
        ) : (
          <>
            <p className={styles.priceLabel}>Price</p>
            <p className={styles.nonAuctionPrice}>
              {/* {listing?.price && `R${Formatter.formatLargeNumber(listing?.price)}`} */}
              {/* {listing?.price &&
                Formatter.formatPrice(listing?.price, { showCents: false })} */}
              R 50000
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default PriceSection;
