import { phoneOrderSummaryMock } from "../data/order-summary";
import OrderSummary from "./OrderSummary";
import styles from "./CardPaymentForm.module.scss";
import CardForm from "./CardForm";
interface PaymentCardFormProps {}

const CardPaymentForm = ({}: PaymentCardFormProps) => {
  const {
    itemTitle,
    sellerName,
    phoneNumber,
    location,
    price,
    platformFee,
    total,
    notes,
  } = phoneOrderSummaryMock;
  return (
    <div className={styles.container}>
      <OrderSummary
        itemTitle={itemTitle}
        sellerName={sellerName}
        phoneNumber={phoneNumber}
        location={location}
        price={price}
        platformFee={platformFee}
        total={total}
        notes={notes}
      />
      <div className={styles.form}>
        <CardForm/>
      </div>
    </div>
  );
};

export default CardPaymentForm;
