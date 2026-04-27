"use client";
import styles from "./VideoUploadForm.module.scss";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import Form from "next/form";
import VideoPreview from "./videoUploadForm/VideoPreview";
import ThumbnailPicker from "./videoUploadForm/ThumbnailPicker";
import VideoDetailsFields from "./videoUploadForm/VideoDetailsFields";
import PublishButton from "./videoUploadForm/PublishButton";

type FormValues = z.infer<typeof feedbackFormSchema>;

interface Props {
  videoPath: string;
}

const VideoUploadForm = ({ videoPath }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(feedbackFormSchema),
  });
  const { register, handleSubmit, setValue, setError, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => console.log("Form Data:", data);
  const onError = (errors: FieldErrors<FormValues>) =>
    console.log("Form errors", errors);

  async function mockServerAction(formData: FormData): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return (
    <Form
      className={styles.container}
      action={mockServerAction}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <h1 className={styles.title}>Video Details</h1>
      <div className={styles.videoContainer}>
        <VideoPreview videoPath={videoPath} />
        <div className={styles.thumbnailsContainer}>
          <ThumbnailPicker />
        </div>
      </div>
    <div className={styles.detailsContainer}>
        <VideoDetailsFields
        register={register}
        errors={errors}
        setValue={setValue}
        setError={setError}
       
      />
    </div>
      <PublishButton containerClassName={styles.publishButtonContainer} />
    </Form>
  );
};

export default VideoUploadForm;
