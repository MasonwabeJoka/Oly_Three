import styles from "./PromoteYourAds.module.scss";
import { PromoteYourAdData } from "@/data/PromoteYourAdData";
import PromoteYourAdCard from "@/components/cards/PromoteYourAdCard";
import Button from "@/components/Buttons";
import Link from "next/link";
import PromotionPaymentSummary from "@/app/(dashboard)/dashboard/create-listing/components/PromotionPaymentSummary";
import { useShowSidebarStore } from "../store/useShowSidebarStore";
import useBreakpointStore from "@/store/useBreakpointStore";

interface Props {
  onNext: () => void;
}

const PromoteYourAd = ({ onNext }: Props) => {
  const { isVisible } = useShowSidebarStore();
  const { isLargeDesktop, isSmallDesktop, isTablet } = useBreakpointStore();

  let marginLeft = "";
  switch (true) {
    case isLargeDesktop:
      marginLeft = isVisible ? "0" : "17rem";
      break;
    case isSmallDesktop:
      marginLeft = isVisible ? "0" : "17rem";
      break;
    case isTablet:
      marginLeft = isVisible ? "0" : "17rem";
      break;
    default:
      marginLeft = "0";
      break;
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper} style={{ marginLeft }}>
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
      </div>
      {!isVisible && (
        <div className={styles.paymentSummaryContainer}>
          <PromotionPaymentSummary />
        </div>
      )}
    </div>
  );
};

export default PromoteYourAd;
