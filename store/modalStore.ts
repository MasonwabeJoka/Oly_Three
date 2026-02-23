import { create } from 'zustand';

interface CategoriesModalStore {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  showCategoriesModal: boolean;
  setShowCategoriesModal: (show: boolean) => void;
  showMenuModal: boolean;
  setShowMenuModal: (show: boolean) => void;
}

interface NotificationsModalStore {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export const useCategoriesModalStore = create<CategoriesModalStore>((set) => ({
  showModal: false,
  setShowModal: (show) => set({ showModal: show }),
  showCategoriesModal: false,
  setShowCategoriesModal: (show) => set({ showCategoriesModal: show }),
  showMenuModal: false,
  setShowMenuModal: (show) => set({ showMenuModal: show }),
}));

export const useNotificationsModalStore = create<NotificationsModalStore>((set) => ({
  showModal: false,
  setShowModal: (show) => set({ showModal: show }),
}));

// Legacy export for compatibility
export const useModalStore = useCategoriesModalStore;