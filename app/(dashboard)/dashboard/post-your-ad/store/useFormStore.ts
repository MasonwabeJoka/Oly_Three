import { z } from 'zod';
import { create } from 'zustand';
import { multiStepFormSchema } from '@/lib/validations/formValidations';
import { Ad } from '@/sanity/Types/Ad';
import { FieldName, SubmitHandler, useFormContext } from 'react-hook-form';

type FormValues = z.infer<typeof multiStepFormSchema>;

export type Step = {
  id: string;
  name: string;
  fields: (keyof FormValues)[]; // Ensure fields match the keys in FormValues
};

type FormState = {
  message: string;
  setMessage: (message: string) => void;
  currentStepIndex: number;
  isEditMode: boolean;
  initialData: FormValues;
  steps: Step[];
  isFirstStep: boolean;
  isLastStep: boolean;
  next: (trigger: any, handleSubmit: any, onSubmit: SubmitHandler<FormValues>) => Promise<void>;
  back: () => void;
  goTo: (index: number) => void;
  setCategory: (category: string) => void;
  transformAdData: (data: Ad) => FormValues;
  setEditMode: (editMode: boolean) => void;
};

const steps: Step[] = [
  { id: 'step 1', name: 'Select a category', fields: [] },
  { id: 'step 2', name: 'Details', fields: ['condition', 'selectDetail', 'detail'] },
  { id: 'step 3', name: 'Features', fields: ['selectFeature', 'feature'] },
  { id: 'step 4', name: 'Price', fields: ['pricingOption', 'price'] },
  { id: 'step 5', name: 'Create Account', fields: ['bankName', 'accountName', 'accountNumber'] },
  { id: 'step 6', name: 'Title and Description', fields: ['title', 'description'] },
  { id: 'step 7', name: 'Upload Media', fields: [] },
  { id: 'step 8', name: 'Upload Photos', fields: ['image'] },
  { id: 'step 9', name: 'Upload Videos', fields: ['video'] },
  { id: 'step 10', name: 'Upload Attachments', fields: ['attachment'] },
  { id: 'step 11', name: 'Location', fields: ['province', 'city', 'suburb', 'customLocation'] },
  { id: 'step 12', name: 'Promote Your Ad', fields: ['promotionDuration'] },
  { id: 'step 13', name: 'Review and Submit', fields: [] },
  { id: 'step 14', name: 'Reorder Photos', fields: [] },
];

const useFormStore = create<FormState>((set, get) => {
  const savedStepIndex = parseInt(localStorage.getItem('currentStepIndex') || '0', 10);
  return {
    message: '',
    currentStepIndex: savedStepIndex,
    isEditMode: false,
    isFirstStep: savedStepIndex === 0,
    isLastStep: savedStepIndex === (steps.length - 1),
  
    initialData: {
      condition: '',
      selectDetail: '',
      detail: '',
      selectFeature: 'Choose features to include',
      feature: '',
      pricingOption: '',
      price: 0,
      bankName: '',
      accountName: '',
      accountNumber: '',
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
      promotionDuration: '',
    },
  
    steps,
  
    setMessage: (message) => set({ message }),
  
    next: async (trigger, handleSubmit, onSubmit) => {
      const { currentStepIndex } = get();
      const fields = steps[currentStepIndex].fields;

      const isItValid = await trigger(fields as FieldName<FormValues>[], {
        shouldFocus: true,
      });

      // if (!isItValid) {
      //   console.log("Validation failed for fields:", fields);
      //   set({ message: "Please correct the highlighted errors before proceeding." });
      //   return;
      // }

      if (currentStepIndex === steps.length - 2) {
        try {
          await handleSubmit(onSubmit)();
        } catch (error) {
          console.error('Error during submission:', error);
        }

        // Update local storage before moving to the next step
        localStorage.setItem('currentStepIndex', (currentStepIndex + 1).toString());
        set({ currentStepIndex: currentStepIndex + 1 });
        return;
      }

      if (currentStepIndex < steps.length - 1) {
        set((state) => {
          const newIndex =
            state.currentStepIndex === 6 ||
            state.currentStepIndex === 7 ||
            state.currentStepIndex === 8 ||
            state.currentStepIndex === 9
              ? 10
              : state.currentStepIndex + 1;

          // Update local storage
          localStorage.setItem('currentStepIndex', newIndex.toString());

          return {
            currentStepIndex: newIndex,
            isFirstStep: newIndex === 0,
            isLastStep: newIndex === steps.length - 1,
          };
        });
      }
    },
  
    back: () => {
      set((state) => {
        const newIndex =
          state.currentStepIndex <= 0
            ? state.currentStepIndex
            : state.currentStepIndex === 7 ||
              state.currentStepIndex === 8 ||
              state.currentStepIndex === 9 ||
              state.currentStepIndex === 10
            ? 6
            : state.currentStepIndex - 1;

        // Update local storage
        localStorage.setItem('currentStepIndex', newIndex.toString());

        return {
          currentStepIndex: newIndex,
          isFirstStep: newIndex === 0,
          isLastStep: newIndex === state.steps.length - 1,
        };
      });
    },
  
    goTo: (index) => {
      set((state) => {
        // Update local storage
        localStorage.setItem('currentStepIndex', index.toString());

        return {
          currentStepIndex: index,
          isFirstStep: index === 0,
          isLastStep: index === state.steps.length - 1,
        };
      });
    },
  
    setCategory: (category) => {
      set((state) => ({
        initialData: {
          ...state.initialData,
          category,
        },
      }));
    },
  
    setEditMode: (editMode) => {
      set({ isEditMode: editMode });
    },
  
    transformAdData: (data) => {
      return {
        condition: data.condition,
        selectDetail: "See a list of details you can include", // Placeholder
        detail: "", // Placeholder
        selectFeature: "Choose features to include", // Placeholder
        feature: data.features?.join(", ") || "", // Join features array to string
        pricingOption: data.pricingOption,
        price: data.price,
        bankName: data.bankName, //Todo: I think this must be part of user schema and not ad schema
        accountName: data.accountName,//Todo: I think this must be part of user schema and not ad schema
        accountNumber: data.accountNumber,//Todo: I think this must be part of user schema and not ad schema
        title: data.title,
        description: data.description
          ? data.description
              .map((block) => block.children.map((child) => child.text).join(" "))
              .join(" ")
          : "",
        image: data.images[0]?.url || "", // Example using the first image
        video: data.videos?.[0]?.url || "", // Example using the first video
        attachment: data.attachments?.[0]?.url || "", // Example using the first attachment
        province: "", // Placeholder
        city: data.city,
        suburb: data.suburb,
        customLocation: "", // Placeholder
        category: data.category,
        promotionDuration: data.promotionDuration || "", // Placeholder
      };
    },
  };
});

export default useFormStore;
