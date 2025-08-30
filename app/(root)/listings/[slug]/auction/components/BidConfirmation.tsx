import Button from "@/components/Buttons";
import styles from "./BidConfirmation.module.scss";

interface BidConfirmationProps {
  bidAmount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const BidConfirmation = ({
  bidAmount,
  onConfirm,
  onCancel,
}: BidConfirmationProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Confirm Your Bid</h2>
      <p className={styles.message}>
        You are placing a bid of R{bidAmount}. Do you want to proceed?
      </p>
      <div className={styles.buttonsContainer}>
        <Button
          className={styles.confirmButton}
          buttonChildren="Yes"
          buttonType="primary"
          buttonSize="large"
          name="confirm-btn"
          type="submit"
          ariaLabel="Yes"
          autoFocus={false}
          disabled={false}
          dashboard
          onClick={onConfirm}
        />
        <Button
          className={styles.cancelButton}
          buttonChildren="Cancel"
          buttonType="normal"
          buttonSize="large"
          name="cancel-btn"
          type="submit"
          ariaLabel="Cancel"
          autoFocus={false}
          disabled={false}
          dashboard
          onClick={onCancel}
        />
      </div>
    </div>
  );
};

export default BidConfirmation;
