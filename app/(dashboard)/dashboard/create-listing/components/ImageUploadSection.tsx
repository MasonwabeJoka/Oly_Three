"use client";
import styles from "./ImageUploadSection.module.scss";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import useUploadFiles from "@/app/(dashboard)/dashboard/create-listing/store/useUploadFiles";
import { useEffect, useRef, useState, useCallback } from "react";
import UploadButton from "@/components/UploadButton";
import Masonry from "react-masonry-css";
import { DropZone, Text } from "react-aria-components";

type Props = {
  uploadedFiles: string[];
  isDashboard: boolean;
};

const ImageUploadSection = ({ uploadedFiles, isDashboard }: Props) => {
  const addImage = useUploadFiles((state) => state.addImage);
  const removeImage = useUploadFiles((state) => state.removeImage);
  const reorderFiles = useUploadFiles((state) => state.reorderFiles);
  const cleanupEmptyFiles = useUploadFiles((state) => state.cleanupEmptyFiles);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const isReordering = useRef(false);

  useEffect(() => {
    cleanupEmptyFiles();
  }, [cleanupEmptyFiles]);

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
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    // Visual feedback
    e.currentTarget.classList.add(styles.dragOver);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);

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
  };

  const breakpointColumnsObj = {
    default: isDashboard ? 4 : 5,
  };
  const hasUploadedImages =
    uploadedFiles.filter((imageUrl) => imageUrl && imageUrl.trim() !== "").length > 0;

  const processFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        if (url?.trim()) addImage(url);
      };
      reader.readAsDataURL(file);
    },
    [addImage],
  );

  return (
    <div className={styles.container}>
      <DropZone
        className={`${styles.dropzone} ${uploadedFiles.length > 0 ? styles.hasImages : ""}`}
        onDrop={async (e: any) => {
          for (const item of e.items) {
            if (item.kind !== "file") continue;
            const file = await item.getFile();
            if (file.type.startsWith("image/")) {
              processFile(file);
            }
          }
        }}
      >
        {!hasUploadedImages && <Text className={styles.text}>Drop Photos Here</Text>}
        <Masonry
          className={styles.masonry}
          breakpointCols={breakpointColumnsObj}
          columnClassName={styles.listingsContainerColumns}
        >
          {uploadedFiles
            .filter((imageUrl) => imageUrl && imageUrl.trim() !== "")
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
        <div className={styles.buttonContainer}>
          <UploadButton
            mediaType="photo"
            colour="primary"
            size="small"
            required={true}
            accept="image/*"
            className={styles.uploadButton}
          />
        </div>
      </DropZone>
    </div>
  );
};

export default ImageUploadSection;
