import styles from "./UploadsSection.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import NavButtons from "@/components/NavButtons";
import Image from "next/image";
import { galleryData } from "@/data/GalleryData";
import Icon from "@/components/Icon";
const UploadSection = () => {
  return (
    <div className={styles.container}>
      <Swiper
        className={styles.swipper}
        spaceBetween={20}
        slidesPerView={"auto"}
      >
        {galleryData.map((photo: any, index: number) => {
          return (
            <SwiperSlide className={styles.photoContainer} key={index}>
              <div className={styles.deleteButtonContainer}>
                <Icon
                  className={styles.deleteButton}
                  src={"/icons/x.svg"}
                  alt="delete"
                  width={20}
                  height={20}
                />
              </div>
              <Image className={styles.image}src={photo.image} alt="image" width={248} height={186.4} />
            </SwiperSlide>
          );
        })}

        <div className={styles.navButtons}>
          <NavButtons />
        </div>
      </Swiper>
    </div>
  );
};

export default UploadSection;
