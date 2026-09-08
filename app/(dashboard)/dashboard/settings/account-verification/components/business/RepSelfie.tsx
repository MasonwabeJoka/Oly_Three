"use client";
import styles from "./RepSelfie.module.scss";
import Webcam from "react-webcam";
import { useRef } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { useFormContext } from "react-hook-form";

interface RepSelfieProps {
  onNext: () => void | Promise<void>;
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

            isDisabled={!!errors.repSelfie}
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
