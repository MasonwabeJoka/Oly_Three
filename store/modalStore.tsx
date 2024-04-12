
import {create} from 'zustand';

// interface MainModalState {
//   modalTop: number;
//   setModalTop: (value: number) => void;
//   showModal: boolean;
//   setShowModal: (value: boolean) => void;
//   openModal: () => void;
//   closeModal: () => void;
// }
// interface ModalState {
//   showModal: boolean;
//   setShowModal: (value: boolean) => void;
//   openModal: () => void;
//   closeModal: () => void;
// }

// const getInitialScrollPosition = () => (typeof window !== 'undefined' ? window.scrollY : 0);

// export const useModalStore = create<MainModalState>((set) => ({
//   modalTop: getInitialScrollPosition(),
//   setModalTop: (value: number) => set({ modalTop: value }),
//   showModal: false,
//   openModal: () => set({ showModal: true }),
//   closeModal: () => set({ showModal: false }),
//   setShowModal: (value: boolean) => set({ showModal: value }),
// }));

// export const useNotificationsModalStore = create<ModalState>((set) => ({
//   showModal: false,
//   openModal: () => set({ showModal: true }),
//   closeModal: () => set({ showModal: false }),
//   setShowModal: (value: boolean) => set({ showModal: value }),
// }));

// export const useCategoriesModalStore = create<ModalState>((set) => ({
//   showModal: false,
//   openModal: () => set({ showModal: true }),
//   closeModal: () => set({ showModal: false }),
//   setShowModal: (value: boolean) => set({ showModal: value }),
// }));

interface ModalState {
  showNotificationsModal: boolean;
  setShowNotificationsModal: (show: boolean) => void;
  showCategoriesModal: boolean;
  setShowCategoriesModal: (show: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  showNotificationsModal: false,
  setShowNotificationsModal: (show) => set({ showNotificationsModal: show }),
  showCategoriesModal: false,
  setShowCategoriesModal: (show) => set({ showCategoriesModal: show }),
}));
