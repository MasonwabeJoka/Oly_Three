"use client";
import styles from "./TakeSelfie.module.scss";
import Webcam from "react-webcam";
import { useRef } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { useFormContext } from "react-hook-form";

interface TakeSelfieProps {
  onNext: () => void | Promise<void>;
}

const TakeSelfie: React.FC<TakeSelfieProps> = ({ onNext }) => {
  const webcamRef = useRef<any>(null);
  const {
    setValue,
    formState: { errors },
    trigger,
  } = useFormContext();

  const capture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setValue("selfie", imageSrc, { shouldValidate: true });
      await trigger("selfie");
    }
  };

  const handleSubmit = async () => {
    const isValid = await trigger("selfie");
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.description}>
        Take a live selfie and make sure you look directly at the camera, use
        good lighting, and remove any sunglasses or hats before taking the
        photo.
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
            children="Capture Selfie"
            buttonVariant="normal"
            buttonSize="large"


            ariaLabel="Capture Selfie"


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
            children="Submit Selfie"
            buttonVariant="primary"
            buttonSize="large"


            ariaLabel="Submit Selfie"

            isDisabled={!!errors.selfie}
            dashboard
            onClick={handleSubmit}
          />
          <Button
            className={styles.button}
            children="Retake"
            buttonVariant="normal"
            buttonSize="large"


            ariaLabel="Retake Selfie"


            dashboard
            onClick={() => setValue("selfie", "", { shouldValidate: true })}
          />
        </>
      )}
      {errors.selfie && (
        <p className={styles.error}>{String(errors.selfie.message || "")}</p>
      )}
    </div>
  );
};

export default TakeSelfie;
