import { useState, useRef, useEffect } from "react";
import styles from "./EnterBidAmount.module.scss";
import NumberInput from "@/components/NumberInput";
import Button from "@/components/Button";
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

            required={true}
            dashboard
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBid(e.target.value)}
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
            children="Submit Bid"
            buttonVariant="primary"
            buttonSize="large"

            type="submit"
            ariaLabel="Submit Bid"


            dashboard
          />
          <Button
            className={styles.buyNowButton}
            children="Buy Now"
            buttonVariant="normal"
            buttonSize="large"


            ariaLabel="Buy Now"


            dashboard
          />
        </div>
      </Form>
    </div>
  );
};

export default EnterBidAmount;
