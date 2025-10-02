"use client";
import styles from "./UploadBox.module.scss";
import { useRef, useState } from "react";
import Input from "@/components/Input";
import Button from "./Buttons";
import useUploadFiles from "@/app/(dashboard)/dashboard/create-listing/store/useUploadFiles";

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
  const [file, setFile] = useState<File | null>(null);
  const { addFile } = useUploadFiles();
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const dragTextRef = useRef<HTMLParagraphElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      dropAreaRef.current?.classList.add("active");
      showFile(selectedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dropAreaRef.current?.classList.add("active");
    if (dragTextRef.current) {
      dragTextRef.current.textContent = "Release to Upload File";
    }
  };

  const handleDragLeave = () => {
    dropAreaRef.current?.classList.remove("active");
    if (dragTextRef.current) {
      dragTextRef.current.textContent = "Drag & Drop to Upload File";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer?.files[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      showFile(selectedFile);
    }
  };

  const showFile = (selectedFile: File) => {
    const fileType = selectedFile.type;
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];

    if (validExtensions.includes(fileType)) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const fileURL = fileReader.result as string;
        // Use addFile to append to the uploadedFiles array
        addFile(fileURL);
      };
      fileReader.readAsDataURL(selectedFile);
    } else {
      alert("This is not an Image File!");
      dropAreaRef.current?.classList.remove("active");
      if (dragTextRef.current) {
        dragTextRef.current.textContent = "Drag & Drop to Upload File";
      }
    }
  };

  function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

  return (
    <div className={styles.container}>
      {mediaType === "photo" || mediaType === "attachment" ? (
        <div
          className={`${styles.uploadMediaContainer} ${boxSize[size]}`}
          ref={dropAreaRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input type="file" hidden onChange={handleFileChange} />

          <Button
            className={styles.uploadButton}
            buttonChildren={`Upload ${capitalizeFirstLetter(mediaType)}`}
            buttonType="normal"
            buttonSize="large"
            name="upload-btn"
            type="button"
            ariaLabel="Upload Button"
            autoFocus={false}
            disabled={false}
            dashboard
            onClick={() => dropAreaRef.current?.querySelector("input")?.click()}
          />
        </div>
      ) : (
        <>
          <div className={`${styles.uploadMediaContainer} ${boxSize[size]}`}>
            <div className={styles.uploadVideoContainer}>
              <input type="file" hidden onChange={handleFileChange} />

              <Button
                className={styles.uploadButton}
                buttonChildren={`Upload ${capitalizeFirstLetter(mediaType)}`}
                buttonType="normal"
                buttonSize="large"
                name="upload-btn"
                type="button"
                ariaLabel="Upload Button"
                autoFocus={false}
                disabled={false}
                dashboard
                onClick={() =>
                  dropAreaRef.current?.querySelector("input")?.click()
                }
              />
            </div>

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
            ></Input>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadBox;
