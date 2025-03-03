import { FormWrapper } from "./FormWrapper";
import styles from "./Payment.module.scss";
const Payment = () => {
  return (
    <FormWrapper title="Payment">
      <form>
        <label>
          Card Number:{" "}
          <input type="text" value="4111 1111 1111 1111" readOnly />
        </label>
        <label>
          Expiry Date: <input type="text" value="10/24" readOnly />
        </label>
        <label>
          CVC: <input type="text" value="123" readOnly />
        </label>
        <button type="button">Submit Payment</button>
      </form>
    </FormWrapper>
  );
};

export default Payment;
