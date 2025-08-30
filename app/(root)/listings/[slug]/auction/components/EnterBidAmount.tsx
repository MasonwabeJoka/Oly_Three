import { useState, useRef, useEffect } from "react";
import styles from "./EnterBidAmount.module.scss";
import NumberInput from "@/components/NumberInput";
import Button from "@/components/Buttons";
import BidHistory from "./BidHistory";
import Form from "next/form";

interface BidInputProps {
  currentBid: number;
  buyNowPrice: number;
  onSubmit: (amount: number) => void;
  error: string;
}

// Mock server action for demonstration
async function mockServerAction(formData: FormData): Promise<void> {
  // Simulate server-side processing
  await new Promise((resolve) => setTimeout(resolve, 500));
  // No return value needed
}

const EnterBidAmount = ({
  currentBid,
  buyNowPrice,
  onSubmit,
  error,
}: BidInputProps) => {
  const [bid, setBid] = useState<string>("");
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
      <div className={styles.historyContainer}>
        <BidHistory />
      </div>
      <Form
        className={styles.form}
        action={mockServerAction}
        onSubmit={handleSubmit}
      >
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputContainer}>
          <NumberInput
            className={styles.input}
            step={100}
            debounceTime={300}
            id="bid"
            value={parseFloat(bid) || 0}
            inputSize="large"
            label="Your Bid (R)"
            placeholder="Enter Your Bid"
            autoFocus={false}
            required={true}
            dashboard
            onChange={(e) => setBid(e.target.value)}
            onBlur={() => {
              if (parseFloat(bid) < currentBid + 100) {
                setBid(`${currentBid + 100}`);
              }
            }}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            className={styles.submitButton}
            buttonChildren="Submit Bid"
            buttonType="primary"
            buttonSize="large"
            name="submit-btn"
            type="submit"
            ariaLabel="Submit Bid"
            autoFocus={false}
            disabled={false}
            dashboard
          />
          <Button
            className={styles.buyNowButton}
            buttonChildren="Buy Now"
            buttonType="normal"
            buttonSize="large"
            name="buy-now-btn"
            type="button"
            ariaLabel="Buy Now"
            autoFocus={false}
            disabled={false}
            dashboard
          />
        </div>
      </Form>
    </div>
  );
};

export default EnterBidAmount;
