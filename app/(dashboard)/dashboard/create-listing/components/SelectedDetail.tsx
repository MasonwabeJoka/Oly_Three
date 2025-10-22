"use client";
import styles from "./SelectedDetail.module.scss";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import { multiStepFormSchema } from "@/lib/validations/formValidations";
import { FormDataSchema } from "../validations/formDataSchema";
import Icon from "@/components/Icon";
import TextArea from "@/components/TextArea";
import Form from "next/form";

type FormValues = z.infer<typeof multiStepFormSchema>;
type SelectedDetailProps = {
  id: string | number;
  detail: string;
  initialValue: string;
  description: string;
  placeholder?: string | string[];
  example?: string | string[];
  normalTextExample?: string;
  boldTextExample?: string;
  isFieldDirty: boolean | undefined;
  setValue: any;
  handleSubmit: any;
  handleChange: any;
  handleBlur: any;
  register: any; // Ensure this matches the type expected from useForm()
  errors: any; // Ensure this matches the type expected from useForm()
  trigger: any;
  selectDetailValue: string;
  details: any;
  setDetails: any;
  watch: any;
  setMatchFound: any;
};

// Mock server action for demonstration
async function mockServerAction(formData: FormData): Promise<void> {
  // Simulate server-side processing
  await new Promise((resolve) => setTimeout(resolve, 500));
  // No return value needed
}

const SelectedDetail = ({
  id,
  detail,
  initialValue,
  description,
  placeholder,
  example,
  boldTextExample,
  normalTextExample,
  isFieldDirty,
  register,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setValue,
  trigger,
  selectDetailValue,
  details,
  setDetails,
  watch,
  setMatchFound,
}: SelectedDetailProps) => {
  const inputValue = watch(`details.${selectDetailValue}`) || "";

  const close = () => {
    setMatchFound(false);
  };

  const clickHandler = async () => {
    const fieldName = `details.${selectDetailValue}`;
    // Trigger validation
    const isValid = await trigger(fieldName, {
      shouldFocus: true,
    });

    if (isValid && inputValue.trim() !== "") {
      // Pass both the selected detail and input value back to Details
      setDetails((prevDetails: any) => [
        ...prevDetails,
        { selectDetail: selectDetailValue, value: inputValue },
      ]);

      // Reset the field
      setValue(fieldName, "");
      setValue("details.selectDetail", "");

      // Close the SelectedDetail UI to show DetailsList/SpecificationsList
      setMatchFound(false);
    }
  };

  return (
    <div className={styles.container}>
      <div
        key={id}
        className={`${styles.selectedDetailContainer} ${styles.open}`}
      >
        <div className={styles.deleteButtonContainer} onClick={() => close()}>
          <Icon
            className={styles.deleteButton}
            src={"/icons/x.svg"}
            alt="delete"
            width={20}
            height={20}
          />
        </div>
        <div className={styles.selectedDetailDescriptionContainer}>
          <p className={styles.selectedDetailTitle}>{detail}</p>
          <p
            className={styles.selectedDetailDescription}
            style={{
              marginBottom: placeholder
                ? 0
                : detail === "Add Your Own Details"
                ? "0.5rem"
                : "1.25rem",
            }}
          >
            {description}
          </p>
          {detail === "Add Your Own Details" && (
            <p
              className={styles.selectedDetailExample}
              style={{ marginBottom: "1.25rem" }}
            >
              eg. {"  "}
              <strong>Warranty Information</strong>:{" "}
              <span>Still under manufacturer warranty until June 2026.</span>
            </p>
          )}
          {placeholder && (
            <p
              className={styles.selectedDetailExample}
              style={{ marginBottom: "1.25rem" }}
            >
              eg. {"  "}
              <strong>{boldTextExample}</strong>:{" "}
              <span>{normalTextExample}</span>
            </p>
          )}
        </div>
        <div className={styles.selectedDetailInputContainer}>
          <TextArea
            id="textInput"
            name={`details.${selectDetailValue}`}
            hasSubmitButton={false}
            size="large"
            placeholder={
              placeholder
                ? `${
                    typeof placeholder === "string" && placeholder.length > 55
                      ? placeholder.slice(0, 55) + "..."
                      : placeholder
                  }`
                : example
                ? `eg. ${
                    typeof example === "string" && example.length > 55
                      ? example.slice(0, 55) + "..."
                      : example
                  }`
                : ""
            }
            value={inputValue}
            ariaLabel="Chosen Detail"
            dashboard
            error={errors?.details?.[selectDetailValue]?.message as string}
            maxHeight={120}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              handleChange(e);
            }}
            onBlur={handleBlur}
            {...register(`details.${selectDetailValue}`)}
          />
        </div>
        <div className={styles.submitButtonContainer}>
          <Button
            className={styles.submitButton}
            buttonChildren="Submit Detail"
            buttonType="normal"
            type="button"
            buttonSize="large"
            name="submit-detail-btn"
            aria-label="Submit Detail Button"
            autoFocus={false}
            disabled={false}
            dashboard
            onClick={clickHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectedDetail;
