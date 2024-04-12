import { create } from "zustand";

type State = {
  currentScreenSize: number;
  setCurrentScreenSize: (size: number) => void;
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
};

const initialState = () => ({
  // before accessing the window object check if it is defined.
  // If the data type is not undefined then use window.innerWidth
  currentScreenSize: typeof window !== "undefined" ? window.innerWidth : 0,
  isMobile: typeof window !== "undefined" ? window.innerWidth < 640 : false,
});

const useIsMobileStore = create<State>((set) => ({
  ...initialState(),
  setCurrentScreenSize: (size) => set({ currentScreenSize: size }),
  setIsMobile: (value) => set({ isMobile: value }),
}));

export default useIsMobileStore;
