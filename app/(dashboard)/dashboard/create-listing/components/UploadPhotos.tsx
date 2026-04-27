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
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setValue("uploadPhotos", uploadedImages);
  }, [uploadedImages, setValue]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [uploadedImages]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Upload Photos</h1>
        <ImageUploadSection isDashboard uploadedFiles={uploadedImages} />
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default UploadPhotos;
