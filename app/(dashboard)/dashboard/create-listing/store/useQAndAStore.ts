import { create } from 'zustand';

interface QAndAStore {
  showFAQs: boolean;
  setShowFAQs: (show: boolean) => void;
}

const useQAndAStore = create<QAndAStore>((set) => ({
  showFAQs: false,
  setShowFAQs: (show) => set({ showFAQs: show }),
}));

export default useQAndAStore;