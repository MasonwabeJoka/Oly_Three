import Link from 'next/link';
import styles from './BidSuccess.module.scss';

interface BidSuccessProps {
  bidAmount: number;
}

const BidSuccess = ({ bidAmount }: BidSuccessProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bid Placed Successfully!</h2>
      <p className={styles.message}>Your bid of R{bidAmount} has been placed successfully!</p>
      <Link href="/my-bids" className={styles.link}>
        View My Bids
      </Link>
    </div>
  );
}

export default BidSuccess;