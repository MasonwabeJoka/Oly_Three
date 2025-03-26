import { create } from 'zustand';
import { Ad } from '@/sanity/Types/Ad';
import { FieldName, SubmitHandler } from 'react-hook-form';

export type FormData = {
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
type FormDataFields =
  | "selectACategory"
  | "details.condition"
  | "price.pricingOption"
  | "price.price"
  | "createAccount.bankName"
  | "createAccount.accountHolder"
  | "createAccount.accountNumber"
  | "titleAndDescription.title"
  | "titleAndDescription.description"
  | "uploadMedia.uploadPhotos"
  | "uploadMedia.uploadVideos"
  | "uploadMedia.uploadAttachments"
  | "location.province"
  | "location.city"
  | "location.suburb"
  | "location.customLocation"
  | "promoteYourAd.promotionDuration"
  | "reviewYourAd";

type Step = {
  id: string;
  name: string;
  fields: FormDataFields[];
};

const steps: Step[] = [
  { id: "step1", name: "Select a category", fields: ["selectACategory"] },
  { id: "step2", name: "Details", fields: ["details.condition"] },
  { id: "step3", name: "Price", fields: ["price.pricingOption", "price.price"] },
  { id: "step4", name: "Create Account", fields: ["createAccount.bankName", "createAccount.accountHolder", "createAccount.accountNumber"] },
  { id: "step5", name: "Title and Description", fields: ["titleAndDescription.title", "titleAndDescription.description"] },
  { id: "step6", name: "Upload Media", fields: ["uploadMedia.uploadPhotos", "uploadMedia.uploadVideos", "uploadMedia.uploadAttachments"] },
  { id: "step7", name: "Location", fields: ["location.province", "location.city", "location.suburb", "location.customLocation"] },
  { id: "step8", name: "Promote Your Ad", fields: ["promoteYourAd.promotionDuration"] },
  { id: "step9", name: "Congratulations", fields: [] },
  { id: "step10", name: "Review and Submit", fields: ["reviewYourAd"] },
];



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
  next: (trigger: any, handleSubmit: any, onSubmit: SubmitHandler<FormData>) => Promise<void>;
  back: () => void;
  goTo: (index: number) => void;
  setCategory: (category: string) => void;
  transformAdData: (data: Ad) => Partial<FormData>;
  setCurrentStepIndex: (index: number) => void;
};


const setStepInStorage = (index: number) => {
  if (typeof window !== "undefined") {
    localStorage.setItem('currentStepIndex', index.toString());
  }
};
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
  
    // Validate current step's fields
    if (currentStep.fields.length > 0) {
      const isValid = await trigger(currentStep.fields);
      if (!isValid) {
        set({ message: "Please fill in all required fields correctly." });
        return;
      }
    }
  
    if (currentStepIndex === steps.length - 1) {
      try {
        await handleSubmit(onSubmit)();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        set({ message: `Submission failed: ${errorMessage}` });
        throw error; // Allow callers to handle if needed
      }
    } else {
      const newIndex = currentStepIndex + 1;

      setStepInStorage(newIndex);
      
      set({
        currentStepIndex: newIndex,
        isFirstStep: newIndex === 0,
        isLastStep: newIndex === steps.length - 1,
      });
    }
  },

  back: () => set((state) => {
    const newIndex = Math.max(0, state.currentStepIndex - 1);
    setStepInStorage(newIndex);
    return {
      currentStepIndex: newIndex,
      isFirstStep: newIndex === 0,
      isLastStep: newIndex === steps.length - 1,
    };
  }),

  goTo: (index) => set(() => {
    setStepInStorage(index);
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
    setStepInStorage(index);
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

