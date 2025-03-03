import styles from "./ImageUploadsSection.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import NavButtons from "@/components/NavButtons";
import Image from "next/image";
import Icon from "@/components/Icon";
import useUploadFiles from "@/app/(dashboard)/dashboard/post-your-ad/store/useUploadFiles";
import { useEffect, useRef, useState } from "react";

type Props = {
  uploadedFiles: string[];
};

const ImageUploadsSection = ({ uploadedFiles }: Props) => {
  const { removeImage, reorderFiles } = useUploadFiles();
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const prevCountRef = useRef(uploadedFiles.length);
  const isReordering = useRef(false);

  // Handle slide navigation
  useEffect(() => {
    if (!swiperInstance) return;

    // Only trigger for net new additions (not reorders)
    if (uploadedFiles.length > prevCountRef.current && !isReordering.current) {
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
    e.dataTransfer.setDragImage(new Image(), 0, 0);
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

  return (
    <div className={styles.container}>
      <Swiper
        onSwiper={setSwiperInstance}
        className={styles.swipper}
        spaceBetween={20}
        slidesPerView="auto"
        allowTouchMove={false}
        watchSlidesProgress
        observer
        observeParents
      >
        {uploadedFiles.map((imageUrl, index) => (
          <SwiperSlide
            key={`${imageUrl}-${index}`} // Unique key for reorders
            className={styles.fileContainer}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onDragLeave={(e) =>
              e.currentTarget.classList.remove(styles.dragOver)
            }
          >
            <div
              className={styles.deleteButtonContainer}
              onClick={(e) => {
                e.stopPropagation();
                removeImage(imageUrl);
              }}
              draggable={false}
              onDragStart={(e) => {
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
            <Image
              className={styles.image}
              src={imageUrl}
              alt="image"
              width={248}
              height={186.4}
            />
          </SwiperSlide>
        ))}

        <div className={styles.navButtons}>
          {uploadedFiles.length > 4 && <NavButtons />}
        </div>
      </Swiper>
    </div>
  );
};

export default ImageUploadsSection;
