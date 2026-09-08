import Button from "@/components/Button";
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
          children="Yes"
          buttonVariant="primary"
          buttonSize="large"

          type="submit"
          ariaLabel="Yes"


          dashboard
          onClick={onConfirm}
        />
        <Button
          className={styles.cancelButton}
          children="Cancel"
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Cancel"


          dashboard
          onClick={onCancel}
        />
      </div>
    </div>
  );
};

export default BidConfirmation;
