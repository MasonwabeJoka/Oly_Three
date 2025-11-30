"use client";
import styles from "./RepSelfie.module.scss";
import Webcam from "react-webcam";
import { useRef } from "react";
import Image from "next/image";
import Button from "@/components/Buttons";
import { useFormContext } from "react-hook-form";

interface RepSelfieProps {
  onNext: () => void;
}

const RepSelfie: React.FC<RepSelfieProps> = ({ onNext }) => {
  const webcamRef = useRef<any>(null);
  const {
    setValue,
    formState: { errors },
    trigger,
  } = useFormContext();

  const capture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setValue("repSelfie", imageSrc, { shouldValidate: true });
      await trigger("repSelfie");
    }
  };

  const handleSubmit = async () => {
    const isValid = await trigger("repSelfie");
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.description}>
        The business representative must take a live selfie. Please look
        directly at the camera, use good lighting, and remove any sunglasses or
        hats.
      </p>
      {!webcamRef.current?.getScreenshot() ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className={styles.webcam}
          />
          <Button
            className={styles.button}
            buttonChildren="Capture Selfie"
            buttonType="normal"
            buttonSize="large"
            name="capture-btn"
            type="button"
            ariaLabel="Capture Selfie"
            autoFocus={false}
            disabled={false}
            dashboard
            onClick={capture}
          />
        </>
      ) : (
        <>
          <Image
            src={webcamRef.current?.getScreenshot() || ""}
            alt="Captured selfie"
            className={styles.preview}
            width={320}
            height={240}
          />
          <Button
            className={styles.button}
            buttonChildren="Submit Selfie"
            buttonType="primary"
            buttonSize="large"
            name="submit-btn"
            type="button"
            ariaLabel="Submit Selfie"
            autoFocus={false}
            disabled={!!errors.repSelfie}
            dashboard
            onClick={handleSubmit}
          />
          <Button
            className={styles.button}
            buttonChildren="Retake"
            buttonType="normal"
            buttonSize="large"
            name="retake-btn"
            type="button"
            ariaLabel="Retake Selfie"
            autoFocus={false}
            disabled={false}
            dashboard
            onClick={() => setValue("repSelfie", "", { shouldValidate: true })}
          />
        </>
      )}
      {errors.repSelfie && (
        <p className={styles.error}>{String(errors.repSelfie.message || "")}</p>
      )}
    </div>
  );
};

export default RepSelfie;
