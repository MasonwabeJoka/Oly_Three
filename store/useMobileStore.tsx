import { create } from "zustand";

type State = {
  currentScreenSize: number;
  setCurrentScreenSize: (size: number) => void;
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
};

const initialState = () => ({

  currentScreenSize: typeof window !== "undefined" ? window.innerWidth : 0,
  isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
});

const useIsMobileStore = create<State>((set) => ({
  ...initialState(),
  setCurrentScreenSize: (size) => set({ currentScreenSize: size }),
  setIsMobile: (value) => set({ isMobile: value }),
}));

export default useIsMobileStore;
