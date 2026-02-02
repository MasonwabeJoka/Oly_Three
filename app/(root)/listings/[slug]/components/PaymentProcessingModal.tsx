import Modal from "@/components/Modal";
import usePaymentModalStore from "../store/usePaymentModalStore";
import PaymentProcessing from "../payment/components/PaymentProcessing";
import { useSingInCheckHook } from "@/hooks/useSingInCheckHook";
import { useEffect } from "react";
import Payment from "../payment/page";

const PaymentProcessingModal = () => {
  const { showPaymentModal, setShowPaymentModal } = usePaymentModalStore();

  const { signInAndReturnUser, isSignedIn, isLoaded } = useSingInCheckHook({
    actionId: "paymentProcessing",
    queryParam: "paymentProcessing",
    onAction: () => {
      if (!showPaymentModal) {
        setShowPaymentModal(true);
      }
    },
  });

  useEffect(() => {
    if (!isLoaded || isSignedIn || !showPaymentModal) return;
    signInAndReturnUser();
  }, [showPaymentModal, isLoaded, isSignedIn, signInAndReturnUser]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <Modal
      showModal={showPaymentModal}
      setShowModal={setShowPaymentModal}
      modalContent={<PaymentProcessing />}
    />
  );
};

export default PaymentProcessingModal;