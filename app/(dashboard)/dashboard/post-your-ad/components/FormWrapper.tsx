"use client";
import Button from "@/components/Buttons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import useEditStore from "../store/useEditStore";
import useFormStore, { FormData } from "../store/useFormStore";
import useUploadMediaStore, {
  resetMediaStates,
} from "../store/useUploadMediaStore";
import FormProgressBar from "./FormProgressBar";
import styles from "./FormWrapper.module.scss";
import Form from "next/form";
import { postYourAdAction } from "@/utils/FormServerActions/postYourAdAction";
import { slugMap } from "../store/useFormStore";

type FormWrapperProps = {
  title: string;
  children: React.ReactNode;
  selectOpen?: boolean;
};

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
};

const getButtonText = (
  isEditMode: boolean,
  isLastStep: boolean,
  currentStepIndex: number
) => {
  const topText = isEditMode
    ? "Accept Changes"
    : isLastStep
      ? "Publish My Listing"
      : currentStepIndex === 8
        ? "Review Your Listing"
        : "Proceed";
  const bottomText = currentStepIndex === 8 ? "Publish Immediately" : "Back";
  return { topText, bottomText };
};

export const FormWrapper = ({
  title,
  children,
  selectOpen = false,
}: FormWrapperProps) => {
  const router = useRouter();
  const { isEditMode, setIsEditMode } = useEditStore();
  const { setMediaAction } = useUploadMediaStore();
  const {
    message,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    next,
    back,
    goTo,
    steps,
    setMessage,
    categoryPreviouslySelected,
  } = useFormStore();
  const { trigger, handleSubmit } = useFormContext<FormData>();
  const isClient = useIsClient();
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stepRef.current) {
      stepRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentStepIndex]);

  // Listens for browser back/forward navigation events to sync the form step with the URL path.
  // Extracts the slug after /dashboard/post-your-ad/, matches it to a step index using slugMap,
  // and navigates to that step if it differs from the current step. Cleans up the event listener on unmount.
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const basePath = "/dashboard/post-your-ad/";
      if (path.startsWith(basePath)) {
        const slug = path.slice(basePath.length); // Extract slug after /dashboard/post-your-ad/
        const slugEntry = slugMap.find((entry) => entry.slug === slug);
        const stepIndex = slugEntry ? slugEntry.index : -1;
        if (stepIndex !== -1 && stepIndex !== currentStepIndex) {
          goTo(stepIndex);
        }
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [currentStepIndex, goTo, steps]);

  if (!isClient) return null;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form data:", data);
    if (currentStepIndex === steps.length - 1) {
      try {
        const result = await postYourAdAction(data);
        if (result.success) {
          router.push("/listings/countryside-farmhouse", { scroll: true });
          if (typeof window !== "undefined") {
            localStorage.removeItem("currentStepIndex");
          }
        } else {
          setMessage(result.message || "Submission failed on server.");
        }
      } catch (error) {
        setMessage(
          "Submission error: " +
            (error instanceof Error ? error.message : "Unknown error")
        );
      }
    }
  };

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    await next(trigger, handleSubmit, onSubmit);
    setMediaAction("none");
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();

    // If going back would take us to step 0 (SelectACategory),
    // go to step 10 (SelectNewCategory) instead
    if (currentStepIndex === 1) {
      goTo(10);
      resetMediaStates();
      return;
    }

    const newIndex = Math.max(0, currentStepIndex - 1);
    goTo(newIndex);
    resetMediaStates();
  };

  const { topText, bottomText } = getButtonText(
    isEditMode,
    isLastStep,
    currentStepIndex
  );

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isEditMode) {
      setMediaAction("none");
      setIsEditMode(false);
      goTo(9);
      return;
    }

    if (isLastStep) {
      handleSubmit(onSubmit)();
      return;
    }

    handleNext(e);
  };

  const previousStep =
    currentStepIndex === 8
      ? () => {
          router.push("/listings/countryside-farmhouse", { scroll: true });
          if (typeof window !== "undefined") {
            localStorage.removeItem("currentStepIndex");
          }
        }
      : handleBack;

  return (
    <div className={styles.container}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        action={
          currentStepIndex === steps.length - 1 ? postYourAdAction : undefined
        }
        className={styles.form}
      >
        <div className={styles.children} ref={stepRef}>
          {children}
        </div>
        {!selectOpen && (
          <nav className={styles.buttons}>
            <Button
              className={styles.proceedButton}
              buttonChildren={topText}
              buttonType={currentStepIndex === 5 ? "normal" : "primary"}
              buttonSize="large"
              name="proceed-btn"
              type="button"
              ariaLabel="Proceed Button"
              autoFocus={false}
              disabled={false}
              dashboard
              onClick={nextStep}
            />
            {currentStepIndex > 0 && (
              <Button
                className={styles.backButton}
                buttonChildren={bottomText}
                buttonType="normal"
                buttonSize="large"
                name="back-btn"
                type="button"
                ariaLabel="Back Button"
                autoFocus={false}
                disabled={false}
                dashboard
                onClick={previousStep}
              />
            )}
          </nav>
        )}
      </Form>
      <div className={styles.progressBar}>
        <FormProgressBar
          totalSteps={steps.length - 1} // Exclude SelectNewCategory from total count (10 actual steps)
          currentStepIndex={currentStepIndex}
        />
      </div>
    </div>
  );
};
