"use client";
import styles from "./TitleAndDescription.module.scss";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import MaxWidthWrapper from "@/components/utilComponents/MaxWidthWrapper";
import RichTextEditor from "@/components/richTextEditor/RichTextEditor";
import { useFormContext } from "react-hook-form";
import { FormWrapper } from "./FormWrapper";

const TitleAndDescription = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const content = watch("description") || "";

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
            id="title"
            ariaLabel="Title Field"
            autoFocus={false}
            autoComplete="off"
            iconPosition="right"
            iconWidth={32}
            iconHeight={32}
            disabled={false}
            required={true}
            error={errors.title?.message as string} // Extract message as string
            {...register("title")} // Spread register props (including name)
          />
        </div>
        <div className={styles.descriptionContainer}>
          <RichTextEditor
            name="description"
            setValue={setValue}
            content={content}
            error={errors?.description}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default TitleAndDescription;
