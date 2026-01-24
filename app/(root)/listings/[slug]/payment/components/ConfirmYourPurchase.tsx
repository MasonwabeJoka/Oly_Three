import Link from "next/link";
import styles from "./ConfirmYourPurchase.module.scss";
import { PaymentFormWrapper } from "../PaymentFormWrapper";

// Todo: Create an Oly Secure Payment page, explain the payment process.
const ConfirmYourPurchase = () => {
  return (
    <PaymentFormWrapper >
      <div className={styles.container}>
        <h2 className={styles.title}>Confirm Your Purchase</h2>
        <p>
          Funds will be withdrawn after the seller has accepted the purchase.
          Proceed to the payment section or contact seller.
        </p>

        <p className={styles.purchasingProcess}>
          For a detailed understanding of our purchasing process, visit{" "}
          <Link href="/payment/oly-secure-payment" className={styles.link}>
            Oly Secure Payment
          </Link>
          
        </p>
        <p className={styles.termsAndConditions}>
          By proceeding, you agree to our{" "}
          <Link href="#" className={styles.link}>
            Terms of Service
          </Link>{" "}
          and acknowledge our{" "}
          <Link href="#" className={styles.link}>
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </PaymentFormWrapper>
  );
};

export default ConfirmYourPurchase;
