import styles from "./ReviewPhotos.module.scss";
import { MediaSectionWrapper } from "./MediaSectionWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import NavButtons from "@/components/NavButtons";
import Image from "next/image";
import { galleryData } from "@/data/GalleryData";
import { SectionWrapper } from "./SectionWrapper";
import Button from "@/components/Buttons";
import useEditStore from "../../store/useEditStore";
import useFormStore from "../../store/useFormStore";
import useUploadMediaStore from "../../store/useUploadMediaStore";

const ReviewPhotos = () => {
  const { setIsEditMode } = useEditStore();
  const { goTo } = useFormStore();
  const {setUploadPhotos} = useUploadMediaStore();

  const onClick = () => {
    setIsEditMode(true);
    goTo(5);
    setUploadPhotos(true);
  };
  return (
    <MediaSectionWrapper title="Photos" >
      <div className={styles.container}>
        <Swiper
          className={styles.swipper}
          spaceBetween={-45}
          slidesPerView={"auto"}
        >
          {galleryData.map((photo: any, index: number) => {
            return (
              <SwiperSlide className={styles.photoContainer} key={index}>
                <Image
                  src={photo.image}
                  alt="image"
                  width={248}
                  height={186.4}
                  style={{ borderRadius: "2rem" }}
                />
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
      </div>
    </MediaSectionWrapper>
  );
};

export default ReviewPhotos;
