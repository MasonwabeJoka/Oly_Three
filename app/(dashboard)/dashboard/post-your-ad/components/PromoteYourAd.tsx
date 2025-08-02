import styles from "./PromoteYourAd.module.scss";
import { PromoteYourAdData } from "@/data/PromoteYourAdData";
import PromoteYourAdCard from "@/components/cards/PromoteYourAdCard";
import { FormWrapper } from "./FormWrapper";
import { promoteYourAdValidations } from "../validations/multiStepFormValidations";
const PromoteYourAd = () => {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Promote Your Ad</h2>
        <ul className={styles.cards}>
          {PromoteYourAdData.map((promotion, index) => {
            const { id, promotionChannel, title, promotionPrice, icon } =
              promotion[index];

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
      </div>
    </>
  );
};

export default PromoteYourAd;
