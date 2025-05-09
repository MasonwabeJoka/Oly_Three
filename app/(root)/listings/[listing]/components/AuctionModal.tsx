import Modal from "@/components/Modal";
import AuctionForm from "../auction/components/AuctionForm";
import useAuctionModalStore from "../auction/store/useAuctionModalStore";

const AuctionModal = () => {
  const { showAuctionModal, setShowAuctionModal } = useAuctionModalStore();
  return (
    <Modal
      showModal={showAuctionModal}
      setShowModal={setShowAuctionModal}
      modalContent={<AuctionForm />}
    />
  );
};

export default AuctionModal;
