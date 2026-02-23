import { create } from 'zustand';

interface SidebarState {
  isVisible: boolean;
  toggleSidebar: () => void;
  showSidebar: () => void;
  hideSidebar: () => void;
}

export const useShowSidebarStore = create<SidebarState>((set) => ({
  isVisible: true,
  toggleSidebar: () => set((state) => ({ isVisible: !state.isVisible })),
  showSidebar: () => set({ isVisible: true }),
  hideSidebar: () => set({ isVisible: false }),
}));
