import { create } from 'zustand';

interface PaymentModalProps {
    showPaymentModal: boolean;
    setShowPaymentModal: (value: boolean) => void;
    openModal: () => void;
    closeModal: () => void;
}

const usePaymentModalStore = create<PaymentModalProps>((set) => ({
  showPaymentModal: false,
  setShowPaymentModal: (value: boolean) => set({ showPaymentModal: value }),
  openModal: () => set({ showPaymentModal: true }),
  closeModal: () => set({ showPaymentModal: false }),
}));

export default usePaymentModalStore;