"use client";
import styles from "./FeedbackForm.module.scss";
import { useState } from "react";
import Input from "./Input";
import Button from "./Buttons";
import TextArea from "./TextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import Icon from "./Icon";
import Form from "next/form";

// Server action (ideally in a separate server file)
async function feedbackAction(formData: FormData): Promise<void> {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const message = formData.get("message")?.toString();
  const attachment = formData.get("attachment");
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    message: z
      .string()
      .min(1, "Message is required")
      .max(500, "Message cannot exceed 500 characters"),
    attachment: z.any().optional(),
  });
  try {
    schema.parse({ name, email, message, attachment });
    console.log("Server received:", { name, email, message, attachment });
  } catch (error) {
    console.error("Validation error:", error);
  }
}

type FormValues = z.infer<typeof feedbackFormSchema>;

const FeedbackForm = ({ title }: { title: string }) => {
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(feedbackFormSchema),
  });

  // Handle form submission with client-side validation and server action
  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    if (data.attachment?.[0]) {
      formData.append("attachment", data.attachment[0]);
    }

    await feedbackAction(formData);
    console.log("Form submitted successfully:", data);
    setServerErrors({});
  };

  // Custom handler for message length validation
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValue("message", value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  let label = "";
  switch (title) {
    case "General Feedback":
      label = "Feedback";
      break;
    case "Feature Request":
      label = "Feature Request";
      break;
    case "Bug Report":
      label = "Bug Report";
      break;
    default:
      label = "Feedback";
  }

  return (
    <Form
      action={feedbackAction} // Native server action for non-JS fallback
      onSubmit={handleSubmit(onSubmit)} // React Hook Form's enhanced submission
      className={styles.container}
      noValidate
    >
      <h2 className={styles.title}>{title}</h2>

      <div className={`${styles.nameContainer} ${styles.control}`}>
        <p className={styles.errorMessage}>
          {(errors.name as any)?.message || serverErrors.name}
        </p>
        <Input
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue("name", e.target.value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        />
      </div>

      <div className={`${styles.emailContainer} ${styles.control}`}>
        <p className={styles.errorMessage}>
          {(errors.email as any)?.message || serverErrors.email}
        </p>
        <Input
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue("email", e.target.value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        />
      </div>
      <div className={`${styles.titleInputContainer} ${styles.control}`}>
        <p className={styles.errorMessage}>
          {(errors.title as any)?.message || serverErrors.title}
        </p>
        <Input
          label="Title"
          className={styles.titleInput}
          inputType="text"
          inputSize="large"
          placeholder="Please enter a title for your feedback"
          autoComplete="off"
          autoFocus={false}
          id="title"
          ariaLabel="Title Field"
          required={true}
          {...register("title")}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue("title", e.target.value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        />
      </div>

      <div className={`${styles.messageContainer} ${styles.control}`}>
        <p className={styles.errorMessage}>
          {(errors.message as any)?.message || serverErrors.message}
        </p>
        <TextArea
          className={styles.message}
          placeholder="Please enter your feedback here..."
          label={label}
          id="message"
          name="message"
          size="large"
          required={true}
          onSubmit={() => {}}
          hasSubmitButton={true}
          onChange={handleMessageChange}
          maxHeight={240}
        />
      </div>

      <div className={styles.uploadButtonContainer}>
        <div className={styles.uploadButtonWrapper}>
          <label className={styles.uploadButton}>
            <input
              type="file"
              hidden
              accept="image/*,.pdf,.doc,.docx"
              {...register("attachment")}
            />
            <Icon
              src="/icons/plus.png"
              alt="Upload Icon"
              width={20}
              height={20}
            />
          </label>
          <p className={styles.uploadButtonText}>Upload image or document</p>
        </div>
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
          disabled={isSubmitting}
        />
      </div>
    </Form>
  );
};

export default FeedbackForm;
