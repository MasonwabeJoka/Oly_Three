import { create } from "zustand";



interface ModalState {
  showMenuModal: boolean;
  setShowMenuModal: (show: boolean) => void;
  showCategoriesModal: boolean;
  setShowCategoriesModal: (show: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  showMenuModal: false,
  setShowMenuModal: (show) => set({ showMenuModal: show }),
  showCategoriesModal: false,
  setShowCategoriesModal: (show) => set({ showCategoriesModal: show }),
}));


