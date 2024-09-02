import styles from "./ReviewPhotos.module.scss";
import { MediaSectionWrapper } from "./MediaSectionWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import NavButtons from "@/components/NavButtons";
import Image from "next/image";
import { galleryData } from "@/data/GalleryData";
const ReviewPhotos = () => {
  return (
    <MediaSectionWrapper title="Photos">
      <div className={styles.container}>

      <Swiper className={styles.swipper} spaceBetween={-45} slidesPerView={"auto"}>
        {galleryData.map((photo: any, index: number) => {
          return (
            <SwiperSlide className={styles.photoContainer} key={index}>
              <Image src={photo.image} alt="image" width={248} height={186.4} style={{borderRadius: "2rem"}}/>
            </SwiperSlide>
          );
        })}

        <div className={styles.navButtons}>
          <NavButtons />
        </div>
      </Swiper>
      </div>
    </MediaSectionWrapper>
  );
};

export default ReviewPhotos;
