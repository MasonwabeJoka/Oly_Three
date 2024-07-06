import styles from "./ConfirmYourPurchase.module.scss";
import Button from "@/components/Buttons";


type Props = {
  olySecurePaymentLink: () => void;
  goToPaymentsBtn: () => void;
  contactSellerBtn: () => void;
}; 
const ConfirmYourPurchase = ({
  olySecurePaymentLink,
  goToPaymentsBtn,
  contactSellerBtn,
}: Props) => {
  return (
    <div className={styles.confirmYourPurchaseContainer}>
      <h1 className={styles.confirmTitle}>Confirm Your Purchase</h1>
      <p>
        When you click the "Go To Payments" button below, you will initiate the
        payment process for the selected item. Please consider the following
        important information:
      </p>
      <h2 className={styles.paragraphTitle}>Funds Withdrawal</h2>
      <p>
        Your funds will be withdrawn from your account only after the seller has
        accepted your offer to purchase. This process ensures your payment is
        secured and will proceed once both parties confirm the transaction."
      </p>
      <h2 className={styles.paragraphTitle}>Contacting the Seller</h2>
      <p>
        If you have any questions for the seller or wish to confirm any details
        about the item before proceeding, we encourage you to contact the seller
        directly through our secure messaging system. This option is available
        to ensure your confidence and satisfaction with the transaction.
      </p>
      <p className={styles.purchasingProcess} style={{ marginBottom: "1rem" }}>
        For a detailed understanding of our purchasing process, visit{" "}
        <span
          className={styles.olySecurePaymentLink}
          onClick={olySecurePaymentLink}
        >
          Oly Secure Payment
        </span>
      </p>
      <p>
        By proceeding, you agree to our Terms of Service and acknowledge our
        Privacy Policy.
      </p>
      <Button
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
        onClick={goToPaymentsBtn}
      />
      <Button
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
        onClick={contactSellerBtn}
      />
    </div>
  );
};

export default ConfirmYourPurchase;
