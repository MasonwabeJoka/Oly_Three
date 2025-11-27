"use client";
import styles from "./VehiclePhotoUploads.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useUploadFiles from "../../store/useUploadFiles";
import ImageUploadSlider from "../ImageUploadSlider";
import ImageUploadSection from "../ImageUploadSection";

const VehiclePhotoUploads = () => {
  const router = useRouter();
  const [photos, setPhotos] = useState<File[]>([]);
  const { uploadedImages } = useUploadFiles();

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleNext = () => router.push("/sell/description");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Photos</h1>
      <p className={styles.description}>
        Upload clear, well-lit photos that give buyers a complete view of your
        car. Show all exterior angles and important interior areas like the
        dashboard, seats, infotainment system, and boot. Add helpful details
        such as wheels, badges, and spare keys or manuals. A clean car always
        looks good in photos.
      </p>

      <ImageUploadSection isDashboard uploadedFiles={uploadedImages} />

      <button type="button" onClick={handleNext} disabled={photos.length === 0}>
        Next
      </button>
    </div>
  );
};

export default VehiclePhotoUploads;
