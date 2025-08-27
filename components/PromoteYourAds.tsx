import styles from "./PromoteYourAds.module.scss";
import { PromoteYourAdData } from "@/data/PromoteYourAdData";
import PromoteYourAdCard from "@/components/cards/PromoteYourAdCard";
import Button from "@/components/Buttons";
import Link from "next/link";

interface Props {
  onNext: () => void;
}

const PromoteYourAd = ({ onNext }: Props) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Promote Your Ads</h4>
      <ul className={styles.cards}>
        {PromoteYourAdData[1].map((promotion) => {
          const { id, promotionChannel, title, promotionPrice, icon } =
            promotion;

          return (
            <li className={styles.cardContainer} key={id}>
              <PromoteYourAdCard
                id={id}
                title={title}
                src={icon}
                alt={promotionChannel}
                price={promotionPrice}
              />
            </li>
          );
        })}
      </ul>
      <div className={styles.promotionTotal}>
        <h4 className={styles.promotion}>Promotions</h4>
        <span className={styles.price}>R115</span>
      </div>
      <div className={styles.buttons}>
        <Link href="#">
          <Button
            className={styles.proceedButton}
            buttonChildren="Proceed To Payments"
            buttonType="normal"
            buttonSize="large"
            name="proceed-btn"
            type="button"
            ariaLabel="Proceed Book"
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
