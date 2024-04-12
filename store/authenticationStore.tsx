import {create} from 'zustand';

type State = {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}

const useAuthStore = create<State>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
}));


export default useAuthStore