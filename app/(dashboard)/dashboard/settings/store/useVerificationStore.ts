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
  verificationData: VerificationData; // Collected verification data
  steps: Step[]; // Array of steps
  userType: null | 'individual' | 'business';
  setUserType: (type: 'individual' | 'business' | null) => void;
  clearUserTypeData: () => void; // Clear user type specific data
  setMessage: (message: string) => void; // Set feedback message
  updateVerificationData: (data: Partial<VerificationData>) => void; // Update verification data
  resetVerificationData: () => void; // Reset data to initial state
  setCurrentStepIndex: (index: number) => void; // Set the current step index (used by effect)
};

const initialVerificationData: VerificationData = {
  qrData: '',
  idInfo: { idType: '', idNumber: '' },
  securityAnswers: { q1: '', q2: '' },
  selfie: '',
  mobile: { number: '', code: '' },
};

const useVerificationStore = create<VerificationStore>((set, get) => ({
  // Initial state
  message: '',
  currentStepIndex: 0,
  verificationData: initialVerificationData,
  steps: [], // Will be set dynamically based on userType
  userType: null,

  setUserType: (type) => {
    const newSteps = type === 'business'
      ? [
          { id: 'business-intro', name: 'Business Introduction' },
          { id: 'business-details', name: 'Business Details' },
          { id: 'rep-id', name: 'Representative ID' },
          { id: 'rep-selfie', name: 'Representative Selfie' },
          { id: 'rep-mobile', name: 'Representative Mobile' },
          { id: 'business-finish', name: 'Business Finish' },
        ]
      : type === 'individual'
        ? [
            { id: 'individual-intro', name: 'Individual Introduction' },
            { id: 'individual-id', name: 'ID/Passport' },
            { id: 'individual-selfie', name: 'Selfie Verification' },
            { id: 'individual-mobile', name: 'Mobile Verification' },
            { id: 'individual-finish', name: 'Individual Finish' },
          ]
        : [];
    set({
      userType: type,
      steps: newSteps,
    });
  },

  // Clear user type specific data when switching types
  clearUserTypeData: () => set({
    verificationData: initialVerificationData,
    currentStepIndex: 0,
    message: '',
    steps: [],
  }),

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

  // Set the current step index (used by effect in AccountVerification)
  setCurrentStepIndex: (index) => set({ currentStepIndex: index }),
}));

export default useVerificationStore;