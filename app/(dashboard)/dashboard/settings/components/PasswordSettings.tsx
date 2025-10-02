"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./PasswordSettings.module.scss";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import Form from "next/form";

// TODO: Make the size of controls be for dashboard.
type FormValues = z.infer<typeof passwordSchema>;

const PasswordSettings = () => {
  const router = useRouter();
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  useEffect(() => {
    setPreviousPage(document.referrer);
  }, []);

  const handleBackClick = () => {
    if (previousPage) {
      router.back();
    } else {
      // Fallback to a default page if there is no previous page
      router.push("/dashboard/create-listing/settings");
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(passwordSchema),
  });
  const { register, control, handleSubmit, setValue, formState } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };

  return (
    <Form
      action="#"
      className={styles.container}
      onSubmit={handleSubmit(onSubmit, onError)}
      noValidate
    >
      <h4 className={styles.title}>Password Settings</h4>
      <div className={styles.inputContainer}>
        <p className={styles.errorMessage}>{errors.oldPassword?.message}</p>
        <Input
          className={styles.oldPassword}
          inputType="password"
          inputSize="large"
          placeholder="Enter old password"
          label="Enter old password"
          id="old-password"
          ariaLabel="Old Password Field"
          autoFocus={false}
          autoComplete="off"
          disabled={false}
          required={true}
          dashboard
          {...register("oldPassword")}
        />
      </div>

      <div className={styles.inputContainer}>
        <p className={styles.errorMessage}>{errors.newPassword?.message}</p>
        <Input
          className={styles.newPassword}
          inputType="password"
          inputSize="large"
          placeholder="Enter new password"
          label="Enter new password"
          id="new-password"
          ariaLabel="New Password Field"
          autoFocus={false}
          autoComplete="off"
          disabled={false}
          required={true}
          dashboard
          {...register("newPassword")}
        />
      </div>
      <div
        className={`${styles.inputContainer} ${styles.reEnterPasswordContainer}`}
      >
        <p className={styles.errorMessage}>{errors.reenterPassword?.message}</p>
        <Input
          className={styles.reEnterPassword}
          inputType="password"
          inputSize="large"
          placeholder="Re-enter new password"
          label="Re-enter new password"
          id="reenter-password"
          ariaLabel="Re-enter New Password Field"
          autoFocus={false}
          autoComplete="off"
          disabled={false}
          required={true}
          dashboard
          {...register("reenterPassword")}
        />
      </div>
      <div
        className={`${styles.passwordButtonContainer} ${styles.buttonContainer}`}
      >
        <Button
          className={styles.changePasswordButton}
          buttonChildren="Change password"
          buttonType="primary"
          buttonSize="large"
          name="change-password-btn"
          type="submit"
          ariaLabel="Change Password Button"
          autoFocus={false}
          disabled={false}
          dashboard
        />
      </div>

      <div className={styles.buttonContainer}>
        <Button
          className={styles.backButton}
          buttonChildren="Back"
          buttonType="normal"
          buttonSize="large"
          name="back-btn"
          type="button"
          ariaLabel="Back Button"
          autoFocus={false}
          disabled={false}
          onClick={handleBackClick}
          dashboard
        />
      </div>
    </Form>
  );
};

export default PasswordSettings;
