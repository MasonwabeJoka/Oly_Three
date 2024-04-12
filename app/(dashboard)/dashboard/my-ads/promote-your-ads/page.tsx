import styles from "./styles.module.scss";
import { PromoteYourAdData } from "@/data/PromoteYourAdData";
import PromoteYourAdCard from "@/components/cards/PromoteYourAdCard";
import Button from "@/components/Buttons";
import Link from "next/link";

const PromoteYourAd = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Promote Your Ads</h4>
      <div className={styles.cards}>
        {PromoteYourAdData[1].map((promotion) => {
          const { id, promotionChannel, title, promotionPrice, icon } =
            promotion;

          return (
            <div className={styles.cardContainer} key={id}>
              <PromoteYourAdCard
                id={id}
                title={title}
                src={icon}
                alt={promotionChannel}
                price={promotionPrice}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.promotionTotal}>
        <h4 className={styles.promotion}>Promotions</h4>
        <span className={styles.price}>R115</span>
      </div>
      <div className={styles.buttons}>
        <Link href="#">
          <Button
            className={styles.proceedButton}
            buttonChildren="Proceed To Payments"
            buttonType="primary"
            buttonSize="large"
            name="proceed-btn"
            type="button"
            ariaLabel="Proceed Book"
            autoFocus={false}
            disabled={false}
            dashboard
          />
        </Link>
        <Link href="/dashboard/post-your-ad/location">
          <Button
            className={styles.backButton}
            buttonChildren="Back"
            buttonType="normal"
            buttonSize="large"
            name="back-btn"
            type="button"
            ariaLabel="Back Button"
            autoFocus={false}
            disabled={false}
            dashboard
          />
        </Link>
      </div>
    </div>
  );
};

export default PromoteYourAd;
