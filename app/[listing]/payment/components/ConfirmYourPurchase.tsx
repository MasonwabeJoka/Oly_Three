import Link from "next/link";
import styles from "./ConfirmYourPurchase.module.scss";
import { FormWrapper } from "./FormWrapper";

// Todo: Create an Oly Secure Payment page, explain the payment process.
const ConfirmYourPurchase = () => {
  return (
    <FormWrapper title="Confirm Your Purchase">
      <div className={styles.container}>
        <p>
          When you click the "Go To Payments" button, you confirm the
          transaction and will initiate the payment process. Please consider the
          following:
        </p>
        <h2 className={styles.paragraphTitle}>Funds Withdrawal</h2>
        <p>
          Your funds will be withdrawn from your account only after the seller
          has accepted your purchase, and the process will proceed once both
          parties have confirmed the transaction.
        </p>
        <h2 className={styles.paragraphTitle}>Contacting the Seller</h2>
        <p>
          Should you have any questions for the seller or wish to confirm any
          details about the item, we encourage you to contact them directly
          through our secure messaging system.
        </p>
        <p
          className={styles.purchasingProcess}
          style={{ marginBottom: "1rem" }}
        >
          For a detailed understanding of our purchasing process, visit{" "}
          <Link href="/payment/oly-secure-payment" className={styles.link}>
            Oly Secure Payment
          </Link>
        </p>
        <p>
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
    </FormWrapper>
  );
};

export default ConfirmYourPurchase;
