import { create } from 'zustand';

interface AuctionModalProps {
    showAuctionModal: boolean;
    setShowAuctionModal: (value: boolean) => void;
    openModal: () => void;
    closeModal: () => void;
}

const useAuctionModalStore = create<AuctionModalProps>((set) => ({
  showAuctionModal: false,
  setShowAuctionModal: (value: boolean) => set({ showAuctionModal: value }),
  openModal: () => set({ showAuctionModal: true }),
  closeModal: () => set({ showAuctionModal: false }),
}));

export default useAuctionModalStore;