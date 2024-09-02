'use client'
import Button from "@/components/Buttons";
import useFormStore from "../store/useFormStore";
import styles from "./FormWrapper.module.scss";
import FormProgressBar from "./FormProgressBar";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { multiStepFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
type FormWrapperProps = {
  title: string;
  children: React.ReactNode;
};

type FormValues = z.infer<typeof multiStepFormSchema>;
export const FormWrapper = ({
  title,
  children,
}: FormWrapperProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setValue,
    watch,
    trigger,
  } = useFormContext();
  const {
    message,
    currentStepIndex,
    isEditMode,
    isFirstStep,
    isLastStep,
    next,
    back,
    goTo,
    setCategory,
    steps,
  } = useFormStore();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("data", data);
    // try {
    //   const result = await createAd(data);
    //   reset(result);
    //   setMessage("Ad created successfully");
    // } catch (error) {
    //   console.error("Error creating ad:", error);
    //   setMessage("Error creating ad");
    // }
  };


  const handleNext = () => {
    next(trigger, handleSubmit, onSubmit);
  };
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.children} style={{ overflowY: "clip" }}>
        {children}
      </div>
      <nav className={styles.buttons}>
            <Button
              className={styles.proceedButton}
              buttonChildren={
                isLastStep
                  ? "Finish"
                  : isEditMode
                    ? "Accept Changes"
                    : "Proceed"
              }
              buttonType="primary"
              buttonSize="large"
              name="proceed-btn"
              type="button"
              ariaLabel="Proceed Button"
              autoFocus={false}
              disabled={false}
              dashboard
              onClick={handleNext}
            />

            {!isFirstStep && (
              <Button
                className={styles.backButton}
                buttonChildren="Back"
                buttonType="normal"
                buttonSize="large"
                name="back-btn"
                type="button"
                ariaLabel="Back Button"
                autoFocus={false}
                disabled={false}
                dashboard
                onClick={back}
              />
            )}
          </nav>
          <div className={styles.progressBar}>
          <FormProgressBar
            totalSteps={steps.length}
            currentStepIndex={currentStepIndex}
          />
        </div>
    </div>
  );
};
