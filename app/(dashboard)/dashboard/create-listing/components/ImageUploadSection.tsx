"use client";
import styles from "./ImageUploadSection.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import NavButtons from "@/components/NavButtons";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import useUploadFiles from "@/app/(dashboard)/dashboard/create-listing/store/useUploadFiles";
import { useEffect, useRef, useState } from "react";
import UploadButton from "@/components/UploadButton";
import Masonry from "react-masonry-css";

type Props = {
  uploadedFiles: string[];
  isDashboard: boolean;
};

const ImageUploadSection = ({ uploadedFiles, isDashboard }: Props) => {
  const { removeImage, reorderFiles, cleanupEmptyFiles } = useUploadFiles();
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const prevCountRef = useRef(uploadedFiles.length);
  const isReordering = useRef(false);

  // Cleanup empty files on mount
  useEffect(() => {
    cleanupEmptyFiles();
  }, [cleanupEmptyFiles]);

  // Handle slide navigation
  useEffect(() => {
    if (!swiperInstance) return;

    // Only trigger for net new additions (not reorders)
    if (
      prevCountRef.current !== null &&
      uploadedFiles.length > prevCountRef.current &&
      !isReordering.current
    ) {
      swiperInstance.slideTo(uploadedFiles.length - 1);
    }

    prevCountRef.current = uploadedFiles.length;
    isReordering.current = false;
  }, [uploadedFiles.length, swiperInstance]);

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    const target = e.target as HTMLElement;
    if (target.closest(`.${styles.deleteButtonContainer}`)) {
      e.preventDefault();
      return;
    }

    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    const dragImage = document.createElement("img");
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    swiperInstance?.disable();
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    // Visual feedback
    e.currentTarget.classList.add(styles.dragOver);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);

    // Re-enable Swiper
    if (swiperInstance) swiperInstance.enable();

    // Remove all drag-over styles
    document.querySelectorAll(`.${styles.dragOver}`).forEach((el) => {
      el.classList.remove(styles.dragOver);
    });
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    isReordering.current = true;
    const newFiles = [...uploadedFiles];
    const [movedFile] = newFiles.splice(draggedIndex, 1);
    newFiles.splice(targetIndex, 0, movedFile);
    reorderFiles(newFiles);
    setDraggedIndex(null);
    swiperInstance?.enable();
  };

  const breakpointColumnsObj = {
    default: isDashboard ? 4 : 5,
  };

  return (
    <div className={styles.container}>
         <Masonry
          className={styles.content}
          breakpointCols={breakpointColumnsObj}
          columnClassName={styles.listingsContainerColumns}
        >
          {uploadedFiles
            .filter((imageUrl) => imageUrl && imageUrl.trim() !== "") // Filter out empty or invalid URLs
            .map((imageUrl, index) => (
              <div
                key={`${imageUrl}-${index}`}
                className={styles.fileContainer}
                draggable
                onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
                  handleDragStart(e, index)
                }
                onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
                  handleDragOver(e, index)
                }
                onDrop={(e: React.DragEvent<HTMLDivElement>) =>
                  handleDrop(e, index)
                }
                onDragEnd={handleDragEnd}
                onDragLeave={(e: React.DragEvent<HTMLDivElement>) =>
                  e.currentTarget.classList.remove(styles.dragOver)
                }
              >
                <div
                  className={styles.deleteButtonContainer}
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                    removeImage(imageUrl);
                  }}
                  draggable={false}
                  onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <Icon
                    className={styles.deleteButton}
                    src={"/icons/x.svg"}
                    alt="delete"
                    width={20}
                    height={20}
                  />
                </div>
                <div className={styles.imageWrapper}>
                  <div className={styles.imageNumber}>{index + 1}</div>
                  <Image
                    className={styles.image}
                    src={imageUrl}
                    alt="image"
                    width={248}
                    height={186.4}
                  />
                </div>
              </div>
            ))}
        </Masonry>

        <div
          className={`${styles.buttonContainer} ${styles.photosButtonContainer}`}
        >
          <UploadButton
            mediaType="photo"
            colour="normal"
            required={true}
            accept="image/*"
          />
        </div> 
      </div>
  );
};

export default ImageUploadSection;
