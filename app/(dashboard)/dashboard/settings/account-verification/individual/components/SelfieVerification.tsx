import  SettingsFormWrapper from "./SettingsFormWrapper";
import styles from "./SelfieVerification.module.scss";
import useVerificationStore from "../store/useVerificationStore";
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/Buttons";

const SelfieVerification = () => {
  const { nextStep } = useVerificationStore();
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
    }
  };

  const handleSubmit = () => {
    if (image) {
      // Simulate sending image to backend
      nextStep();
    }
  };

  return (
    <SettingsFormWrapper title="Selfie Verification">
      <div className={styles.container}>
        <p className={styles.description}>
          Take a live selfie and make sure you look directly at the camera, use
          good lighting, and remove any sunglasses or hats before taking the
          photo.
        </p>
        {!image ? (
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
              buttonType="primary"
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
              src={image}
              alt="Captured selfie"
              className={styles.preview}
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
              disabled={false}
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
              onClick={() => setImage(null)}
            />
          </>
        )}
      </div>
    </SettingsFormWrapper>
  );
};

export default SelfieVerification;
