"use client";
import styles from "./TitleAndDescription.module.scss";
import Input from "@/components/Input";
import RichTextEditor from "@/components/richTextEditor/RichTextEditor";
import { useFormContext } from "react-hook-form";
import { FormWrapper } from "./FormWrapper";
import type { FormDataSchema } from "../validations/formDataSchema";

const TitleAndDescription = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useFormContext<FormDataSchema>();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("titleAndDescription.title", e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    trigger("titleAndDescription.title");
  };

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
            ariaLabel="Title Field"
            autoFocus={false}
            autoComplete="off"
            iconPosition="right"
            iconWidth={32}
            iconHeight={32}
            disabled={false}
            required={true}
            value={title}
            error={errors.titleAndDescription?.title?.message}
            {...register("titleAndDescription.title")}
            // error={errors.titleAndDescription?.title?.message}
            onChange={handleTitleChange}
          />
        </div>
        <div className={styles.descriptionContainer}>
          <RichTextEditor
            name="titleAndDescription.description"
            setValue={(value: string) => handleDescriptionChange(value)}
            content={description}
            error={errors.titleAndDescription?.description?.message}
            // error={errors.titleAndDescription?.description?.message}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default TitleAndDescription;
