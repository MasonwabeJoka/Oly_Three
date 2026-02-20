import Link from "next/link";
import styles from "./ConfirmYourPurchase.module.scss";
import Button from "@/components/Buttons";
import ListingModalContentWrapper from "@/app/(listings)/listings/[slug]/components/ListingModalContentWrapper";


const ConfirmYourPurchase = () => {
  return (
    <ListingModalContentWrapper>
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Confirm Your Purchase</h2>
        <p>
          Proceed to payment or contact the seller for more information. Your
          funds will only be charged once the seller accepts your purchase.
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
      <nav className={styles.buttons}>
        <Button
          className={styles.proceedButton}
          buttonChildren="Continue To Payment"
          buttonType={"primary"}
          buttonSize="large"
          name="proceed-btn"
          type="button"
          ariaLabel="Proceed Button"
          autoFocus={false}
          disabled={false}
          dashboard
          // onClick={nextStep}
        />

        <Button
          className={styles.bottomButton}
          buttonChildren="Cancel"
          buttonType="normal"
          buttonSize="large"
          name="bottom-btn"
          type="button"
          ariaLabel="Bottom Button"
          autoFocus={false}
          disabled={false}
          dashboard
          // onClick={
          //   bottomButtonText === "Contact Seller" ? goToChat : () => back()
          // }
        />
        {/* } */}
      </nav>
    </div>
    </ListingModalContentWrapper>
  );
};

export default ConfirmYourPurchase;
