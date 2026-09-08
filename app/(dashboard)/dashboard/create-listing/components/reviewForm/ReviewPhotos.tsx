"use client";

import styles from "./ReviewPhotos.module.scss";
import { MediaSectionWrapper } from "./MediaSectionWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import NavButtons from "@/components/NavButtons";
import Image from "@/components/Image";
import { imagesData } from "@/data/galleryImages";
import Button from "@/components/Button";
import useEditStore from "../../store/useEditStore";
import useFormStore from "../../store/useFormStore";
import useUploadMediaStore from "../../store/useUploadMediaStore";

const ReviewPhotos = () => {
  const { setIsEditMode } = useEditStore();
  const { goTo } = useFormStore();
  const { setUploadPhotos } = useUploadMediaStore();

  const onClick = () => {
    setIsEditMode(true);
    goTo(5);
    setUploadPhotos([]);
  };
  return (
    <MediaSectionWrapper title="Photos">
      <div className={styles.container}>
        <Swiper
          className={styles.swipper}
          spaceBetween={-45}
          slidesPerView={"auto"}
        >
          {imagesData.map((photo: any, index: number) => {
            return (
              <SwiperSlide className={styles.photoContainer} key={index}>
                {photo.url && (
                  <Image
                    src={photo.url}
                    alt="image"
                    width={248}
                    height={186.4}
                    style={{ borderRadius: "4rem" }}
                  />
                )}
              </SwiperSlide>
            );
          })}

          <div className={styles.buttonsContainer}>
            <NavButtons className={styles.navButtons} />
            <Button
              className={styles.editButton}
              children="Edit"
              buttonVariant="normal"
              buttonSize="small"


              ariaLabel="Edit Button"


              dashboard
              onClick={onClick}
            />
          </div>
        </Swiper>
      </div>
    </MediaSectionWrapper>
  );
};

export default ReviewPhotos;
