import styles from "./ReviewVideos.module.scss";
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
    <MediaSectionWrapper title="Videos">
      <Swiper
        className={styles.swipper}
        spaceBetween={-45}
        slidesPerView={"auto"}
      >
        {galleryData.map((video: any, index: number) => {
          return (
            <SwiperSlide className={styles.videoContainer} key={index}>
              <Image src={video.image} alt="image" width={248} height={186.4} style={{borderRadius: "2rem"}}/>
            </SwiperSlide>
          );
        })}

        <div className={styles.navButtons}>
          <NavButtons />
        </div>
      </Swiper>
    </MediaSectionWrapper>
  );
};

export default ReviewPhotos;
