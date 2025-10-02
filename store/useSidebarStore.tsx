import { create } from "zustand";

type State = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

const useSidebarStore = create<State>((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (value: boolean) => set({ isSidebarOpen: false }),
  // setIsSidebarOpen: (value: boolean) => set({isSidebarOpen: value})
}));

export default useSidebarStore;
