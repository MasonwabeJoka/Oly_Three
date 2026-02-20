import Modal from "@/components/Modal";
import usePaymentModalStore from "../store/usePaymentModalStore";
import { useSingInCheckHook } from "@/hooks/useSingInCheckHook";
import { useEffect } from "react";
import ConfirmYourPurchase from "@/app/(checkout)/listings/[slug]/components/ConfirmYourPurchase";
// import ConfirmYourPurchase from "../checkout/components/ConfirmYourPurchase";

const ConfirmPurchaseModal = () => {
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
      modalContent={<ConfirmYourPurchase />}
    />
  );
};

export default ConfirmPurchaseModal;
