import { useState, useRef, useEffect } from 'react';
import styles from './EnterBidAmount.module.scss';

interface BidInputProps {
  currentBid: number;
  buyNowPrice: number;
  onSubmit: (amount: number) => void;
  error: string;
}

const EnterBidAmount = ({ currentBid, buyNowPrice, onSubmit, error }: BidInputProps) => {
  const [bid, setBid] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Set focus on mount
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(bid);
    if (isNaN(amount)) return;
    onSubmit(amount);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Place Your Bid</h2>
      <div className={styles.info}>
        <p>Current Bid: R{currentBid}</p>
        <p>Buy Now Price: R{buyNowPrice}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="bid" className={styles.label}>
            Your Bid (R)
          </label>
          <input
            ref={inputRef}
            type="number"
            id="bid"
            value={bid}
            onChange={(e) => setBid(e.target.value)}
            className={styles.input}
            min={currentBid + 100}
            step="100"
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>
          Submit Bid
        </button>
      </form>
    </div>
  );
};

export default EnterBidAmount;