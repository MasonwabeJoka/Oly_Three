import { create } from 'zustand';

interface ListingsState {
  expanded: boolean;
  sortOptions: boolean;
  priceOptions: boolean;
  altWidth: number;
  optionsWidth: string;
  page: number;
  loading: boolean;
  isClient: boolean;
  setExpanded: (value: boolean) => void;
  setSortOptions: (value: boolean) => void;
  setPriceOptions: (value: boolean) => void;
  setAltWidth: (value: number) => void;
  setOptionsWidth: (value: string) => void;
  setPage: (value: number) => void;
  setLoading: (value: boolean) => void;
  setIsClient: (value: boolean) => void;
  toggleSortOptions: () => void;
  togglePriceOptions: () => void;
  toggleExpanded: () => void;
}

export const useListingsStore = create<ListingsState>((set) => ({
  expanded: true,
  sortOptions: false,
  priceOptions: false,
  altWidth: 954,
  optionsWidth: '57.24rem',
  page: 1,
  loading: false,
  isClient: false,
  setExpanded: (value) => set({ expanded: value }),
  setSortOptions: (value) => set({ sortOptions: value, priceOptions: false }),
  setPriceOptions: (value) => set({ priceOptions: value, sortOptions: false }),
  setAltWidth: (value) => set({ altWidth: value }),
  setOptionsWidth: (value) => set({ optionsWidth: value }),
  setPage: (value) => set({ page: value }),
  setLoading: (value) => set({ loading: value }),
  setIsClient: (value) => set({ isClient: value }),
  toggleSortOptions: () => set((state) => ({ 
    sortOptions: !state.sortOptions,
    priceOptions: false 
  })),
  togglePriceOptions: () => set((state) => ({ 
    priceOptions: !state.priceOptions,
    sortOptions: false 
  })),
  toggleExpanded: () => set((state) => ({ expanded: !state.expanded })),
}));