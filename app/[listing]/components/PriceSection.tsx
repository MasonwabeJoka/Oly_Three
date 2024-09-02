import { Ad } from "@/sanity/Types/Ad";
import styles from "./PriceSection.module.scss";
import * as Formatter from "@/utils/formatterFunctions/Formatter";

const PriceSection = ({ ad, isAuction }: { ad: Ad; isAuction: boolean }) => {
  return (
    <>
      <div className={styles.priceSection}>
        {isAuction ? (
          <>
            <p className={styles.priceLabel}>Current Price</p>
            <h1 className={styles.price}>
              {ad?.price && `R${Formatter.formatLargeNumber(ad?.price)}`}
            </h1>
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
            <h1 className={styles.nonAuctionPrice}>
              {/* {ad?.price && `R${Formatter.formatLargeNumber(ad?.price)}`} */}
              {ad?.price &&
                Formatter.formatPrice(ad?.price, { showCents: false })}
            </h1>
          </>
        )}
      </div>
    </>
  );
};

export default PriceSection;
