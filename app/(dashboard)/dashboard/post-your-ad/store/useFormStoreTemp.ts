import { create } from 'zustand';
import { z } from 'zod';
import { multiStepFormSchema } from '@/lib/validations/formValidations';
import { Ad } from '@/sanity/Types/Ad';
import { FieldName, SubmitHandler } from 'react-hook-form';

type FormValues = z.infer<typeof multiStepFormSchema>;

type Step = {
  id: string;
  name: string;
  fields: (keyof FormValues)[];
};

type FormState = {
  message: string;
  currentStepIndex: number;
  initialData: FormValues;
  steps: Step[];
  isFirstStep: boolean;
  isLastStep: boolean;
  setMessage: (message: string) => void;
  next: (trigger: any, handleSubmit: any, onSubmit: SubmitHandler<FormValues>) => Promise<void>;
  back: () => void;
  goTo: (index: number) => void;
  setCategory: (category: string) => void;
  transformAdData: (data: Ad) => FormValues;
  setCurrentStepIndex: (index: number) => void;
};

const steps: Step[] = [
  { id: 'step1', name: 'Select a category', fields: [] },
  { id: 'step2', name: 'Details', fields: ['condition'] },
  { id: 'step4', name: 'Price', fields: ['pricingOption', 'price'] },
  { id: 'step5', name: 'Create Account', fields: ['bankName', 'accountHolder', 'accountNumber'] },
  { id: 'step6', name: 'Title and Description', fields: ['title', 'description'] },
  { id: 'step7', name: 'Upload Media', fields: [] },
  { id: 'step8', name: 'Location', fields: ['province', 'city', 'suburb', 'customLocation'] },
  { id: 'step9', name: 'Promote Your Ad', fields: ['promotionDuration'] },
  { id: 'step10', name: 'Review and Submit', fields: [] },
];

const placeholderValues = {
  selectDetail: "See a list of details you can include",
  selectFeature: "Choose features to include",
  promotionDuration: "Choose promotion duration",
};

const initialFormData: FormValues = {
  condition: '',
  selectDetail: placeholderValues.selectDetail,
  detail: '',
  selectFeature: placeholderValues.selectFeature,
  feature: '',
  pricingOption: '',
  price: 0,
  startingPrice: 0,
  reservePrice: 0,
  buyNowPrice: 0,
  bidIncrement: 0,
  startTime: '',
  endTime: '',
  bankName: '',
  accountHolder: '',
  accountNumber: '0',
  title: '',
  description: '',
  image: '',
  video: '',
  attachment: '',
  province: '',
  city: '',
  suburb: '',
  customLocation: '',
  category: '',
};

const useFormStore = create<FormState>((set, get) => ({
  message: '',
  currentStepIndex: parseInt(localStorage.getItem('currentStepIndex') || '0', 10),
  initialData: initialFormData,
  steps,
    
  setMessage: (message) => set({ message }),

  isFirstStep: false, // Initialize as true since we start at the first step
  isLastStep: false, // Initialize as false
  next: async (trigger, handleSubmit, onSubmit) => {
    const { currentStepIndex, steps } = get();
    const currentStep = steps[currentStepIndex];

    // Validate current step
    if (currentStep.fields.length > 0) {
      const isValid = await trigger(currentStep.fields as FieldName<FormValues>[], { shouldFocus: true });

      if (!isValid) {
        set({ message: "Please correct the highlighted errors before proceeding." });
        return;
      }
    }
  
    // Clear any previous error messages
    set({ message: '' });
  
    // Handle form submission if it's the second-to-last step
    if (currentStepIndex === steps.length - 2) {
      try {
        await handleSubmit(onSubmit)();
      } catch (error) {
        console.error('Error during submission:', error);
        set({ message: "An error occurred during submission. Please try again." });
        return;
      }
    }
  
    // Move to the next step if not on the last step
    if (currentStepIndex < steps.length - 1) {
      const newIndex = currentStepIndex + 1;
      localStorage.setItem('currentStepIndex', newIndex.toString());
      set({ 
        currentStepIndex: newIndex,
        isFirstStep: newIndex === 0,
        isLastStep: newIndex === steps.length - 1
      });
    }
  },
  
  


  back: () => set((state) => {
    const newIndex = Math.max(0, state.currentStepIndex - 1);
    localStorage.setItem('currentStepIndex', newIndex.toString());
    return { 
      currentStepIndex: newIndex,
      isFirstStep: newIndex === 0,
      isLastStep: newIndex === steps.length - 1
    };
  }),

  goTo: (index) => set(() => {
    localStorage.setItem('currentStepIndex', index.toString());
    return { 
      currentStepIndex: index,
      isFirstStep: index === 0,
      isLastStep: index === steps.length - 1
    };
  }),

  setCategory: (category) => set((state) => ({
    initialData: { ...state.initialData, category },
  })),

  setCurrentStepIndex: (index) => {
    set({ 
      currentStepIndex: index,
      isFirstStep: index === 0,
      isLastStep: index === steps.length - 1
    });
    localStorage.setItem('currentStepIndex', index.toString());
  },

  

  transformAdData: (data: Ad): FormValues => ({
    ...initialFormData,
    condition: data.condition || '',
    detail: data.details?.join(', ') || '',
    feature: data.features?.join(', ') || '',
    pricingOption: data.pricingOption || '',
    price: data.price || 0,
    startingPrice: data.startingPrice || 0,
    reservePrice: data.reservePrice || 0,
    buyNowPrice: data.buyNowPrice || 0,
    bankName: data.bankName || '',
    accountHolder: data.accountHolder || '',
    accountNumber: data.accountNumber ,
    title: data.title || '',
    description: data.description
      ? data.description.map(block => block.children.map(child => child.text).join(' ')).join(' ')
      : '',
   image: data.images?.[0]?.url || '',
    video: data.videos?.[0]?.url || '',
    attachment: data.attachments?.[0]?.url || '',
    province: data.province || '',
    city: data.city || '',
    suburb: data.suburb || '',
    customLocation: data.customLocation || '',
    category: data.category || '',
  }),
}));

export default useFormStore;
