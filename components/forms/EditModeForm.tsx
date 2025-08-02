"use client";
import styles from "./EditModeForm.module.scss";
import { useEffect, useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextArea from "@/components/TextArea";
import Button from "@/components/Buttons";
import { detailsFormSchema } from "@/lib/validations/formValidations";
import Icon from "@/components/Icon";
import SelectedDetail from "./SelectedDetail";
import Form from "next/form";

type FormValues = z.infer<typeof detailsFormSchema>;

// Mock server action for demonstration
async function mockServerAction(formData: FormData): Promise<void> {
  // Simulate server-side processing
  await new Promise((resolve) => setTimeout(resolve, 500));
  // No return value needed
}

const EditModeForm = ({ initialValue }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(detailsFormSchema),
  });
  const { register, control, handleSubmit, formState, setValue, watch } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form
      className={styles.container}
      action={mockServerAction}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.editMode}>
        <TextArea
          className={styles.editDetail}
          id="edit-detail"
          size="large"
          label="Edit Detail"
          value={initialValue}
          required={true}
          {...register("editDetail")}
          error={errors.detail?.message as string}
        />
        <div className={styles.submitButton}>
          <Button
            className={styles.backButton}
            buttonChildren={
              <div className={styles.iconContainer}>
                <Icon
                  className={styles.icon}
                  src="/icons/check.png"
                  alt="submit-icon"
                  width={20}
                  height={20}
                />
              </div>
            }
            buttonType="icon"
            buttonSize=""
            name="submit-edit-btn"
            type="submit"
            ariaLabel="Submit Edit"
            autoFocus={false}
            disabled={false}
            dashboard
          />
        </div>
      </div>
    </Form>
  );
};

export default EditModeForm;
