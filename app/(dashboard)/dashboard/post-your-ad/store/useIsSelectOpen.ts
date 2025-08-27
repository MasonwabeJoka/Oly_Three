import { create } from "zustand";

interface IsSelectOpenProps {
  isSelectOpen: boolean;
  setIsSelectOpen: (value: boolean) => void;
}

const useIsSelectOpen = create<IsSelectOpenProps>((set) => ({
  isSelectOpen: false,
  setIsSelectOpen: (value: boolean) => set({ isSelectOpen: value }),
}));

export default useIsSelectOpen;