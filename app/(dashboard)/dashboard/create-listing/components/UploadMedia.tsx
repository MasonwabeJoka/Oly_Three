"use client";
import styles from "./UploadMedia.module.scss";
import ImageUploadSection from "./ImageUploadSection";
import useUploadFiles from "../store/useUploadFiles";
import { useEffect, useState } from "react";
import AttachmentUploadSection from "@/components/AttachmentUploadSection";
import { attachments } from "@/data/attachments";
import { useFormContext } from "react-hook-form";
import VideoUploadsSection from "./VideoUploadsSection";

interface Props {
  onNext: () => void;
}

const UploadMedia = ({ onNext }: Props) => {
  const { uploadedImages, uploadedVideos } = useUploadFiles();

  const [isClient, setIsClient] = useState(false);
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setValue("uploadMedia.images", uploadedImages);
    setValue("uploadMedia.videos", uploadedVideos);
  }, [uploadedImages, uploadedVideos, setValue]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upload Media</h2>

      <div className={`${styles.mediaSection} ${styles.uploadedPhotos}`}>
        <ImageUploadSection isDashboard uploadedFiles={uploadedImages} />
      </div>
      {/* <div className={`${styles.mediaSection} ${styles.uploadedPhotos}`}>
        <ImageSlider uploadedFiles={uploadedImages} />
      </div> */}

      <div className={`${styles.mediaSection} ${styles.uploadedVideos}`}>
        <VideoUploadsSection />
      </div>

      <div
        className={`${styles.mediaSection} ${styles.uploadedAttachmentsContainer}`}
      >
        <AttachmentUploadSection attachments={attachments} />
      </div>
    </div>
  );
};

export default UploadMedia;
