"use client";
import styles from "./FeedbackForm.module.scss";
import { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Buttons";
import TextArea from "./TextArea";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";

type FormValues = z.infer<typeof feedbackFormSchema>;

const FeedbackForm = () => {
  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(feedbackFormSchema),
  });

  const { register, control, handleSubmit, setValue, setError, formState } =
    form;
  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValue("message", value, {
      shouldDirty: true,
      shouldTouch: true,
    });

    if (value.length > 5) {
      setError("message", {
        type: "maxLength",
        message: "Message cannot be more than 500 characters long.",
      });
    } else {
      // Clear the error if the message length is within the limit
      if (errors.message?.type === "maxLength") {
        setError("message", {});
      }
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(onSubmit, onError)}
      noValidate
    >
      <h1 className={styles.title}>Feedback</h1>
      <div className={`${styles.nameContainer} ${styles.control}`}>
        <p className={styles.errorMessage}>{errors.name?.message}</p>
        <Input
          legend=""
          label="Name"
          className={styles.name}
          inputType="text"
          inputSize="large"
          placeholder="Please enter your name"
          autoComplete="off"
          autoFocus={false}
          id="name"
          ariaLabel="Name Field"
          required={true}
          {...register("name")}
          onChange={(e) => {
            setValue("name", e.target.value, {
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
        />
      </div>
      <div className={`${styles.emailContainer} ${styles.control}`}>
        <p className={styles.errorMessage}>{errors.email?.message}</p>
        <Input
          legend=""
          label="Email"
          className={styles.email}
          inputType="email"
          inputSize="large"
          placeholder="Please enter your email"
          autoComplete="off"
          autoFocus={false}
          id="email"
          ariaLabel="Email Field"
          required={true}
          {...register("email")}
          onChange={(e) => {
            setValue("email", e.target.value, {
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
        />
      </div>
      <div className={`${styles.messageContainer} ${styles.control}`}>
        <p className={styles.errorMessage}>{errors.message?.message}</p>
        <TextArea
          className={styles.message}
          placeholder="Please enter your feedback here..."
          label="Message"
          id="message"
          size="large"
          required={true}
          onSubmit={() => {}}
          style={{
            padding: "2rem 4rem 2rem 4rem",
            height: "15rem",
            textAlign: "left",
          }}
          {...register("message")}
          onChange={handleMessageChange}
        />
      </div>
      <div className={`${styles.submitButtonContainer} ${styles.control}`}>
        <Button
          className={styles.submitButton}
          buttonChildren="Submit"
          buttonType="primary"
          buttonSize="large"
          name="submit-btn"
          type="submit"
          ariaLabel="Submit Button"
          autoFocus={false}
          disabled={false}
        />
      </div>
      <DevTool control={control} />
    </form>
  );
};

export default FeedbackForm;
