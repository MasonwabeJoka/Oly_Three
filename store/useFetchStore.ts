import { create } from 'zustand';

interface FetchStore {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const useFetchStore = create<FetchStore>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

export const useFetchAdStorePaginated = useFetchStore;
export default useFetchStore;