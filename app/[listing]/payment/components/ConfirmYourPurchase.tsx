import Link from "next/link";
import styles from "./ConfirmYourPurchase.module.scss";
import Button from "@/components/Buttons";
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
          has accepted your offer to purchase. This process ensures your payment
          is secured and will proceed once both parties confirm the
          transaction."
        </p>
        <h2 className={styles.paragraphTitle}>Contacting the Seller</h2>
        <p>
          If you have any questions for the seller or wish to confirm any
          details about the item before proceeding, we encourage you to contact
          the seller directly through our secure messaging system.
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
        {/* <Button
          className={styles.goToPaymentsBtn}
          buttonChildren="Continue to Payments"
          buttonType="primary"
          buttonSize="medium"
          name="go-to-payments-btn"
          type="button"
          ariaLabel="Go To Payments Button"
          autoFocus={false}
          disabled={false}
          ariaHidden={false}
          // onClick={goToPaymentsBtn}
        /> */}
        {/* <Button
          className={styles.contactSellerBtn}
          buttonChildren="Contact Seller"
          buttonType="normal"
          buttonSize="medium"
          name="contact-seller-btn"
          type="button"
          ariaLabel="Contact Seller Button"
          autoFocus={false}
          disabled={false}
          ariaHidden={false}
          // onClick={contactSellerBtn}
        /> */}
      </div>
    </FormWrapper>
  );
};

export default ConfirmYourPurchase;
