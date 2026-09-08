import Link from "next/link";
import styles from "./BidSuccess.module.scss";
import Button from "@/components/Button";

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
          children="View Bids"
          buttonVariant="primary"
          buttonSize="large"


          ariaLabel="View Bids"


          dashboard
        />
      </div>
    </div>
  );
};

export default BidSuccess;
