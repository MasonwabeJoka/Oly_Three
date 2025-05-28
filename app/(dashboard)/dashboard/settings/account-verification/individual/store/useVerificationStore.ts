import { create } from 'zustand';

// Step definition without fields, as validation is handled in components
type Step = {
  id: string;
  name: string;
};

// Verification data structure
type VerificationData = {
  qrData?: string; // QR code scan result
  idInfo: {
    idType: string; // e.g., 'ID' or 'Passport'
    idNumber: string;
  };
  securityAnswers: {
    q1: string; // Answer to first security question
    q2: string; // Answer to second security question
  };
  selfie: string; // Selfie image data (e.g., base64 string or URL)
  mobile: {
    number: string; // Mobile number
    code: string; // Verification code
  };
};

// Store state and actions
type VerificationStore = {
  message: string; // Feedback message (e.g., errors or success)
  currentStepIndex: number; // Current step index
  isFirstStep: boolean; // Whether the current step is the first step
  isLastStep: boolean; // Whether the current step is the last step
  verificationData: VerificationData; // Collected verification data
  steps: Step[]; // Array of steps
  setMessage: (message: string) => void; // Set feedback message
  updateVerificationData: (data: Partial<VerificationData>) => void; // Update verification data
  resetVerificationData: () => void; // Reset data to initial state
  next: () => void; // Move to next step
  back: () => void; // Move to previous step
  goTo: (index: number) => void; // Renamed from setCurrentStepIndex
};

const steps: Step[] = [
  { id: 'step1', name: 'Verify Your Account' },
  { id: 'step2', name: 'QR Code Scanning' },
  { id: 'step3', name: 'ID or Passport Information' },
  { id: 'step4', name: 'Selfie Verification' },
  { id: 'step5', name: 'Mobile Number Verification' },
  { id: 'step6', name: 'Finish' },
];

const initialVerificationData: VerificationData = {
  qrData: '',
  idInfo: { idType: '', idNumber: '' },
  securityAnswers: { q1: '', q2: '' },
  selfie: '',
  mobile: { number: '', code: '' },
};

const initialStepIndex =
  typeof window !== 'undefined'
    ? parseInt(localStorage.getItem('verificationStepIndex') || '0', 10)
    : 0;
localStorage.setItem('verificationStepIndex', '1');
const useVerificationStore = create<VerificationStore>((set, get) => ({
  // Initial state
  message: '',
  currentStepIndex: initialStepIndex,
  isFirstStep: initialStepIndex === 0,
  isLastStep: initialStepIndex === steps.length - 1,
  verificationData: initialVerificationData,
  steps,

  // Set feedback message
  setMessage: (message) => set({ message }),

  // Update verification data with partial updates
  updateVerificationData: (data) =>
    set((state) => ({
      verificationData: { ...state.verificationData, ...data },
    })),

  // Reset verification data to initial state
  resetVerificationData: () =>
    set({ verificationData: initialVerificationData }),

  // Move to the next step
  next: () => {
    const { currentStepIndex, steps } = get();
    if (currentStepIndex < steps.length - 1) {
      const newIndex = currentStepIndex + 1;
      if (typeof window !== 'undefined') {
        localStorage.setItem('verificationStepIndex', newIndex.toString());
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
        localStorage.setItem('verificationStepIndex', newIndex.toString());
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
        localStorage.setItem('verificationStepIndex', index.toString());
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

export default useVerificationStore;