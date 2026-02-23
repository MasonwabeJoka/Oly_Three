import { create } from 'zustand';

interface EditState {
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
}

const useEditStore = create<EditState>((set) => ({
    isEditMode: false,
    setIsEditMode: (isEditMode: boolean) => set({ isEditMode }),
}));

export default useEditStore;