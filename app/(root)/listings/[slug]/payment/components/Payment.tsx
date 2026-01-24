import Input from "@/components/Input";
import { PaymentFormWrapper } from "../PaymentFormWrapper";
import styles from "./Payment.module.scss";
const Payment = () => {
  return (
    <PaymentFormWrapper>
      <div className={styles.container}>
        <h2>Payment Information</h2>
        <div className={styles.paymentForm}>
          <Input
            className={styles.input}
            inputType="text"
            inputSize="large"
            label="Card Number"
            placeholder="Enter Card Number"
            id="cardNumber"
            ariaLabel="Card Number"
            autoFocus={false}
            autoComplete="off"
            required={true}
            dashboard
          />
        </div>
        <Input
          className={styles.expiryDate}
          inputType="text"
          inputSize="medium"
          label="Expiry Date"
          placeholder="MM/YY"
          id="expiryDate"
          ariaLabel="Expiry Date"
          autoFocus={false}
          autoComplete="off"
          required={true}
          dashboard
        />
        <Input
          className={styles.CVC}
          inputType="text"
          inputSize="medium"
          label="CVC"
          placeholder="CVC"
          id="cvc"
          ariaLabel="CVC"
          autoFocus={false}
          autoComplete="off"
          required={true}
          dashboard
        />
        {/* <label>
          Card Number:{" "}
          <input type="text" value="4111 1111 1111 1111" readOnly />
        </label>
        <label>
          Expiry Date: <input type="text" value="10/24" readOnly />
        </label>
        <label>
          CVC: <input type="text" value="123" readOnly />
        </label>
        <button type="button">Submit Payment</button> */}
      </div>
    </PaymentFormWrapper>
  );
};

export default Payment;
