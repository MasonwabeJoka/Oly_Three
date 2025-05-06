'use client';

import { useState } from 'react';
import BidInput from './BidInput';
import BidConfirmation from './BidConfirmation';
import BidSuccess from './BidSuccess';

import styles from './AuctionForm.module.scss';
import EnterBidAmount from './EnterBidAmount';

type BidStep = 'input' | 'confirm' | 'success';

interface AuctionData {
  currentBid: number;
  buyNowPrice: number;
  auctionEnd: string;
}

const auctionData: AuctionData = {
  currentBid: 5000,
  buyNowPrice: 25500,
  auctionEnd: new Date(Date.now() + 1.5 * 24 * 60 * 60 * 1000).toISOString(),
};

export default function AuctionForm() {
  const [step, setStep] = useState<BidStep>('input');
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const handleBidSubmit = (amount: number) => {
    if (amount <= auctionData.currentBid) {
      setError(`Your bid must be higher than the current bid of R${auctionData.currentBid}`);
      return;
    }
    if (amount % 100 !== 0) {
      setError('Bid amount must be in increments of R100');
      return;
    }
    setBidAmount(amount);
    setError('');
    setStep('confirm');
  };

  const handleConfirm = async () => {
    try {
      // const response = await fetch('/api/bid', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ bidAmount, userId: 'user123', timestamp: new Date().toISOString() }),
      // });

      // if (!response.ok) throw new Error('Failed to process bid');

      setStep('success');
    } catch (err) {
      setError('Sorry, we couldn’t process your bid. Please try again.');
      setStep('input');
    }
  };

  const handleCancel = () => {
    setBidAmount(0);
    setError('');
    setStep('input');
  };

  return (
    <div className={styles.container}>
      {step === 'input' && (
        <EnterBidAmount
          currentBid={auctionData.currentBid}
          buyNowPrice={auctionData.buyNowPrice}
          onSubmit={handleBidSubmit}
          error={error}
        />
      )}
      {step === 'confirm' && (
        <BidConfirmation
          bidAmount={bidAmount}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {step === 'success' && <BidSuccess bidAmount={bidAmount} />}
    </div>
  );
}