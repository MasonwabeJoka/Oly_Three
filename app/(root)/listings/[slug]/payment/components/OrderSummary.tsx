import { PaymentFormWrapper } from "./PaymentFormWrapper";
import styles from "./OrderSummary.module.scss";
interface OrderSummaryProps {}

const OrderSummary = ({}: OrderSummaryProps) => {
  return (
    <PaymentFormWrapper title="Order Summary">
      <div>OrderSummary</div>
    </PaymentFormWrapper>
  );
};

export default OrderSummary;
