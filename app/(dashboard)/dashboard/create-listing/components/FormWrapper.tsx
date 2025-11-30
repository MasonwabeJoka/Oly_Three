"use client";
import Button from "@/components/Buttons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import useEditStore from "../store/useEditStore";
import useFormStore, { FormData as CustomFormData } from "../store/useFormStore";
import useUploadMediaStore, {
  resetMediaStates,
} from "../store/useUploadMediaStore";
import FormProgressBar from "./FormProgressBar";
import styles from "./FormWrapper.module.scss";
import Form from "next/form";
import { createListingAction } from "@/utils/FormServerActions/CreateAListingAction";
import { slugMap } from "../store/useFormStore";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
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
    setCurrentStepIndex,
  } = useFormStore();
  const { trigger, handleSubmit } = useFormContext<CustomFormData>();
  const isClient = useIsClient();
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stepRef.current) {
      stepRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentStepIndex]);

  // --- Step/URL sync logic ---
  // URL is the single source of truth for the step index
  useEffect(() => {
    const basePath = "/dashboard/create-listing/";
    if (pathname.startsWith(basePath)) {
      const slug = pathname.slice(basePath.length);
      const slugEntry = slugMap.find((entry) => entry.slug === slug);
      const stepIndex = slugEntry ? slugEntry.index : 0;
      if (stepIndex !== currentStepIndex) {
        console.log(
          "[SYNC EFFECT] Setting step index from URL:",
          stepIndex,
          "(was:",
          currentStepIndex,
          ")"
        );
        setCurrentStepIndex(stepIndex);
      } else {
        console.log(
          "[SYNC EFFECT] Step index and URL already in sync:",
          stepIndex
        );
      }
    }
  }, [pathname, currentStepIndex, setCurrentStepIndex]);

  if (!isClient) return null;

  const onSubmit: SubmitHandler<CustomFormData> = async (data) => {
    console.log("Form data:", data);
    if (currentStepIndex === steps.length - 1) {
      try {
        const result = await createListingAction(data as any);
        if (result.success) {
          router.push("/listings/countryside-farmhouse", { scroll: true });
          if (typeof window !== "undefined") {
            localStorage.removeItem("currentStepIndex");
          }
        } else {
          setMessage("Submission failed on server.");
        }
      } catch (error) {
        setMessage(
          "Submission error: " +
            (error instanceof Error ? error.message : "Unknown error")
        );
      }
    }
  };

  // Navigation handlers: update the URL directly
  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    await next(trigger, handleSubmit, onSubmit);
    setMediaAction("none");
    // After validation, update the URL to the next step
    const newIndex = currentStepIndex + 1;
    if (newIndex < steps.length) {
      const nextSlug = slugMap.find((entry) => entry.index === newIndex)?.slug;
      if (nextSlug && `/dashboard/create-listing/${nextSlug}` !== pathname) {
        console.log(
          "[NAV] Proceeding to step:",
          newIndex,
          "URL:",
          `/dashboard/create-listing/${nextSlug}`
        );
        router.push(`/dashboard/create-listing/${nextSlug}`);
      } else {
        console.log("[NAV] Already at correct URL for next step:", newIndex);
      }
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    // If going back would take us to step 0 (SelectACategory), go to step 10 (SelectNewCategory) instead
    let newIndex =
      currentStepIndex === 1 ? 10 : Math.max(0, currentStepIndex - 1);
    const prevSlug = slugMap.find((entry) => entry.index === newIndex)?.slug;
    if (prevSlug && `/dashboard/create-listing/${prevSlug}` !== pathname) {
      console.log(
        "[NAV] Going back to step:",
        newIndex,
        "URL:",
        `/dashboard/create-listing/${prevSlug}`
      );
      router.push(`/dashboard/create-listing/${prevSlug}`);
    } else {
      console.log("[NAV] Already at correct URL for previous step:", newIndex);
    }
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
      const editSlug = slugMap.find((entry) => entry.index === 9)?.slug;
      if (editSlug) {
        router.push(`/dashboard/create-listing/${editSlug}`);
      }
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
          currentStepIndex === steps.length - 1
            ? async (formData: globalThis.FormData) => {
                const result = await createListingAction(formData as any);
                return result;
              }
            : undefined
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
