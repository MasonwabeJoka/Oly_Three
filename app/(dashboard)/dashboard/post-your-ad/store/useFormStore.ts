import { create } from 'zustand';
import { Ad } from '@/sanity/Types/Ad';
import { FieldName, SubmitHandler } from 'react-hook-form';


type FormValues = {
  [key: string]: any; // Dynamic object structure for the different steps
};

type Step = {
  id: string;
  name: string;
  fields: (keyof FormValues)[];
};

type FormData = {
  selectACategory?: string;
  details: { condition: string };
  price: {
    pricingOption: string;
    price: number;
  };
  createAccount: {
    bankName: string;
    accountHolder: string;
    accountNumber: string;
  };
  titleAndDescription: {
    title: string;
    description: string;
  };
  uploadMedia: {
    uploadPhotos: boolean;
    uploadVideos: boolean;
    uploadAttachments: boolean;
  };
  location: {
    province: string;
    city: string;
    suburb: string;
    customLocation?: string;
  };
  promoteYourAd: { promotionDuration: string };
  reviewYourAd?: string;
};

type FormStore = {
  formData: FormData;
  updateFormData: (formData: Partial<FormData>) => void;
  resetFormData: () => void;
};

type FormState = {
  message: string;
  currentStepIndex: number;
  steps: Step[];
  isFirstStep: boolean;
  isLastStep: boolean;
  setMessage: (message: string) => void;
  next: (trigger: any, handleSubmit: any, onSubmit: SubmitHandler<FormValues>) => Promise<void>;
  back: () => void;
  goTo: (index: number) => void;
  setCategory: (category: string) => void;
  transformAdData: (data: Ad) => Partial<FormData>;
  setCurrentStepIndex: (index: number) => void;
};

const steps: Step[] = [
  { id: 'step1', name: 'Select a category', fields: [] },
  { id: 'step2', name: 'Details', fields: ['condition'] },
  { id: 'step3', name: 'Price', fields: ['pricingOption', 'price'] },
  { id: 'step4', name: 'Create Account', fields: ['bankName', 'accountHolder', 'accountNumber'] },
  { id: 'step5', name: 'Title and Description', fields: ['title', 'description'] },
  { id: 'step6', name: 'Upload Media', fields: [] },
  { id: 'step7', name: 'Location', fields: ['province', 'city', 'suburb', 'customLocation'] },
  { id: 'step8', name: 'Promote Your Ad', fields: ['promotionDuration'] },
  { id: 'step9', name: 'Congratulations', fields: [] },
  { id: 'step10', name: 'Review and Submit', fields: [] },
];

const useFormStore = create<FormState & FormStore>((set, get) => ({
  message: '',
  currentStepIndex: typeof window !== "undefined" ? parseInt(localStorage.getItem('currentStepIndex') || '0', 10) : 0,
  
  formData: {
    details: { condition: '' },
    price: { pricingOption: '', price: 0 },
    createAccount: { bankName: '', accountHolder: '', accountNumber: '' },
    titleAndDescription: { title: '', description: '' },
    uploadMedia: { uploadPhotos: false, uploadVideos: false, uploadAttachments: false },
    location: { province: '', city: '', suburb: '', customLocation: '' },
    promoteYourAd: { promotionDuration: '' },
  },

  steps,

  setMessage: (message) => set({ message }),

  isFirstStep: false,
  isLastStep: false,

  updateFormData: (newData) => set((state) => ({
    formData: { ...state.formData, ...newData },
  })),

  resetFormData: () => set({
    formData: {
      details: { condition: '' },
      price: { pricingOption: '', price: 0 },
      createAccount: { bankName: '', accountHolder: '', accountNumber: '' },
      titleAndDescription: { title: '', description: '' },
      uploadMedia: { uploadPhotos: false, uploadVideos: false, uploadAttachments: false },
      location: { province: '', city: '', suburb: '', customLocation: '' },
      promoteYourAd: { promotionDuration: '' },
    }
  }),

  next: async (trigger, handleSubmit, onSubmit) => {
    const { currentStepIndex, steps } = get();
    const currentStep = steps[currentStepIndex];

    set({ message: '' });

    if (currentStepIndex === steps.length - 1) {
      try {
        await handleSubmit(onSubmit)();
      } catch (error) {
        console.error('Error during submission:', error);
        set({ message: "An error occurred during submission. Please try again." });
        return;
      }
    }

    if (currentStepIndex < steps.length - 1) {
      const newIndex = currentStepIndex + 1;
      if (typeof window !== "undefined") {
        localStorage.setItem('currentStepIndex', newIndex.toString());
      }
      set({
        currentStepIndex: newIndex,
        isFirstStep: newIndex === 0,
        isLastStep: newIndex === steps.length - 1,
      });
    }
  },

  back: () => set((state) => {
    const newIndex = Math.max(0, state.currentStepIndex - 1);
    if (typeof window !== "undefined") {
      localStorage.setItem('currentStepIndex', newIndex.toString());
    }
    return {
      currentStepIndex: newIndex,
      isFirstStep: newIndex === 0,
      isLastStep: newIndex === steps.length - 1,
    };
  }),

  goTo: (index) => set(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('currentStepIndex', index.toString());
    }
    return {
      currentStepIndex: index,
      isFirstStep: index === 0,
      isLastStep: index === steps.length - 1,
    };
  }),

  setCategory: (category) => set((state) => ({
    formData: { ...state.formData, selectACategory: category },
  })),

  setCurrentStepIndex: (index) => {
    set({
      currentStepIndex: index,
      isFirstStep: index === 0,
      isLastStep: index === steps.length - 1,
    });
    if (typeof window !== "undefined") {
      localStorage.setItem('currentStepIndex', index.toString());
    }
  },

  transformAdData: (data: Ad): Partial<FormData> => ({
    selectACategory: data.category || '',
    details: { condition: data.condition || '' },
    price: { pricingOption: data.pricingOption || '', price: data.price || 0 },
    createAccount: {
      bankName: data.bankName || '',
      accountHolder: data.accountHolder || '',
      accountNumber: data.accountNumber || '0',
    },
    titleAndDescription: {
      title: data.title || '',
      description: data.description
        ? data.description.map(block => block.children.map(child => child.text).join(' ')).join(' ')
        : '',
    },
    uploadMedia: {
      uploadPhotos: !!data.images?.length,
      uploadVideos: !!data.videos?.length,
      uploadAttachments: !!data.attachments?.length,
    },
    location: {
      province: data.province || '',
      city: data.city || '',
      suburb: data.suburb || '',
      customLocation: data.customLocation || '',
    },
    promoteYourAd: { promotionDuration: data.promotionDuration || '' },
  }),
}));

export default useFormStore;

