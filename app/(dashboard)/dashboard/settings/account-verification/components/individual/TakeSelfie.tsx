'use client';
import styles from './TakeSelfie.module.scss';
import Webcam from 'react-webcam';
import { useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/Buttons';
import { useFormContext } from 'react-hook-form';

interface TakeSelfieProps {
  onNext: () => void;
}

const TakeSelfie: React.FC<TakeSelfieProps> = ({ onNext }) => {
  const webcamRef = useRef<Webcam>(null);
  const { setValue, formState: { errors }, trigger } = useFormContext();

  const capture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setValue('selfie', imageSrc, { shouldValidate: true });
      await trigger('selfie');
    }
  };

  const handleSubmit = async () => {
    const isValid = await trigger('selfie');
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.description}>
        Take a live selfie and make sure you look directly at the camera, use good lighting, and remove any sunglasses or hats before taking the photo.
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
            src={webcamRef.current?.getScreenshot() || ''}
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
            disabled={!!errors.selfie}
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
            onClick={() => setValue('selfie', '', { shouldValidate: true })}
          />
        </>
      )}
      {errors.selfie && <p className={styles.error}>{errors.selfie.message}</p>}
    </div>
  );
};

export default TakeSelfie;