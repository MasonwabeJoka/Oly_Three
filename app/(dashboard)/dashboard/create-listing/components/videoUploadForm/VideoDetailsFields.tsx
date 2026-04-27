import styles from "./VideoDetailsFields.module.scss";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormSetError,
} from "react-hook-form";
import { z } from "zod";
import { feedbackFormSchema } from "@/lib/validations/formValidations";

type FormValues = z.infer<typeof feedbackFormSchema>;

interface Props {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  setError: UseFormSetError<FormValues>;
}

const VideoDetailsFields = ({
  register,
  errors,
  setValue,
  setError,
}: Props) => {
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValue("message", value, { shouldDirty: true, shouldTouch: true });
    if (value.length > 5) {
      setError("message", {
        type: "maxLength",
        message: "Message cannot be more than 500 characters long.",
      });
    } else if (errors.message?.type === "maxLength") {
      setError("message", {});
    }
  };

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.videoTitleContainer}>
        <p className={styles.videoTitleContainer}>
          {(errors.name as any)?.message}
        </p>
        <Input
          label="Title"
          className={styles.videoTitle}
          inputType="text"
          inputSize="large"
          placeholder="Give your video a title"
          autoComplete="off"
          autoFocus={false}
          id="title"
          ariaLabel="Title Field"
          required={true}
          dashboard
          {...register("title")}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue("title", e.target.value, {
              shouldDirty: true,
              shouldTouch: true,
            })
          }
        />
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.errorMessage}>
          {(errors.message as any)?.message}
        </p>
        <TextArea
          className={styles.description}
          placeholder="Tell viewers what your video is about"
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
          dashboard
        />
      </div>
    </div>
  );
};

export default VideoDetailsFields;
