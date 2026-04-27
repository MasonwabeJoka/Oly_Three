"use client";
import styles from "./VideoUploadsSection.module.scss";
import VideoUploadCard from "@/components/cards/VideoUploadCard";
import UploadButton from "@/components/UploadButton";
import Modal from "@/components/Modal";
import VideoUploadForm from "./VideoUploadForm";
import { useState } from "react";
import { useFormContext } from "react-hook-form";


const VideoUploadsSection = () => {
  const formContext = useFormContext();
  const register = formContext?.register;
  const errors = formContext?.formState?.errors;

  const [showVideoUploadModal, setShowVideoUploadModal] = useState(false);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
 

  const openModal = () => {
    setShowVideoUploadModal(true);
  };
  const handleVideoUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedVideoUrl(url);
    openModal();
  };

  const videoPaths = [
    "https://stream.mux.com/fXNzVtmtWuyz00xnSrJg4OJH6PyNo6D02UzmgeKGkP5YQ/low.mp4",
    "https://stream.mux.com/fXNzVtmtWuyz00xnSrJg4OJH6PyNo6D02UzmgeKGkP5YQ/low.mp4",
    "https://stream.mux.com/fXNzVtmtWuyz00xnSrJg4OJH6PyNo6D02UzmgeKGkP5YQ/low.mp4",
  ];

  return (
    <div className={styles.container}>
      <div
        className={`${styles.uploadedVideosContainer} ${videoPaths.length > 0 ? styles.hasVideos : ""}`}
      >
        {videoPaths.map((videoPath, index) => (
          <VideoUploadCard key={index} videoPath={videoPath} index={index} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <UploadButton
          mediaType="video"
          colour="primary"
          required={true}
          accept="video/*"
          onFileSelect={handleVideoUpload}
        />

    
      </div>

      <Modal
        showModal={showVideoUploadModal}
        setShowModal={setShowVideoUploadModal}
        modalContent={
          uploadedVideoUrl ? (
            <VideoUploadForm videoPath={uploadedVideoUrl} />
          ) : (
            <div></div>
          )
        }
      />
    </div>
  );
};

export default VideoUploadsSection;
