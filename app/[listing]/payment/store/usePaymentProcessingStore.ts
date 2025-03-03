import { create } from 'zustand';

type Step = {
  id: string;
  name: string;
};


// Store state and actions
type PaymentProcessingStore = {
  message: string; // Feedback message (e.g., errors or success)
  currentStepIndex: number; // Current step index
  isFirstStep: boolean; // Whether the current step is the first step
  isLastStep: boolean; // Whether the current step is the last step
  steps: Step[]; // Array of steps
  setMessage: (message: string) => void; // Set feedback message
  next: () => void; // Move to next step
  back: () => void; // Move to previous step
  goTo: (index: number) => void; // Renamed from setCurrentStepIndex
};

const steps: Step[] = [
  { id: 'step1', name: 'Confirm Purchase' },
  { id: 'step2', name: 'Cart' },
  { id: 'step3', name: 'Payment' },
  { id: 'step4', name: 'Payment Confirmation' },
];

const getInitialStepIndex = () => {
  if (typeof window === 'undefined') return 0;
  
  const stored = localStorage.getItem('PaymentProcessingStepIndex');
  return stored ? parseInt(stored, 10) : 0;
};

const usePaymentProcessingStore = create<PaymentProcessingStore>((set, get) => ({
  // Initial state
  message: '',
  currentStepIndex: getInitialStepIndex(),
  isFirstStep: getInitialStepIndex() === 0,
  isLastStep: getInitialStepIndex() === steps.length - 1,
  steps,

  // Set feedback message
  setMessage: (message) => set({ message }),


  // Move to the next step
  next: () => {
    const { currentStepIndex, steps } = get();
    if (currentStepIndex < steps.length - 1) {
      const newIndex = currentStepIndex + 1;
      if (typeof window !== 'undefined') {
        localStorage.setItem('PaymentProcessingStepIndex', newIndex.toString());
      }
      set({
        currentStepIndex: newIndex,
        isFirstStep: newIndex === 0,
        isLastStep: newIndex === steps.length - 1,
        message: '',
      });
    }
  },
  
  // Move to the previous step
  back: () => {
    const { currentStepIndex, steps } = get();
    if (currentStepIndex > 0) {
      const newIndex = currentStepIndex - 1;
      if (typeof window !== 'undefined') {
        localStorage.setItem('PaymentProcessingStepIndex', newIndex.toString());
      }
      set({
        currentStepIndex: newIndex,
        isFirstStep: newIndex === 0,
        isLastStep: newIndex === steps.length - 1,
        message: '',
      });
    }
  },

  // Go to a specific step by index (renamed from setCurrentStepIndex)
  goTo: (index) => {
    const { steps } = get();
    if (index >= 0 && index < steps.length) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('PaymentProcessingStepIndex', index.toString());
      }
      set({
        currentStepIndex: index,
        isFirstStep: index === 0,
        isLastStep: index === steps.length - 1,
        message: '',
      });
    }
  },
}));

export default usePaymentProcessingStore;
