import { create } from 'zustand';
import { Ad } from '@/sanityTemp/Types/Ad';
import { FieldName, SubmitHandler } from 'react-hook-form';

// Define the shape of the form data (what information the user will fill out)
export type FormData = {
  category: { main: string; subcategory: string }; // Field for choosing a category (e.g., "Electronics")
  details: { condition: string }; // Section for item details, like "New" or "Used"
  price: {
    pricingOption: string; // How the price is set (e.g., "Fixed" or "Negotiable")
    amount: number; // The actual price amount
    startingPrice?: number;
    buyNowPrice?: number;
    startTime?: string;
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
  | "category.main"
  | "category.subcategory"
  | "details.condition"
  | "price.pricingOption"
  | "price.amount"
  | "price.startingPrice"
  | "price.buyNowPrice"
  | "price.startTime"
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
  { id: "step0", name: "Select a category", fields: ["category.main", "category.subcategory"] },
  { id: "step1", name: "Details", fields: ["details.condition"] },
  { id: "step2", name: "Price", fields: ["price.pricingOption", "price.amount"] },
  { id: "step3", name: "Create Account", fields: ["createAccount.bankName", "createAccount.accountHolder", "createAccount.accountNumber"] },
  { id: "step4", name: "Title and Description", fields: ["titleAndDescription.title", "titleAndDescription.description"] },
  { id: "step5", name: "Upload Media", fields: ["uploadMedia.uploadPhotos", "uploadMedia.uploadVideos", "uploadMedia.uploadAttachments"] },
  { id: "step6", name: "Location", fields: ["location.province", "location.city", "location.suburb", "location.customLocation"] },
  { id: "step7", name: "Promote Your Ad", fields: ["promoteYourAd.promotionDuration"] },
  { id: "step8", name: "Congratulations", fields: [] },
  { id: "step9", name: "Review and Submit", fields: [] },
  { id: "step10", name: "Select New Category", fields: [] }, // Add the new step
];

export const slugMap: { index: number; slug: string }[] = [
  { index: 0, slug: "select-a-category" },
  { index: 1, slug: "details" },
  { index: 2, slug: "price" },
  { index: 3, slug: "create-account" },
  { index: 4, slug: "title-and-description" },
  { index: 5, slug: "upload-media" },
  { index: 6, slug: "location" },
  { index: 7, slug: "promote-your-ad" },
  { index: 8, slug: "congratulations" },
  { index: 9, slug: "review-and-submit" },
  { index: 10, slug: "select-new-category" },
];

// Define the part of the store that holds and manages the form data
type FormStore = {
  formData: FormData;
  updateFormData: (formData: Partial<FormData>) => void;
  resetFormData: () => void;
};

// Define the part of the store that controls the form’s steps and navigation
type FormState = {
  message: string; // A message to show the user (e.g., "Please fill in all fields")
  currentStepIndex: number; // Which step the user is on (0 is the first step)
  steps: Step[]; // The list of steps defined above
  isFirstStep: boolean; // True if the user is on the first step
  isLastStep: boolean; // True if the user is on the last step
  categoryPreviouslySelected: boolean; // True if a category has been selected before
  setMessage: (message: string) => void; // Function to set or change the message
  next: (trigger: any, handleSubmit: any, onSubmit: SubmitHandler<FormData>) => Promise<void>; // Moves to the next step or submits the form
  back: () => void; // Goes back to the previous step
  goTo: (index: number, trigger?: any) => Promise<void>; // Jumps to a specific step by its index
  setCategory: (main: string, subcategory: string) => void; // Sets the category field in the form
  transformAdData: (data: Ad) => Partial<FormData>; // Converts existing ad data into form data
  setCurrentStepIndex: (index: number) => void; // Sets which step the user is on
  setCategoryPreviouslySelected: (selected: boolean) => void; // Sets whether category was previously selected
};

// Function to save the current step number to the browser’s local storage
// This keeps track of progress even if the page is refreshed
const setStepInStorage = (index: number) => {
  if (typeof window !== "undefined") { // Check if we’re in a browser (not server-side)
    localStorage.setItem('currentStepIndex', index.toString()); // Save the step number
  }
};

// Function to update the URL with the step's slug

const updateUrlWithStep = (index: number) => {
  if (typeof window !== "undefined") {
    const slugEntry = slugMap.find(entry => entry.index === index);
    const slug = slugEntry ? slugEntry.slug : "select-a-category";// Default to first step
    const newUrl = `/dashboard/post-your-ad/${slug}`;
    const stepId = steps[index]?.id || steps[0].id;// Fallback to first step ID if index is invalid
    window.history.pushState({ step: stepId }, "", newUrl);
  }
};

// Create the Zustand store to manage the form’s state
const useFormStore = create<FormState & FormStore>((set, get) => ({
  // Start with an empty message
  message: '',

    // Function to update the message shown to the user
  setMessage: (message) => set({ message }),
  
// Initialize currentStepIndex from URL path or localStorage

  currentStepIndex: (() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const basePath = "/dashboard/post-your-ad/";
      if (path.startsWith(basePath)) {
        const slug = path.slice(basePath.length); // Extract slug after /dashboard/post-your-ad/
        const slugEntry = slugMap.find(entry => entry.slug === slug);
        const stepIndex = slugEntry ? slugEntry.index : -1;
        if (stepIndex !== -1) return stepIndex;
      }
      const storedIndex = parseInt(localStorage.getItem('currentStepIndex') || '0', 10);
      return storedIndex;
    }
    return 0;
  })(), //currentStepIndex needs a starting value when the store is created.

  

  // Starting values for the form data (everything empty or false to begin with)
  formData: {
    category: { main: "", subcategory: "" },
    details: { condition: '' },
    price: { pricingOption: '', amount: 0, startingPrice: undefined, buyNowPrice: undefined, startTime: undefined },
    createAccount: { bankName: '', accountHolder: '', accountNumber: '' },
    titleAndDescription: { title: '', description: '' },
    uploadMedia: { uploadPhotos: false, uploadVideos: false, uploadAttachments: false },
    location: { province: '', city: '', suburb: '', customLocation: '' },
    promoteYourAd: { promotionDuration: '' },
  },

  // Use the steps array we defined earlier
  steps,

  // Start with these as false (updated later when moving between steps)
  isFirstStep: false,
  isLastStep: false,
  categoryPreviouslySelected: false,

  // Function to update parts of the form data as the user fills it out
  updateFormData: (newData) => set((state) => ({
    formData: { ...state.formData, ...newData }, // Combine old data with new data
  })),

  // Function to reset the form data back to its starting values
  resetFormData: () => set({
    formData: {
      category: { main: "", subcategory: "" },
      details: { condition: "" },
      price: { pricingOption: '', amount: 0, startingPrice: undefined, buyNowPrice: undefined, startTime: undefined },
      createAccount: { bankName: '', accountHolder: '', accountNumber: '' },
      titleAndDescription: { title: '', description: '' },
      uploadMedia: { uploadPhotos: false, uploadVideos: false, uploadAttachments: false },
      location: { province: '', city: '', suburb: '', customLocation: '' },
      promoteYourAd: { promotionDuration: '' },
    },
    categoryPreviouslySelected: false, // Reset category selection flag
  }),

  // Function to move to the next step or submit the form if it’s the last step
  next: async (trigger, handleSubmit, onSubmit) => {
    const { currentStepIndex, steps } = get();
    
    // Clear any previous messages
    set({ message: '' });

    // Validate only the fields for the current step
    const fieldsToValidate = steps[currentStepIndex].fields.filter(
      field => field !== "location.customLocation" && field !== "reviewYourAd"
    );

    if (fieldsToValidate.length > 0) {
      try {
        const isValid = await trigger(fieldsToValidate, { shouldFocus: true });
        if (!isValid) {
          const { errors } = await trigger(fieldsToValidate, { shouldFocus: false });
          const errorMessages = Object.entries(errors || {})
            .map(([field, error]) => `${field}: ${error.message}`)
            .join("; ");
          set({ message: `Please correct the following errors: ${errorMessages || "Invalid fields"}` });
          return; // Stop navigation if validation fails
        }
      } catch (error) {
        set({ message: "Validation error occurred. Please check your inputs." });
        return;
      }
    }

    // If this is the last step, submit the form
    if (currentStepIndex === steps.length - 1) {
      try {
        const isValid = await trigger(); // Validate all fields
        if (!isValid) {
          const { errors } = await trigger([], { shouldFocus: false });
          const errorMessages = Object.entries(errors || {})
            .map(([field, error]) => `${field}: ${error.message}`)
            .join("; ");
          set({ message: `Please correct the following errors: ${errorMessages || "Invalid form data"}` });
          return; // Stop submission if validation fails
        }
        await handleSubmit(onSubmit)();
      } catch (error) { // If submission fails
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        set({ message: `Submission failed: ${errorMessage}` }); // Show what went wrong
        return;
      }
    } else { // If it's not the last step, move to the next one
      const newIndex = currentStepIndex + 1; // Increase the step number
      set({
        currentStepIndex: newIndex, // Update the step number
        isFirstStep: newIndex === 0, // Check if it's the first step
        isLastStep: newIndex === steps.length - 1, // Check if it's the last step
        message: '',
      });
    }
  },

  // Function to go back to the previous step
  back: () => set((state) => {
    const newIndex = Math.max(0, state.currentStepIndex - 1); // Decrease step number, but not below 0
    return {
      currentStepIndex: newIndex, // Update the step number
      isFirstStep: newIndex === 0, // Check if it’s the first step
      isLastStep: newIndex === state.steps.length - 1, // Check if it’s the last step
    };
  }),

  // Function to jump to a specific step by its number
  goTo: async (index, trigger) => {
    const { steps } = get();
    
    // Validate all fields up to the target step
    if (trigger) {
      const fieldsToValidate = steps
        .slice(0, index + 1)
        .flatMap(step => step.fields)
        .filter(field => field !== "location.customLocation" && field !== "reviewYourAd");
      
      if (fieldsToValidate.length > 0) {
        const isValid = await trigger(fieldsToValidate, { shouldFocus: true });
        if (!isValid) {
          const { errors } = await trigger(fieldsToValidate, { shouldFocus: false });
          const errorMessages = Object.entries(errors || {})
            .map(([field, error]) => `${field}: ${error.message}`)
            .join("; ");
          set({ message: `Please correct the following errors: ${errorMessages || "Invalid fields"}` });
          return; // Stop navigation if validation fails
        }
      }
    }

    set({
      currentStepIndex: index, // Set the step number
      isFirstStep: index === 0, // Check if it’s the first step
      isLastStep: index === steps.length - 1, // Check if it’s the last step
      message: '',
    });
  },

  // Function to set the category field in the form data
  setCategory: (main: string, subcategory: string) => set((state) => ({
    formData: {
      ...state.formData,
      category: { main, subcategory },
    },
    categoryPreviouslySelected: true, // Mark category as previously selected
  })),

  // Function to set whether category was previously selected
  setCategoryPreviouslySelected: (selected: boolean) => set({ categoryPreviouslySelected: selected }),

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
    category: {
      main: data.category?.title || data.category?.mainCategory || "",
      subcategory: data.category?.childrenCategories?.[0]?.title || "",
    }, // Use the ad’s category or empty string
    details: { condition: data.condition || '' },
    price: {
      pricingOption: data.pricingOption || '',
      amount: data.price || 0,
      startingPrice: data.startingPrice,
      buyNowPrice: data.buyNowPrice,
      startTime: data.startTime,
    },
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
