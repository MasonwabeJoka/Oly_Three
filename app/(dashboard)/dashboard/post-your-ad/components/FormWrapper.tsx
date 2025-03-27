"use client"; 
import Button from "@/components/Buttons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import useEditStore from "../store/useEditStore";
import useFormStore, { FormData } from "../store/useFormStore";
import useUploadMediaStore, { resetMediaStates } from "../store/useUploadMediaStore";
import FormProgressBar from "./FormProgressBar";
import styles from "./FormWrapper.module.scss";

// Define the props (inputs) this component expects
type FormWrapperProps = {
  title: string; // The title to show at the top of the form
  children: React.ReactNode; // The content inside the form (like input fields), passed from the parent component
};

// A custom hook to check if the component is running on the client side
// This is needed because some features (like localStorage) only work in the browser, not on the server
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false); // Start with false, assuming it’s not client-side yet
  useEffect(() => setIsClient(true), []); // When the component loads, set it to true (runs only in the browser)
  return isClient; // Return true if client-side, false if not
};

// A helper function to decide what text to show on the buttons
// This makes the buttons more user-friendly by changing their labels based on the situation
const getButtonText = (
  isEditMode: boolean, // True if the form is being edited, false if it’s new
  isLastStep: boolean, // True if this is the final step of the form
  currentStepIndex: number // The current step number (starts at 0)
) => {
  // Decide the text for the top button (like "Proceed")
  const topText = isEditMode
    ? "Accept Changes" // If editing, show this
    : isLastStep
    ? "Publish My Listing" // If on the last step, show this
    : currentStepIndex === 8
    ? "Review Your Listing" // Special case for step 8
    : "Proceed"; // Default text for moving forward

  // Decide the text for the bottom button (like "Back")
  const bottomText = currentStepIndex === 8 ? "Publish Immediately" : "Back"; // Special case for step 8
  return { topText, bottomText }; // Return both texts as an object
};

// The main FormWrapper component that ties everything together
export const FormWrapper = ({ title, children }: FormWrapperProps) => {
  const router = useRouter(); // Tool for navigating to different pages
  const { isEditMode, setIsEditMode } = useEditStore(); // Get edit mode state and function to change it
  const { setMediaAction } = useUploadMediaStore(); // Function to reset media-related actions
  const {
    message, // Any messages (like errors) from the form store
    currentStepIndex, // The current step number (e.g., 0, 1, 2...)
    isFirstStep, // True if on the first step
    isLastStep, // True if on the last step
    setCurrentStepIndex, // Function to set the current step manually
    next, // Function to move to the next step
    back, // Function to move to the previous step
    goTo, // Function to jump to a specific step
    steps, // Array of all steps in the form
  } = useFormStore(); // Pull all this info from the form store
  const { trigger, handleSubmit } = useFormContext<FormData>(); // Tools for validating and submitting the form
  const isClient = useIsClient(); // Check if we’re on the client side

  // If not on the client side (e.g., during server rendering), don’t show anything
  if (!isClient) return null;

  // Define what happens when the form is submitted
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form data:", data); // Print the form data to the console for now (for debugging)
    // TODO: Add real submission logic here, like sending data to a server
  };

  // Function to handle moving to the next step
  const handleNext = async () => {
    await next(trigger, handleSubmit, onSubmit); // Move to the next step, validating and submitting if needed
    setMediaAction("none"); // Clear any media-related actions
  };

  // Define special "back" transitions for certain steps
  // Normally "back" goes to the previous step, but these are exceptions
  const backTransitions: Record<number, number> = {
    8: 10, // From step 8, "back" goes to step 10
    9: 7,  // From step 9, "back" goes to step 7
  };

  // Function to handle going back
  const handleBack = () => {
    // Check if there’s a special transition for this step; if not, just go back one step
    const targetStep = backTransitions[currentStepIndex] ?? currentStepIndex - 1;
    goTo(Math.max(0, targetStep)); // Jump to the target step, but never go below step 0
    resetMediaStates(); // Clear media-related states
  };

  // Get the right button text based on the current state
  const { topText, bottomText } = getButtonText(isEditMode, isLastStep, currentStepIndex);

  // Function to handle clicking the "next" button
  const nextStep = () => {
    if (isEditMode) { // If we’re editing
      setMediaAction("none"); // Clear media actions
      setIsEditMode(false); // Turn off edit mode
      return goTo(9); // Jump to step 9
    }

    if (isLastStep) { // If it’s the last step
      router.push("/dashboard/post-your-ad/published"); // Go to the "published" page
      return;
    }

    return handleNext(); // Otherwise, move to the next step
  };

  // Decide what happens when clicking the "back" button
  const previousStep =
    currentStepIndex === 8 // If on step 8
      ? () => router.push("/dashboard/post-your-ad/published") // Go to the "published" page
      : handleBack; // Otherwise, use the normal back logic

  // Render the form UI
  return (
    <div className={styles.container}> {/* Main container with styles */}
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2> {/* Show the form title */}
      </div>
      <div className={styles.children} style={{ overflowY: "clip" }}>
        {children} {/* Show the form fields for this step */}
      </div>
      <nav className={styles.buttons}> {/* Navigation buttons */}
        <Button
          className={styles.proceedButton} // Custom styling
          buttonChildren={topText} // Text like "Proceed" or "Publish My Listing"
          buttonType={currentStepIndex === 5 ? "normal" : "primary"} // Different style for step 5
          buttonSize="large" // Big button
          name="proceed-btn" // Identifier for the button
          type="button" // Regular button, not a submit button
          ariaLabel="Proceed Button" // Accessibility label
          autoFocus={false} // Don’t auto-focus
          disabled={false} // Button is clickable
          dashboard // Custom prop for dashboard styling
          onClick={nextStep} // Run the nextStep function when clicked
        />

        {currentStepIndex > 0 && ( // Only show the back button if not on the first step
          <Button
            className={styles.backButton} // Custom styling
            buttonChildren={bottomText} // Text like "Back" or "Publish Immediately"
            buttonType="normal" // Standard button style
            buttonSize="large" // Big button
            name="back-btn" // Identifier
            type="button" // Regular button
            ariaLabel="Back Button" // Accessibility label
            autoFocus={false} // No auto-focus
            disabled={false} // Clickable
            dashboard // Dashboard styling
            onClick={previousStep} // Run the previousStep function when clicked
          />
        )}
      </nav>
      <div className={styles.progressBar}> {/* Progress bar section */}
        <FormProgressBar
          totalSteps={steps.length} // Total number of steps in the form
          currentStepIndex={currentStepIndex} // Current step number
        />
      </div>
    </div>
  );
};