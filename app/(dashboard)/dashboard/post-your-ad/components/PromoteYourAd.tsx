import styles from "./PromoteYourAd.module.scss";
import { PromoteYourAdData } from "@/data/PromoteYourAdData";
import PromoteYourAdCard from "@/components/cards/PromoteYourAdCard";
import { FormWrapper } from "./FormWrapper";

const PromoteYourAd = () => {
  return (
    <FormWrapper title="Promote Your Ad">

    <div className={styles.container}>
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
    </div>
    </FormWrapper>
  );
};

export default PromoteYourAd;
