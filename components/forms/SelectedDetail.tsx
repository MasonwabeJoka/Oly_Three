"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import { DevTool } from "@hookform/devtools";
import { detailsFormSchema } from "@/lib/validations/formValidations";
import styles from "./SelectedDetail.module.scss";

type FormValues = z.infer<typeof detailsFormSchema>;
type SelectedDetailProps = {
  id: string | number;
  detail: string;
  description: string;
  example: string | string[];
  setValue: any;
  handleSubmit: any;
  handleChange: any;
  handleBlur: any;
  register: any; // Ensure this matches the type expected from useForm()
  errors: any; // Ensure this matches the type expected from useForm()
};

const SelectedDetail = ({
  id,
  detail,
  description,
  example,
  register,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
}: SelectedDetailProps) => {
  const enterDetail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const detail = (e.target as HTMLInputElement).value.trim();
    if (e.key === "Enter" && detail) {
      let details = JSON.parse(localStorage.getItem("details") || "[]");
      const detailItem = { id: 1, detail };
      details.push(detailItem);
      localStorage.setItem("details", JSON.stringify(details));
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(detailsFormSchema),
  });

  const {formState } = form;
  const { isSubmitting } = formState;

  const onSubmit = (data: FormValues) => {
    console.log(data);
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
              {...register("detail")} // Ensure you pass register correctly
              error={errors.detail?.message as string} // Display error messages correctly
            />
          </div>

          <div className={styles.submitButtonContainer}>
            <Button
              className={styles.proceedButton}
              buttonChildren="Submit Detail"
              buttonType="normal"
              type="submit"
              buttonSize="large"
              name="proceed-btn"
              aria-label="Proceed Button"
              autoFocus={false}
              disabled={isSubmitting}
              dashboard
            />
          </div>
        </div>
      </form>
      <DevTool control={form.control} />{" "}
      {/* Ensure to pass form.control to DevTool */}
    </>
  );
};

export default SelectedDetail;
