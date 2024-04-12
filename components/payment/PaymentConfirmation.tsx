import styles from './PaymentConfirmation.module.scss'
const PaymentConfirmation = () => {
  return (
    <div>
      <h1>Payment Successful</h1>
      <p>
        Your payment has been processed and the funds are held until you confirm
        item receipt.
      </p>
    </div>
  );
};

export default PaymentConfirmation;
