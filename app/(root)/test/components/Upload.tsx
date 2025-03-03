import styles from "./Upload.module.scss";
import { useState, useRef } from "react";
import Button from "@/components/Buttons";
import useUploadFiles from "@/app/(dashboard)/dashboard/post-your-ad/store/useUploadFiles";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const { uploadedFiles, addFile } = useUploadFiles(); // Use addFile instead of setUploadedFiles directly
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

  return (
    <div className={styles.container}>
      <div
        className={styles.dropArea}
        ref={dropAreaRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className={styles.text} ref={dragTextRef}>
          Drag & Drop to Upload File
        </p>
        <Button
          className={styles.proceedButton}
          buttonChildren="Upload"
          buttonType="normal"
          buttonSize="large"
          name="proceed-btn"
          type="button"
          ariaLabel="Proceed Button"
          autoFocus={false}
          disabled={false}
          onClick={() => dropAreaRef.current?.querySelector("input")?.click()}
        />
        <input type="file" hidden onChange={handleFileChange} />
      </div>

      {/* Preview section for uploaded images */}
      <div className={styles.preview}>
        {uploadedFiles.length > 0 && (
          <ul>
            {uploadedFiles.map((imageURL, index) => (
              <li key={index}>
                <img src={imageURL} alt={`Uploaded ${index + 1}`} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Upload;
