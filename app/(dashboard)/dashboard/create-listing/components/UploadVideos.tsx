'use client';
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import VideoUploadsSection from "./VideoUploadsSection";

const UploadVideos = () => {
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

      <div className={`${styles.mediaSection} ${styles.uploadedVideos}`}>
        <VideoUploadsSection />
      </div>
    </div>
  );
};

export default UploadVideos;