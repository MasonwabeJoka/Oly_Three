import styles from "./OlySecurePayment.module.scss";
import Button from "@/components/Buttons";
import {useRouter} from "next/navigation";


const OlySecurePayment = () => {
  const router = useRouter();
  return (
    <div className={styles.olySecurePyamentContainer}>
      <h1 className={styles.howItWorksTitle}>Oly Secure Payment</h1>
      <p>
        Our payment system ensures convenience and protection for both buyers
        and sellers on our platform. When a purchase is made, the buyer's funds
        are held securely in escrow by our site. This way, payment is not
        released until the buyer receives and confirms delivery of their item.
      </p>

      <p>
        After the seller delivers the item, delivery confirmation occurs in one
        of two easy ways:
      </p>

      <ol>
        <li>
          The buyer simply clicks a “Confirm Delivery” button on our website
          once the item is received. This instantly releases the funds to the
          seller.
        </li>
        <li>
          The buyer is given a unique code that they provide to the seller. The
          seller then enters this code on our website, which signals us to
          release the payment.
        </li>
      </ol>

      <p>
        Our secure escrow service gives both parties the ease of mind that
        transactions will be smooth, convenient, and protected on our platform.
        Please contact us if you have any other questions!
      </p>
      <Button
        className={styles.goToPaymentsBtn}
        buttonChildren="Go To Payments"
        buttonType="primary"
        buttonSize="medium"
        name="go-to-payments-btn"
        type="button"
        ariaLabel="Go To Payments Button"
        autoFocus={false}
        disabled={false}
        ariaHidden={false}
        onClick={() => router.push('/[listing]/confirm-your-purchase')}

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
        onClick={() => router.push('/[listing]/buyer-chat')}
      />
    </div>
  );
};

export default OlySecurePayment;
