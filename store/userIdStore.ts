import {create} from 'zustand';
import { getUser } from '@/sanity/actions/getUser';

interface UserState {
  userId: string | null;
  error: string | null;
  setUser: (userId: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  error: null,
  setUser: (userId) => set({ userId, error: null }),
}));
