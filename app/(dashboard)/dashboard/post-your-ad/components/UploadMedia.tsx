"use client";
import styles from "./UploadMedia.module.scss";
import { FormWrapper } from "./FormWrapper";
import UploadButton from "@/components/UploadButton";
import ImageUploadsSection from "./ImageUploadsSection";
import useUploadFiles from "../store/useUploadFiles";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import VideoUploadForm from "./VideoUploadForm";
import VideoUploadCard from "@/components/VideoUploadCard";
import AttachmentUploadSection from "@/components/AttachmentUploadSection";
import { attachments } from "@/data/attachments";
import { useFormContext } from "react-hook-form";
// Todo: Set validation so that at least one of the media types is selected.
const UploadMedia = () => {
  const { uploadedImages, uploadedVideos } = useUploadFiles();
  const [showVideoUploadModal, setShowVideoUploadModal] = useState(false);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
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

  const openModal = () => {
    setShowVideoUploadModal(true);
  };

  const handleVideoUpload = (file: File) => {
    const videoUrl = URL.createObjectURL(file); // Generate a temporary URL
    setUploadedVideoUrl(videoUrl);
    openModal();
  };

  return (
    <FormWrapper title="Upload Media">
      <div className={styles.container}>
        <div className={styles.uploadedPhotos}>
          <ImageUploadsSection uploadedFiles={uploadedImages} />
        </div>

        <Modal
          showModal={showVideoUploadModal}
          setShowModal={setShowVideoUploadModal}
          modalContent={
            uploadedVideoUrl ? (
              <VideoUploadForm videoPath={uploadedVideoUrl} />
            ) : null
          }
        />

        <div
          className={`${styles.buttonContainer} ${styles.photosButtonContainer}`}
        >
          <UploadButton
            mediaType="photo"
            colour="primary"
            required={true}
            accept="image/*"
          />
        </div>
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
        <div
          className={`${styles.buttonContainer} ${styles.videoUrlsContainer}`}
        >
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
            error={errors.uploadMedia?.videoUrl?.message}
          />
        </div>
        <div className={styles.uploadedAttachmentsContainer}>
          <AttachmentUploadSection attachments={attachments} />
        </div>
        <div
          className={`${styles.buttonContainer} ${styles.attachmentsButtonContainer}`}
        >
          <UploadButton
            mediaType="attachment"
            colour="normal"
            required={true}
            accept="application/*,.pdf, .doc, .docx, .txt, .rtf, .odt, .xls, .xlsx, .ppt, .pptx"
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default UploadMedia;
