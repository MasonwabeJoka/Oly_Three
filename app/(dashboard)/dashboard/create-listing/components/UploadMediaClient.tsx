"use client";
import styles from "./UploadMediaClient.module.scss";
import UploadButton from "@/components/UploadButton";
import ImageUploadSection from "./ImageUploadSection";
import useUploadFiles from "../store/useUploadFiles";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import VideoUploadForm from "./VideoUploadForm";
import VideoUploadCard from "@/components/VideoUploadCard";
import AttachmentUploadSection from "@/components/AttachmentUploadSection";
import { attachments } from "@/data/attachments";
import { useFormContext } from "react-hook-form";
import VideoUploadsSection from "./VideoUploadsSection";

interface Props {
  onNext: () => void;
}

const UploadMediaClient = ({ onNext }: Props) => {
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

export default UploadMediaClient;
