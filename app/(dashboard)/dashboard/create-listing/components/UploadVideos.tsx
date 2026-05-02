"use client";
import styles from "./UploadVideos.module.scss";
import { useState, useEffect } from "react";
import VideoUploadsSection from "./VideoUploadsSection";

interface UploadVideosProps {
  onNext?: () => void;
}

const UploadVideos = ({ onNext }: UploadVideosProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upload Videos</h2>
      <p className={styles.description}>
        Add videos that highlight important details and demonstrate your item in
        use.
      </p>

      <div className={`${styles.mediaSection} ${styles.uploadedVideos}`}>
        <VideoUploadsSection />
      </div>
    </div>
  );
};

export default UploadVideos;
