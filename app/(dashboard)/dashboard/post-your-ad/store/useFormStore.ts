import { create } from 'zustand';
import { Ad } from '@/sanity/Types/Ad';
import { FieldName, SubmitHandler } from 'react-hook-form';

// Define the shape of the form data (what information the user will fill out)
export type FormData = {
  selectACategory?: string; // Optional field for choosing a category (e.g., "Electronics")
  details: { condition: string }; // Section for item details, like "New" or "Used"
  price: {
    pricingOption: string; // How the price is set (e.g., "Fixed" or "Negotiable")
    price: number; // The actual price amount
  };
  createAccount: {
    bankName: string; // Name of the bank for payment details
    accountHolder: string; // Name of the person who owns the account
    accountNumber: string; // Bank account number
  };
  titleAndDescription: {
    title: string; // Title of the ad (e.g., "Selling a Laptop")
    description: string; // Longer description of the item
  };
  uploadMedia: {
    uploadPhotos: boolean; // True if user wants to upload photos
    uploadVideos: boolean; // True if user wants to upload videos
    uploadAttachments: boolean; // True if user wants to upload other files
  };
  location: {
    province: string; // Province or state of the location
    city: string; // City of the location
    suburb: string; // Suburb or neighborhood
    customLocation?: string; // Optional custom location details
  };
  promoteYourAd: { promotionDuration: string }; // How long to promote the ad (e.g., "1 week")
  reviewYourAd?: string; // Optional field for reviewing the ad before submission
};

// List of all possible field names in the form, written as strings
// Used to identify which fields belong to each step
type FormDataFields =
  | "selectACategory"
  | "details.condition"
  | "details.selectDetails"
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

// Define what a "step" in the form looks like
type Step = {
  id: string; // Unique ID for the step (e.g., "step1")
  name: string; // Friendly name shown to the user (e.g., "Select a category")
  fields: FormDataFields[]; // List of fields the user needs to fill in this step
};

// Define all the steps of the form in order
const steps: Step[] = [
  { id: "step1", name: "Select a category", fields: ["selectACategory"] },
  { id: "step2", name: "Details", fields: ["details.condition", "details.selectDetails"] },
  { id: "step3", name: "Price", fields: ["price.pricingOption", "price.price"] },
  { id: "step4", name: "Create Account", fields: ["createAccount.bankName", "createAccount.accountHolder", "createAccount.accountNumber"] },
  { id: "step5", name: "Title and Description", fields: ["titleAndDescription.title", "titleAndDescription.description"] },
  { id: "step6", name: "Upload Media", fields: ["uploadMedia.uploadPhotos", "uploadMedia.uploadVideos", "uploadMedia.uploadAttachments"] },
  { id: "step7", name: "Location", fields: ["location.province", "location.city", "location.suburb", "location.customLocation"] },
  { id: "step8", name: "Promote Your Ad", fields: [] },
  { id: "step9", name: "Congratulations", fields: [] }, // No fields here, just a confirmation page
  { id: "step10", name: "Review and Submit", fields: ["reviewYourAd"] },
];

// Define the part of the store that holds and manages the form data
type FormStore = {
  formData: FormData; // The current data entered by the user
  updateFormData: (formData: Partial<FormData>) => void; // Function to update some or all of the form data
  resetFormData: () => void; // Function to clear the form back to its starting state
};

// Define the part of the store that controls the form’s steps and navigation
type FormState = {
  message: string; // A message to show the user (e.g., "Please fill in all fields")
  currentStepIndex: number; // Which step the user is on (0 is the first step)
  steps: Step[]; // The list of steps defined above
  isFirstStep: boolean; // True if the user is on the first step
  isLastStep: boolean; // True if the user is on the last step
  setMessage: (message: string) => void; // Function to set or change the message
  next: (trigger: any, handleSubmit: any, onSubmit: SubmitHandler<FormData>) => Promise<void>; // Moves to the next step or submits the form
  back: () => void; // Goes back to the previous step
  goTo: (index: number) => void; // Jumps to a specific step by its index
  setCategory: (category: string) => void; // Sets the category field in the form
  transformAdData: (data: Ad) => Partial<FormData>; // Converts existing ad data into form data
  setCurrentStepIndex: (index: number) => void; // Sets which step the user is on
};

// Function to save the current step number to the browser’s local storage
// This keeps track of progress even if the page is refreshed
const setStepInStorage = (index: number) => {
  if (typeof window !== "undefined") { // Check if we’re in a browser (not server-side)
    localStorage.setItem('currentStepIndex', index.toString()); // Save the step number
  }
};

// Create the Zustand store to manage the form’s state
const useFormStore = create<FormState & FormStore>((set, get) => ({
  // Start with an empty message
  message: '',
  
  // Set the starting step from local storage (or 0 if nothing is saved)
  currentStepIndex: typeof window !== "undefined" ? parseInt(localStorage.getItem('currentStepIndex') || '0', 10) : 0,
  
  // Starting values for the form data (everything empty or false to begin with)
  formData: {
    details: { condition: '' },
    price: { pricingOption: '', price: 0 },
    createAccount: { bankName: '', accountHolder: '', accountNumber: '' },
    titleAndDescription: { title: '', description: '' },
    uploadMedia: { uploadPhotos: false, uploadVideos: false, uploadAttachments: false },
    location: { province: '', city: '', suburb: '', customLocation: '' },
    promoteYourAd: { promotionDuration: '' },
  },

  // Use the steps array we defined earlier
  steps,

  // Function to update the message shown to the user
  setMessage: (message) => set({ message }),

  // Start with these as false (updated later when moving between steps)
  isFirstStep: false,
  isLastStep: false,

  // Function to update parts of the form data as the user fills it out
  updateFormData: (newData) => set((state) => ({
    formData: { ...state.formData, ...newData }, // Combine old data with new data
  })),

  // Function to reset the form data back to its starting values
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

  // Function to move to the next step or submit the form if it’s the last step
  next: async (trigger, handleSubmit, onSubmit) => {
    const { currentStepIndex, steps } = get(); // Get the current step number and steps list
    const currentStep = steps[currentStepIndex]; // Get details of the current step
    
    // Clear any previous messages
    set({ message: '' });
    
    // Check if this step has fields to fill out
    if (currentStep.fields.length > 0) {
      try {
        // Validate the fields (from React Hook Form)
        const isValid = await trigger(currentStep.fields, {
          shouldFocus: true  // Focus on first invalid field
        });
        
        if (!isValid) { // If something's wrong (e.g., missing data)
          set({ message: "Please correct all highlighted errors before continuing." }); // Show an error
          return; // Stop here
        }
      } catch (error) {
        set({ message: "Validation error occurred. Please check your inputs." });
        return;
      }
    }

    // If this is the last step, submit the form
    if (currentStepIndex === steps.length - 1) {
      try {
        await handleSubmit(onSubmit)(); // Submit the form data (from React Hook Form)
      } catch (error) { // If submission fails
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        set({ message: `Submission failed: ${errorMessage}` }); // Show what went wrong
        return;
      }
    } else { // If it's not the last step, move to the next one
      const newIndex = currentStepIndex + 1; // Increase the step number
      setStepInStorage(newIndex); // Save the new step to local storage
      set({
        currentStepIndex: newIndex, // Update the step number
        isFirstStep: newIndex === 0, // Check if it's the first step
        isLastStep: newIndex === steps.length - 1, // Check if it's the last step
      });
    }
  },

  // Function to go back to the previous step
  back: () => set((state) => {
    const newIndex = Math.max(0, state.currentStepIndex - 1); // Decrease step number, but not below 0
    setStepInStorage(newIndex); // Save the new step
    return {
      currentStepIndex: newIndex, // Update the step number
      isFirstStep: newIndex === 0, // Check if it’s the first step
      isLastStep: newIndex === steps.length - 1, // Check if it’s the last step
    };
  }),

  // Function to jump to a specific step by its number
  goTo: (index) => set(() => {
    setStepInStorage(index); // Save the new step
    return {
      currentStepIndex: index, // Set the step number
      isFirstStep: index === 0, // Check if it’s the first step
      isLastStep: index === steps.length - 1, // Check if it’s the last step
    };
  }),

  // Function to set the category field in the form data
  setCategory: (category) => set((state) => ({
    formData: { ...state.formData, selectACategory: category }, // Update just the category
  })),

  // Function to manually set the current step number
  setCurrentStepIndex: (index) => {
    set({
      currentStepIndex: index, // Set the step number
      isFirstStep: index === 0, // Check if it’s the first step
      isLastStep: index === steps.length - 1, // Check if it’s the last step
    });
    setStepInStorage(index); // Save the step
  },

  // Function to take existing ad data (from Sanity) and turn it into form data
  // Useful for pre-filling the form with saved information
  transformAdData: (data: Ad): Partial<FormData> => ({
    selectACategory: data.category || '', // Use the ad’s category or empty string
    details: { condition: data.condition || '' },
    price: { pricingOption: data.pricingOption || '', price: data.price || 0 },
    createAccount: {
      bankName: data.bankName || '',
      accountHolder: data.accountHolder || '',
      accountNumber: data.accountNumber || '0',
    },
    titleAndDescription: {
      title: data.title || '',
      description: data.description // If there’s a description, combine all text parts
        ? data.description.map(block => block.children.map(child => child.text).join(' ')).join(' ')
        : '',
    },
    uploadMedia: {
      uploadPhotos: !!data.images?.length, // True if there are images
      uploadVideos: !!data.videos?.length, // True if there are videos
      uploadAttachments: !!data.attachments?.length, // True if there are attachments
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

// Export the store so it can be used in other parts of the app
export default useFormStore;

