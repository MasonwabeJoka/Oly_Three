"use client";
import styles from "./TitleAndDescription.module.scss";
import Input from "@/components/Input";
import RichTextEditor from "@/components/richTextEditor/RichTextEditor";
import { useFormContext } from "react-hook-form";
import { FormWrapper } from "./FormWrapper";
import { debounce } from "lodash";
import type { FormDataSchema } from "../validations/formDataSchema";
import Form from "next/form";
import Button from "@/components/Buttons";

// Mock server action for demonstration
async function mockServerAction(formData: FormData): Promise<void> {
  // Simulate server-side processing
  await new Promise((resolve) => setTimeout(resolve, 500));
  // No return value needed
}

interface Props {
  onNext: () => void;
}
const TitleAndDescription = ({ onNext }: Props) => {
  const formContext = useFormContext<FormDataSchema>();
  if (!formContext) {
    console.error("TitleAndDescription must be used within a FormProvider");
    return null;
  }

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = formContext;

  // Debounce title changes
  const handleTitleChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue("titleAndDescription.title", e.target.value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      trigger("titleAndDescription.title");
    },
    300
  );

  // Handle description changes without debouncing
  const handleDescriptionChange = (value: string) => {
    setValue("titleAndDescription.description", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    trigger("titleAndDescription.description");
  };

  const title = watch("titleAndDescription.title") || "";
  const description = watch("titleAndDescription.description") || "";

  const { onChange: titleOnChange, ...restTitleRegister } = register(
    "titleAndDescription.title"
  );

  return (
    <div className={styles.container}>
      <div
        className={styles.form}

        // onSubmit={handleSubmit(onSubmitDetail)} // If you have a submit handler, add it here
      >
        <div className={styles.pageTitle}>Title & Description</div>
        <div className={styles.titleContainer}>
          <Input
            className={styles.title}
            inputType="text"
            inputSize="large"
            placeholder="Write a title for your ad."
            label="Title"
            id="titleAndDescription.title"
            ariaLabel="Ad title input field"
            aria-describedby={
              errors.titleAndDescription?.title?.message
                ? "title-error"
                : undefined
            }
            autoFocus={false}
            autoComplete="off"
            iconPosition="right"
            iconWidth={32}
            iconHeight={32}
            disabled={false}
            required={true}
            value={title}
            error={errors.titleAndDescription?.title?.message}
            {...restTitleRegister}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              titleOnChange(e);
              handleTitleChange(e);
            }}
            dashboard
          />
        </div>
        <div className={styles.descriptionContainer}>
          <RichTextEditor
            name="titleAndDescription.description"
            setValue={handleDescriptionChange}
            content={description}
            error={errors.titleAndDescription?.description?.message}
          />
        </div>
      
      </div>
    </div>
  );
};

export default TitleAndDescription;
