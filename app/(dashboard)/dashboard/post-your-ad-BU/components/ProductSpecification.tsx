"use client";
import styles from "./ProductSpecification.module.scss";
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

export interface SpecificationItem {
  selectSpecification: string;
  value: string;
}

type ProductSpecificationProps = {
  id: string | number;
  specification: string;
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
  register: any;
  errors: any;
  trigger: any;
  selectSpecificationValue: string;
  specifications: any;
  setSpecifications: any;
  watch: any;
  setShowSpecificationForm: any;
};

// Mock server action for demonstration
async function mockServerAction(formData: FormData): Promise<void> {
  // Simulate server-side processing
  await new Promise((resolve) => setTimeout(resolve, 500));
  // No return value needed
}

const ProductSpecification = ({
  id,
  specification,
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
  selectSpecificationValue,
  specifications,
  setSpecifications,
  watch,
  setShowSpecificationForm,
}: ProductSpecificationProps) => {
  const inputValue = watch(`specifications.${selectSpecificationValue}`) || "";

  const close = () => {
    setShowSpecificationForm(false);
  };

  const clickHandler = async () => {
    const fieldName = `specifications.${selectSpecificationValue}`;
    // Trigger validation
    const isValid = await trigger(fieldName, {
      shouldFocus: true,
    });

    if (isValid && inputValue.trim() !== "") {
      // Pass both the selected specification and input value back to Details
      setSpecifications((prevSpecifications: any) => [
        ...prevSpecifications,
        { selectSpecification: selectSpecificationValue, value: inputValue },
      ]);

      // Reset the field
      setValue(fieldName, "");
      
      // Close the ProductSpecification UI to show SpecificationsList
      setShowSpecificationForm(false);
    }
  };

  return (
    <div className={styles.container}>
      
      <div
        key={id}
        className={`${styles.productSpecificationContainer} ${styles.open}`}
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
        <div className={styles.productSpecificationDescriptionContainer}>
          <p className={styles.productSpecificationTitle}>{specification}</p>
          <p
            className={styles.productSpecificationDescription}
            style={{
              marginBottom: placeholder
                ? 0
                : specification === "Product Specifications"
                  ? "0.5rem"
                  : "1.25rem",
            }}
          >
            {description}
          </p>
          {placeholder && (
            <p
              className={styles.productSpecificationExample}
              style={{ marginBottom: "1.25rem" }}
            >
              eg. {"  "}
              <strong>{boldTextExample}</strong>:{" "}
              <span>{normalTextExample}</span>
            </p>
          )}
        </div>
        <div className={styles.productSpecificationInputContainer}>
          <TextArea
            id="specificationInput"
            name={`specifications.${selectSpecificationValue}`}
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
            ariaLabel="Product Specification"
            dashboard
            error={errors?.specifications?.[selectSpecificationValue]?.message as string}
            maxHeight={120}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              handleChange(e); 
            }}
            onBlur={handleBlur}
            {...register(`specifications.${selectSpecificationValue}`)} 
          />
        </div>
        <div className={styles.submitButtonContainer}>
          <Button
            className={styles.submitButton}
            buttonChildren="Submit Specification"
            buttonType="normal"
            type="button" 
            buttonSize="large"
            name="submit-specification-btn"
            aria-label="Submit Specification Button"
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

export default ProductSpecification;
