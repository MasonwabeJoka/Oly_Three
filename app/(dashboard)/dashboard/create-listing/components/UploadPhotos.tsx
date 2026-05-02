"use client";
import styles from "./UploadPhotos.module.scss";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import useUploadFiles from "../store/useUploadFiles";
import ImageUploadSection from "./ImageUploadSection";

interface UploadPhotosProps {
  onNext?: () => void;
}

const UploadPhotos = ({ onNext }: UploadPhotosProps) => {
  const { uploadedImages } = useUploadFiles();
  const { setValue } = useFormContext();


  useEffect(() => {
    setValue("uploadPhotos", uploadedImages);
  }, [uploadedImages, setValue]);



  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Upload Photos</h1>
        <p className={styles.description}>
          Add clear photos of your item so buyers can quickly understand what
          you are offering.
        </p>
        <ImageUploadSection isDashboard uploadedFiles={uploadedImages} />
     
      </div>
    </div>
  );
};

export default UploadPhotos;
