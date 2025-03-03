import SellerDetails from "@/components/SellerDetails";
import styles from "./styles.module.scss";
import ConfirmYourPurchase from "./components/ConfirmYourPurchase";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import PaymentConfirmation from "./components/PaymentConfirmation";
import usePaymentProcessingStore from "./store/usePaymentProcessingStore";

const PaymentProcessing = () => {
  const { currentStepIndex, steps } = usePaymentProcessingStore();
  return (
    <div className={styles.container}>
      <div className={styles.sellerDetails}>
        <SellerDetails />
      </div>
      <div className={styles.content}>
        {currentStepIndex === 0 && <ConfirmYourPurchase />}
        {currentStepIndex === 1 && <Cart />}
        {currentStepIndex === 2 && <Payment />}
        {currentStepIndex === 3 && <PaymentConfirmation />}
      </div>
    </div>
  );
};

export default PaymentProcessing;
