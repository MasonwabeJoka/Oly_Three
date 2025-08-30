
import usePaymentProcessingStore from "../store/usePaymentProcessingStore";
import ConfirmYourPurchase from "./ConfirmYourPurchase";
import Payment from "./Payment";
import PaymentConfirmation from "./PaymentConfirmation";
import ListingModalContentWrapper from "../../components/ListingModalContentWrapper";

const PaymentProcessing = () => {
  const { currentStepIndex, steps } = usePaymentProcessingStore();
  return (
    <ListingModalContentWrapper>
      {currentStepIndex === 0 && <ConfirmYourPurchase />}
      {currentStepIndex === 1 && <Payment />}
      {currentStepIndex === 2 && <PaymentConfirmation />}
    </ListingModalContentWrapper>
  );
};

export default PaymentProcessing;
