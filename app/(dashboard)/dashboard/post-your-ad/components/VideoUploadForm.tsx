import styles from "./VideoUploadForm.module.scss";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import Button from "@/components/Buttons";
import VideoPlayer from "@/components/VideoPlayer";
import musicVideo from "@/videos/musicVideo.mp4.json";
import Image from "next/image";
import { screenshots } from "@/data/screenshots";
import Form from "next/form";

type FormValues = z.infer<typeof feedbackFormSchema>;
//TODO: Fix tittle missing when portrait video is uploaded.
interface Props {
  videoPath: string;
}
const VideoUploadForm = ({ videoPath }: Props) => {
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

  // Mock server action for demonstration
  async function mockServerAction(formData: FormData): Promise<void> {
    // Simulate server-side processing
    await new Promise((resolve) => setTimeout(resolve, 500));
    // No return value needed
  }

  return (
    <Form
      className={styles.container}
      action={mockServerAction}
      onSubmit={form.handleSubmit(onSubmit, onError)}
    >
      <h1 className={styles.title}>Video Details</h1>
      <div className={styles.videoContainer}>
        <div className={styles.video}>
          <VideoPlayer videoPath={videoPath} />
        </div>
        <div className={`${styles.thumbnailsContainer} ${styles.control}`}>
          <p className={styles.thumbnailTitle}>
            Choose or upload a thumbnail. If not, the current video frame will
            be used
          </p>
          <div className={styles.thumbnails}>
            {screenshots?.map((screenshot) => (
              <div key={screenshot.id} className={styles.thumbnail}>
                <Image
                  src={screenshot.url}
                  alt="screenshot"
                  width={208}
                  height={117}
                />
              </div>
            ))}
            <div className={`${styles.thumbnail} ${styles.customThumbnail}`}>
              <Image src="/icons/plus.png" alt="plus" width={40} height={40} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <div className={`${styles.videoTitleContainer} ${styles.control}`}>
          <p className={styles.errorMessage}>{errors.name?.message}</p>
          <Input
            label="Name"
            className={styles.videoTitle}
            inputType="text"
            inputSize="large"
            placeholder="Give your video a title"
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
        <div className={`${styles.descriptionContainer} ${styles.control}`}>
          <p className={styles.errorMessage}>{errors.message?.message}</p>
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
          />
        </div>
      </div>
      <div className={`${styles.publishButtonContainer} ${styles.control}`}>
        <Button
          className={styles.publishButton}
          buttonChildren="Publish"
          buttonType="primary"
          buttonSize="large"
          name="publish-btn"
          type="submit"
          ariaLabel="Publish Button"
          autoFocus={false}
          disabled={false}
        />
      </div>
    </Form>
  );
};

export default VideoUploadForm;
