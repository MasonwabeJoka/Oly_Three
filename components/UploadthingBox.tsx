"use client";
import styles from "./UploadBox.module.scss";
import { useState } from "react";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import Image from "@/components/Image";
import Input from "./Input";
import { toast } from "sonner";
import Icon from "./Icon";
import { Loader2, Loader2Icon, XCircle } from "lucide-react";
import Button from "./Buttons";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  mediaType: "photo" | "video" | "attachment";
  size?: keyof typeof boxSize | keyof typeof labelSize;
  required: boolean;
  value?: any;
  accept?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const boxSize = {
  large: `${styles.boxLarge}`,
  medium: `${styles.boxMedium}`,
};

const labelSize = {
  large: `${styles.labelLarge}`,
  medium: `${styles.labelMedium}`,
};

const UploadBox = ({
  mediaType,
  size = "large",
  required,
  value,
  accept,
  onChange,
  ...otherProps
}: Props) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (imageUrl: string) => {
    setIsDeleting(true);
    const imageKey = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((response) => {
        if (response.data.success) {
          setImageUrl("");
          toast.success("Image successfully removed!");
        }
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div className={styles.container}>
      {mediaType === "photo" || mediaType === "attachment" ? (
        <UploadDropzone
          className={`${styles.uploadMediaContainer} ${boxSize[size]}`}
          // endpoint= {mediaType === "photo" ? "imageUploader" : 'attachmentUploader'}
          endpoint="imageUploader"
          onClientUploadComplete={(response) => {
            console.log("File", response);
            toast.success("Uploaded successfully!");
            setImageUrl(response[0].url);
          }}
          onUploadProgress={(response) => {
            setProgress(response);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.

            toast.error(
              `Error occurred while uploading. Make sure your file is less than ${mediaType === "photo" ? "16MB" : "4MB"} in size.`
            );
          }}
          content={{
            button({ ready, isUploading, uploadProgress }) {
              if (uploadProgress) return `${progress}%`;
              if (ready) return `Upload ${mediaType}`;

              return <LoadingSpinner />;
            },
            allowedContent() {
              return `${mediaType === "photo" ? "Please ensure your files are images and under 16MB in size." : "Attach any additional documents here. Only PDF files are accepted."}`;
            },
            uploadIcon() {
              return "";
            },
            label() {
              return "";
            },
          }}
          appearance={{
            container: "custom-container",
            uploadIcon: styles.icon,
            allowedContent: styles.allowed,
            button({ ready, isUploading, uploadProgress }) {
              return `${styles.button} ${
                ready ? styles.buttonLoaded : styles.buttonLoading
              } ${isUploading ? styles.buttonUploading : ""} ${
                uploadProgress ? styles.buttonUploadProgress : ""
              }`;
            },
          }}
        />
      ) : (
        <>
          <div className={`${styles.uploadMediaContainer} ${boxSize[size]}`}>
            <UploadDropzone
              className={`${styles.uploadMediaContainer} ${boxSize[size]}`}
              endpoint="imageUploader"
              onClientUploadComplete={(response) => {
                console.log("File", response);
                toast.success("Uploaded successfully!");
                setImageUrl(response[0].url);
              }}
              onUploadProgress={(response) => {
                setProgress(response);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.

                toast.error(
                  "Error occurred while uploading. Make sure your file is less than 2GB in size."
                );
              }}
              content={{
                button({ ready, isUploading, uploadProgress }) {
                  if (ready) return `Upload ${mediaType}`;
                  if (uploadProgress) return `${progress}%`;

                  return <LoadingSpinner />;
                },

                allowedContent() {
                  return "Please ensure your files are videos and under 10 minutes in runtime.";
                },
                uploadIcon() {
                  return "";
                },
                label() {
                  return "";
                },
              }}
              appearance={{
                container: "custom-container",
                uploadIcon: styles.icon,
                allowedContent: styles.allowed,
                button({ ready, isUploading, uploadProgress }) {
                  return `${styles.button} ${
                    ready ? styles.buttonLoaded : styles.buttonLoading
                  } ${isUploading ? styles.buttonUploading : ""} ${
                    uploadProgress ? styles.buttonUploadProgress : ""
                  }`;
                },
              }}
            />

            {/* <p className={styles.or}>or</p>
            <Input
              className={`${styles.videoURL} ${labelSize[size]}`}
              inputType="text"
              inputSize="large"
              placeholder="Enter Video URL"
              label="Enter Video URL"
              id="video-url"
              name="video-url"
              ariaLabel="Video URL Field"
              autoFocus={false}
              autoComplete="off"
              disabled={false}
              required={required}
              value={value}
              onChange={onChange}
            ></Input> */}
          </div>
        </>
      )}
      {imageUrl.length > 0 ? (
        <div>
          <Image src={imageUrl} alt="Upload Preview" width={300} height={300} />
        </div>
      ) : null}
      <Button
        className={styles.deleteButton}
        buttonChildren={isDeleting ? <Loader2Icon /> : <XCircle />}
        buttonType="icon"
        buttonSize=""
        name="delete-btn"
        type="button"
        ariaLabel="Delete Button"
        autoFocus={false}
        disabled={false}
        onClick={() => handleDelete(imageUrl)}
      />
    </div>
  );
};

export default UploadBox;
