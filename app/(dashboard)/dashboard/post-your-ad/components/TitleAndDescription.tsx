"use client";
import styles from "./TitleAndDescription.module.scss";
import Input from "@/components/Input";
import RichTextEditor from "@/components/richTextEditor/RichTextEditor";
import { useFormContext } from "react-hook-form";
import { FormWrapper } from "./FormWrapper";
import { debounce } from "lodash";
import type { FormDataSchema } from "../validations/formDataSchema";

const TitleAndDescription = () => {
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
  const handleTitleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("titleAndDescription.title", e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    trigger("titleAndDescription.title");
  }, 300);

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

  const { onChange: titleOnChange, ...restTitleRegister } = register("titleAndDescription.title");

  return (
    <FormWrapper title="Ad Description">
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <Input
            className={styles.title}
            inputType="text"
            inputSize="large"
            placeholder="Write a title for your ad."
            label="Write a title for your ad"
            id="titleAndDescription.title"
            ariaLabel="Ad title input field"
            aria-describedby={errors.titleAndDescription?.title?.message ? "title-error" : undefined}
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
            onChange={(e) => {
              titleOnChange(e);
              handleTitleChange(e);
            }}
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
    </FormWrapper>
  );
};

export default TitleAndDescription;