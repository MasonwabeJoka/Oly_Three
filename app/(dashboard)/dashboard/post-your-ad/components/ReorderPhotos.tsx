"use client";
import styles from "./ReorderPhotos.module.scss";
import UploadsSection from "../components/UploadsSection";
import { galleryData } from "@/data/GalleryData";
import { SwiperSlide } from "swiper/react";
import Icon from "@/components/Icon";
import Image from "next/image";
import Button from "@/components/Buttons";
import { FormWrapper } from "./FormWrapper";
const ReorderPhotos = () => {
  return (
    <FormWrapper title="Reorder Photos">
      <div className={`${styles.rect} ${styles.container} `}>
        <p className={styles.description}>Drag photos and place them in the preferred order.</p>
        <div className={`${styles.rect} ${styles.wrapper}`}>
          <div className={`${styles.rect} ${styles.primary}`}></div>
          <div className={`${styles.rect} ${styles.secondary}`}>
            <div className={`${styles.rect} ${styles.one}`}></div>
            <div className={`${styles.rect} ${styles.two}`}></div>
            <div className={`${styles.rect} ${styles.three}`}></div>
            <div className={`${styles.rect} ${styles.four}`}></div>
          </div>
        </div>
        <div className={styles.uploadedPhotosContainer}>
          <div className={styles.uploadedPhotos}>
            {galleryData.map((photo: any, index: number) => {
              return (
                <div className={styles.photoContainer} key={index}>
                  <div className={styles.deleteButtonContainer}>
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
                    src={photo.image}
                    alt="image"
                    width={248}
                    height={186.4}
                  />
                </div>
              );
            })}
          </div>
          <div>
            <Button
              className={styles.proceedButton}
              buttonChildren="Upload Photo"
              buttonType="normal"
              buttonSize="large"
              name="proceed-btn"
              type="button"
              ariaLabel="Proceed Button"
              autoFocus={false}
              disabled={false}
              dashboard
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default ReorderPhotos;
