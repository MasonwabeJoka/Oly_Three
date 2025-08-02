"use client";
import styles from "./ReorderPhotos.module.scss";
import ImageUploadsSection from "../components/ImageUploadsSection";
import { galleryData } from "@/data/GalleryData";
import { SwiperSlide } from "swiper/react";
import Icon from "@/components/Icon";
import Image from "next/image";
import Button from "@/components/Buttons";
import { FormWrapper } from "./FormWrapper";
import useUploadFiles from "../store/useUploadFiles";
const ReorderPhotos = () => {
  const { uploadedImages } = useUploadFiles();
  console.log(uploadedImages);
  return (
    <FormWrapper title="Reorder Photos">
      <div className={`${styles.rect} ${styles.container} `}>
        <p className={styles.description}>
          Drag photos and place them in the preferred order.
        </p>
        <div className={`${styles.rect} ${styles.wrapper}`}>
          <div className={`${styles.rect} ${styles.primary}`}>
            <Image
              className={styles.image}
              src={uploadedImages[0] ? uploadedImages[0] : ""}
              alt="image"
              width={513}
              height={378.2}
            />
          </div>
          <div className={`${styles.rect} ${styles.secondary}`}>
            <div className={`${styles.rect} ${styles.one}`}>
              <Image
                className={styles.image}
                src={uploadedImages[1]}
                alt="image"
                width={252}
                height={184}
              />
            </div>
            <div className={`${styles.rect} ${styles.two}`}>
              <Image
                className={styles.image}
                src={uploadedImages[2] ? uploadedImages[2] : ""}
                alt="image"
                width={252}
                height={184}
              />
            </div>
            <div className={`${styles.rect} ${styles.three}`}>
              <Image
                className={styles.image}
                src={uploadedImages[3] ? uploadedImages[3] : ""}
                alt="image"
                width={252}
                height={184}
              />
            </div>
            <div className={`${styles.rect} ${styles.four}`}>
              <Image
                className={styles.image}
                src={uploadedImages[4] ? uploadedImages[4] : ""}
                alt="image"
                width={252}
                height={184}
              />
            </div>
          </div>
        </div>
        <div className={styles.uploadedPhotosContainer}>
          <ul className={styles.uploadedPhotos}>
            {uploadedImages.map((photo: any, index: number) => {
              return (
                <li className={styles.photoContainer} key={index}>
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
                    src={photo}
                    alt="image"
                    width={248}
                    height={186.4}
                  />
                </li>
              );
            })}
          </ul>
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
