"use client";
import styles from "./UploadBox.module.scss";
import { useState } from "react";
import Input from "@/components/Input";

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
}

const labelSize = {
  large: `${styles.labelLarge}`,
  medium: `${styles.labelMedium}`,
};

const UploadBox = ({
  mediaType,
  size ="large",
  required,
  value,
  accept,
  onChange,
  ...otherProps
}: Props) => {
  const [uploadType, setUploadType] = useState("");

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className={styles.container}>
      {mediaType === "photo" || mediaType === "attachment" ? (
        <div className={`${styles.uploadMediaContainer} ${boxSize[size]}`}>
          <Input
            className={`${styles.uploadPhotoOrAttachment} ${styles.uploadBox} `}
            inputType="file"
            inputSize=""
            placeholder=""
            label={`Upload ${mediaType}`}
            id="upload-photo-attachment"
            name="upload-photo-attachment"
            ariaLabel="Upload Photo or Attachment Button"
            autoFocus={false}
            autoComplete="off"
            disabled={false}
            required={required}
            accept={accept}
            onChange={onChange}
          >
            <label className={`${styles.label} ${labelSize[size]}`} htmlFor="upload-photo-attachment">
              {`Upload ${capitalizeFirstLetter(mediaType)}`}
            </label>
          </Input>
        </div>
      ) : (
        <>
          <div className={`${styles.uploadMediaContainer} ${boxSize[size]}`}>
            <div className={styles.uploadVideoContainer}>
              <Input
                className={`${styles.uploadVideo} ${styles.uploadBox} ${boxSize[size]}`}
                inputType="file"
                inputSize="large"
                placeholder=""
                label={`Upload ${mediaType}`}
                id="upload-videos"
                name="upload-videos"
                ariaLabel="Upload Videos Button"
                autoFocus={false}
                autoComplete="off"
                required={required}
                accept={accept}
                onChange={onChange}
              >
                <label className={`${styles.label} ${labelSize[size]}`} htmlFor="upload-videos">
                  {`Upload ${capitalizeFirstLetter(mediaType)}`}
                </label>
              </Input>
            </div>

            <p className={styles.or}>or</p>
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
