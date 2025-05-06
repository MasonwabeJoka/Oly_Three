import styles from './BidConfirmation.module.scss';

interface BidConfirmationProps {
  bidAmount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const BidConfirmation=({ bidAmount, onConfirm, onCancel }: BidConfirmationProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Confirm Your Bid</h2>
      <p className={styles.message}>You are placing a bid of R{bidAmount}. Do you want to proceed?</p>
      <div className={styles.buttonGroup}>
        <button onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <button onClick={onConfirm} className={styles.confirmButton}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default BidConfirmation;