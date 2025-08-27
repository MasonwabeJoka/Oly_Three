"use client";

import styles from "./ReviewVideos.module.scss";
import { MediaSectionWrapper } from "./MediaSectionWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import NavButtons from "@/components/NavButtons";
import Image from "next/image";
import { imagesData } from "@/data/galleryImages";
import Button from "@/components/Buttons";
import useEditStore from "../../store/useEditStore";
import useFormStore from "../../store/useFormStore";
import useUploadMediaStore from "../../store/useUploadMediaStore";

const ReviewPhotos = () => {
  const { setIsEditMode } = useEditStore();
  const { goTo } = useFormStore();
  const { setUploadVideos } = useUploadMediaStore();
  const onClick = () => {
    setIsEditMode(true);
    goTo(5);
    setUploadVideos(true);
  };
  return (
    <MediaSectionWrapper title="Videos">
      <Swiper
        className={styles.swipper}
        spaceBetween={-45}
        slidesPerView={"auto"}
      >
        {imagesData.map((video: any, index: number) => {
          return (
            <SwiperSlide className={styles.videoContainer} key={index}>
              {video.image && (
                <Image
                  src={video.image}
                  alt="image"
                  width={248}
                  height={186.4}
                  style={{ borderRadius: "2.5rem" }}
                />
              )}
            </SwiperSlide>
          );
        })}

        <div className={styles.buttonsContainer}>
          <NavButtons />
          <Button
            className={styles.editButton}
            buttonChildren="Edit"
            buttonType="normal"
            buttonSize="small"
            name="edit-btn"
            type="button"
            ariaLabel="Edit Button"
            autoFocus={false}
            disabled={false}
            dashboard
            onClick={onClick}
          />
        </div>
      </Swiper>
    </MediaSectionWrapper>
  );
};

export default ReviewPhotos;
