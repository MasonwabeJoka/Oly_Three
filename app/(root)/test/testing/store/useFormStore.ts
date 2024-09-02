import { create } from 'zustand';

interface FormState {
  step: number;
  name: string;
  email: string;
  updateName: (name: string) => void;
  updateEmail: (email: string) => void;
  nextStep: () => void;
  previousStep: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  step: 1,
  name: '',
  email: '',
  updateName: (name) => set({ name }),
  updateEmail: (email) => set({ email }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  previousStep: () => set((state) => ({ step: state.step - 1 })),
}));