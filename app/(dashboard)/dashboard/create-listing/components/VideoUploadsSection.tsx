"use client";
import styles from "./VideoUploadsSection.module.scss";
import VideoUploadCard from "@/components/cards/VideoUploadCard";
import UploadButton from "@/components/UploadButton";
import Modal from "@/components/Modal";
import VideoUploadForm from "./VideoUploadForm";
import useUploadFiles from "@/app/(dashboard)/dashboard/create-listing/store/useUploadFiles";
import { useCallback, useEffect, useState } from "react";
import { DropZone, Text } from "react-aria-components";

const VideoUploadsSection = () => {
  const uploadedVideos = useUploadFiles((state) => state.uploadedVideos);
  const addVideo = useUploadFiles((state) => state.addVideo);
  const cleanupEmptyFiles = useUploadFiles((state) => state.cleanupEmptyFiles);
  const [showVideoUploadModal, setShowVideoUploadModal] = useState(false);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    cleanupEmptyFiles();
  }, [cleanupEmptyFiles]);

  const handleVideoDrop = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        if (!url?.trim()) return;
        addVideo(url);
        setUploadedVideoUrl(url);
        setShowVideoUploadModal(true);
      };
      reader.readAsDataURL(file);
    },
    [addVideo],
  );

  const handleVideoUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      if (!url?.trim()) return;
      setUploadedVideoUrl(url);
      setShowVideoUploadModal(true);
    };
    reader.readAsDataURL(file);
  }, []);
  const hasUploadedVideos =
    uploadedVideos.filter((videoUrl) => videoUrl && videoUrl.trim() !== "").length > 0;

  return (
    <div className={styles.container}>
      <DropZone
        className={`${styles.dropzone} ${uploadedVideos.length > 0 ? styles.hasVideos : ""}`}
        onDrop={async (e: any) => {
          for (const item of e.items) {
            if (item.kind !== "file") continue;
            const file = await item.getFile();
            if (file.type.startsWith("video/")) {
              handleVideoDrop(file);
            }
          }
        }}
      >
        {!hasUploadedVideos && <Text className={styles.text}>Drop Video Here</Text>}
        {uploadedVideos.map((videoPath, index) => (
          <VideoUploadCard key={index} videoPath={videoPath} index={index} />
        ))}
        <div className={styles.buttonContainer}>
          <UploadButton
            mediaType="video"
            colour="primary"
            size="small"
            required={true}
            accept="video/*"
            className={styles.uploadButton}
            onFileSelect={handleVideoUpload}
          />
        </div>
      </DropZone>


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
