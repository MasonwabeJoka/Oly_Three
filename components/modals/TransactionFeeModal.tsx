import styles from "./TransactionFeeModal.module.scss";
import Button from "../Buttons";

interface TransactionFeeProps {
  setShowTransactionFeeModal: (value: boolean) => void;
}

const TransactionFee: React.FC<TransactionFeeProps> = ({ setShowTransactionFeeModal }) => {
  return (
    <div className={styles.container}>
      <p>
        Our platform handles all payments directly, enhancing both security and
        convenience. This approach allows us to streamline the buying and
        selling process, making it easier and safer for everyone involved. A fee
        is included in the item price, resulting in the total price displayed to
        potential buyers on the site.
      </p>
      <Button
        className={styles.okayButton}
        buttonChildren="Okay"
        buttonType="primary"
        buttonSize="large"
        name="okay-btn"
        type="button"
        ariaLabel="Okay Button"
        autoFocus={false}
        disabled={false}
        dashboard
        onClick={() => setShowTransactionFeeModal(false)}
      />
    </div>
  );
};

export default TransactionFee;
