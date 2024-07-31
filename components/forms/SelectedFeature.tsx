"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import { DevTool } from "@hookform/devtools";
import { multiStepFormSchema } from "@/lib/validations/formValidations";
import styles from "./SelectedFeature.module.scss";

type FormValues = z.infer<typeof multiStepFormSchema>;
type SelectedDetailProps = {
  id: string | number;
  detail: string;
  initialValue: string;
  description: string;
  example: string | string[];
  setValue: any;
  handleSubmit: any;
  handleChange: any;
  handleBlur: any;
  register: any; // Ensure this matches the type expected from useForm()
  errors: any; // Ensure this matches the type expected from useForm()
};

const SelectedFeature = ({
  id,
  detail,
  initialValue,
  description,
  example,
  register,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  ...data
}: SelectedDetailProps) => {
  const { reset,control, formState, trigger } = useFormContext();

  const enterDetail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const detail = (e.target as HTMLInputElement).value.trim();
    if (e.key === "Enter" && detail) {
      let details = JSON.parse(localStorage.getItem("details") || "[]");
      const detailItem = { id: 1, detail };
      details.push(detailItem);
      localStorage.setItem("details", JSON.stringify(details));
    }
  };

  const clickHandler = async () => {
    // trigger to validate detail field
    await trigger('feature', {
      // focus on first field with error
      shouldFocus: true,
    });
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
    reset()
    // Perform any additional actions on submit
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div key={id} className={styles.selectedDetailContainer}>
          <p className={styles.selectedDetailTitle}>{detail}</p>
          <p className={styles.selectedDetailDescription}>{description}</p>
          <div className={styles.selectedDetailInputContainer}>
            <Input
              className={styles.selectedDetailInput}
              inputType="text"
              inputColourType="normal"
              inputSize="large"
              label="Chosen Detail"
              placeholder={`Eg: ${
                typeof example === "string" && example.length > 55
                  ? example.slice(0, 55) + "..."
                  : example
              }`}
              id="detail"
              aria-label="Chosen Detail"
              autoFocus={false}
              iconSrcRight=""
              iconPosition="right"
              iconWidth={32}
              iconHeight={32}
              required={true}
              autoComplete="off"
              onKeyDown={enterDetail}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.feature?.message as string}
              {...register("feature")}
            />
          </div>

          <div className={styles.submitButtonContainer}>
            <Button
              className={styles.proceedButton}
              buttonChildren="Submit Detail"
              buttonType="normal"
              type="button"
              buttonSize="large"
              name="proceed-btn"
              aria-label="Proceed Button"
              autoFocus={false}
              disabled={false}
              dashboard
              onClick={clickHandler}
            />
          </div>
        </div>
      </form>
      <DevTool control={control} />
      {/* Ensure to pass form.control to DevTool */}
    </>
  );
};

export default SelectedFeature;
