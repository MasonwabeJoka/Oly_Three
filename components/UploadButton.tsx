"use client";
import styles from "./UploadButton.module.scss";
import { useRef, useState } from "react";
import useUploadFiles from "@/app/(dashboard)/dashboard/create-listing/store/useUploadFiles";
import Button from "@/components/Buttons";

interface Props {
  mediaType: "photo" | "video" | "attachment";
  required: boolean;
  value?: any;
  accept?: string;
  colour?: "normal" | "primary";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileSelect?: (file: File) => void;
}

const UploadButton = ({
  mediaType,
  colour = "normal",
  required,
  // value,
  accept,
  onChange,
  onFileSelect,
  ...otherProps
}: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const { addImage, addVideo, addAttachment } = useUploadFiles();
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const dragTextRef = useRef<HTMLParagraphElement>(null);

  const fileTypes = {
    photo: "image/*",
    video: "video/*",
    attachment: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar",
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      dropAreaRef.current?.classList.add("active");
      processFile(selectedFile);
    }

    // Call onFileSelect when a video file is selected
    if (mediaType === "video" && onFileSelect) {
      if (selectedFile) onFileSelect(selectedFile);
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
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileURL = fileReader.result as string;
      // Only add to store if we have a valid, non-empty URL
      if (fileURL && fileURL.trim() !== "") {
        mediaType === "photo" && addImage(fileURL);
        mediaType === "video" && addVideo(fileURL);
        mediaType === "attachment" && addAttachment(fileURL);
      }
    };
    fileReader.onerror = () => {
      console.error("Error reading file:", selectedFile.name);
    };
    fileReader.readAsDataURL(selectedFile);
  };

  const capitalizeFirstLetter = (string: string) =>
    string?.charAt(0).toUpperCase() + string?.slice(1);

  return (
    <div className={styles.container}>
      <div
        className={styles.uploadMediaContainer}
        ref={dropAreaRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          hidden
          accept={accept || fileTypes[mediaType]}
          onChange={handleFileChange}
        />

        <Button
          className={styles.uploadButton}
          buttonChildren={`Upload ${capitalizeFirstLetter(mediaType)}`}
          buttonType={colour}
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
    </div>
  );
};

export default UploadButton;
