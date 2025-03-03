import { create } from 'zustand';

interface FAQStore {
  showFAQs: boolean;
  setShowFAQs: (value: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
}

const useQAndAStore = create<FAQStore>((set) => ({
  showFAQs: false,
  setShowFAQs: (value: boolean) => set({ showFAQs: value }),
  openModal: () => set({ showFAQs: true }),
  closeModal: () => set({ showFAQs: false }),
}));

export default useQAndAStore;
