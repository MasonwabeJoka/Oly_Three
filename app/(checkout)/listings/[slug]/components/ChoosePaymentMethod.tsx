import styles from "./ChoosePaymentMethod.module.scss";
import { paymentMethods, PaymentMethodType } from "../data/payment-method";
import OrderSummary from "./OrderSummary";
import { phoneOrderSummaryMock } from "../data/order-summary";
import ListCard from "@/components/cards/ListCard";
import PaymentMethodCardContent from "./PaymentMethodCardContent";
import Link from "next/link";

interface ChoosePaymentMethodProps {
  id: string;
}

const ChoosePaymentMethod = ({ id }: ChoosePaymentMethodProps) => {
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
      <div className={styles.cards}>
        {paymentMethods.map((method: PaymentMethodType) => (
          <Link href={`/listings/${id}/${method.path}`} key={method.id}>
            <ListCard content={<PaymentMethodCardContent {...method} />} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChoosePaymentMethod;
