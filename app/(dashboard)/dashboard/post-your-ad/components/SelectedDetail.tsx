"use client";
import styles from "./SelectedDetail.module.scss";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import { multiStepFormSchema } from "@/lib/validations/formValidations";
import Icon from "@/components/Icon";

type FormValues = z.infer<typeof multiStepFormSchema>;
type SelectedDetailProps = {
  id: string | number;
  detail: string;
  initialValue: string;
  description: string;
  example: string | string[];
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

const SelectedDetail = ({
  id,
  detail,
  initialValue,
  description,
  example,
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
  const inputValue = watch(selectDetailValue);

  const close = () => {
    setMatchFound(false);
  };

  
    


  const clickHandler = async () => {
    // Trigger validation
    const isValid = await trigger(selectDetailValue, {
      shouldFocus: true,
    });

    if (isValid && inputValue.trim() !== "") {
      // Pass both the selected detail and input value back to Details
      setDetails((prevDetails: any) => [
        ...prevDetails,
        { selectDetail: selectDetailValue, value: inputValue },
      ]);

      // Reset selectDetail field
      setValue("selectDetail", "");
    }
  };

  return (
    <>
      <div className={styles.form}>
        <div key={id} className={styles.selectedDetailContainer}>
          <div className={styles.deleteButtonContainer} onClick={close}>
            <Icon
              className={styles.deleteButton}
              src={"/icons/x.svg"}
              alt="delete"
              width={20}
              height={20}
            />
          </div>
          <p className={styles.selectedDetailTitle}>{detail}</p>
          <p className={styles.selectedDetailDescription}>{description}</p>
          <div className={styles.selectedDetailInputContainer}>
            <Input
              className={styles.selectedDetailInput}
              inputType="text"
              initialValue=""
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
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.detail?.message as string}
              {...register(selectDetailValue)}
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
      </div>
    </>
  );
};

export default SelectedDetail;