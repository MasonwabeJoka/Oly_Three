import Modal from "@/components/Modal";
import AuctionForm from "../auction/components/AuctionForm";
import useAuctionModalStore from "../auction/store/useAuctionModalStore";
import { useEffect } from "react";
import { useSingInCheckHook } from "@/hooks/useSingInCheckHook";

const AuctionModal = () => {
  const { showAuctionModal, setShowAuctionModal } = useAuctionModalStore();
    const { signInAndReturnUser, isSignedIn, isLoaded } = useSingInCheckHook({
    actionId: "auction",
    queryParam: "auction",
    onAction: () => {
      if (!showAuctionModal) {
        setShowAuctionModal(true);
      }
    },
  })

   useEffect(() => {
    if (!isLoaded || isSignedIn || !showAuctionModal) return;
    signInAndReturnUser();
  }, [showAuctionModal, isLoaded, isSignedIn, signInAndReturnUser]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <Modal
      showModal={showAuctionModal}
      setShowModal={setShowAuctionModal}
      modalContent={<AuctionForm />}
    />
  );
};

export default AuctionModal;
