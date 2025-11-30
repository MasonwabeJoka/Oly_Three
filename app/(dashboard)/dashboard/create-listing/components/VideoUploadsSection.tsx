import styles from "./VideoUploadsSection.module.scss";
import VideoUploadCard from "@/components/VideoUploadCard";
import UploadButton from "@/components/UploadButton";
import Modal from "@/components/Modal";
import VideoUploadForm from "./VideoUploadForm";
import { useState } from "react";
import Input from "@/components/Input";
import { useFormContext } from "react-hook-form";
const VideoUploadsSection = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [showVideoUploadModal, setShowVideoUploadModal] = useState(false);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);

  const openModal = () => {
    setShowVideoUploadModal(true);
  };
  const handleVideoUpload = (file: File) => {
    const videoUrl = URL.createObjectURL(file); // Generate a temporary URL
    setUploadedVideoUrl(videoUrl);
    openModal();
  };
  return (
    <div className={styles.container}>
      <div className={styles.uploadedVideosContainer}>
        <div className={styles.uploadedVideo}>
          <VideoUploadCard videoPath="https://stream.mux.com/fXNzVtmtWuyz00xnSrJg4OJH6PyNo6D02UzmgeKGkP5YQ/low.mp4" />
        </div>
        <div className={styles.uploadedVideo}>
          <VideoUploadCard videoPath="https://stream.mux.com/fXNzVtmtWuyz00xnSrJg4OJH6PyNo6D02UzmgeKGkP5YQ/low.mp4" />
        </div>
        <div className={styles.uploadedVideo}>
          <VideoUploadCard videoPath="https://stream.mux.com/fXNzVtmtWuyz00xnSrJg4OJH6PyNo6D02UzmgeKGkP5YQ/low.mp4" />
        </div>
      </div>
      <div
        className={`${styles.buttonContainer} ${styles.videosButtonContainer}`}
      >
        <UploadButton
          mediaType="video"
          colour="normal"
          required={true}
          accept="video/*"
          onFileSelect={handleVideoUpload}
        />
      </div>

      <div className={`${styles.buttonContainer} ${styles.videoUrlsContainer}`}>
        <Input
          className={styles.videoURL}
          inputType="text"
          inputSize="large"
          placeholder="Enter Video URL"
          label="Enter Video URL"
          id="video-url"
          ariaLabel="Video URL Field"
          autoFocus={false}
          autoComplete="off"
          disabled={false}
          required
          dashboard
          {...register("uploadMedia.videoUrl")}
          error={(errors.uploadMedia as any)?.videoUrl?.message}
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
