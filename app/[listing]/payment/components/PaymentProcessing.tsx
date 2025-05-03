import styles from "./PaymentProcessing.module.scss";
import SellerDetails from "@/components/SellerDetails";
import usePaymentProcessingStore from "../store/usePaymentProcessingStore";
import ConfirmYourPurchase from "./ConfirmYourPurchase";
import Payment from "./Payment";
import PaymentConfirmation from "./PaymentConfirmation";

const PaymentProcessing = () => {
  const { currentStepIndex, steps } = usePaymentProcessingStore();
  return (
    <div className={styles.container}>
      <div className={styles.sellerDetails}>
        <SellerDetails />
      </div>
      <div className={styles.content}>
        {currentStepIndex === 0 && <ConfirmYourPurchase />}
        {currentStepIndex === 1 && <Payment />}
        {currentStepIndex === 2 && <PaymentConfirmation />}
      </div>
    </div>
  );
};

export default PaymentProcessing;
