import Link from "next/link";
import styles from "./BidSuccess.module.scss";
import Button from "@/components/Buttons";

interface BidSuccessProps {
  bidAmount: number;
}

const BidSuccess = ({ bidAmount }: BidSuccessProps) => {
  return (
    <div className={styles.container}>
      
      <p className={styles.message}>
        Your bid of R{bidAmount} has been placed successfully!
      </p>

      <div className={styles.buttonsContainer}>
        <Button
          className={styles.viewBidsButton}
          buttonChildren="View Bids"
          buttonType="primary"
          buttonSize="large"
          name="view-bids-btn"
          type="button"
          ariaLabel="View Bids"
          autoFocus={false}
          disabled={false}
          dashboard
        />
      </div>
    </div>
  );
};

export default BidSuccess;
