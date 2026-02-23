import styles from "./AdCarousel.module.scss";
import Image from "@/components/Image";
import { Ad } from "@/sanityTemp/Types/Ad";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Autoplay } from "swiper/modules";
import NavButtonRight from "../navButtonRight";
import NavButtonLeft from "../navButtonLeft";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import useFeatureInfo from "@/store/featuresInfo";
import useCurrentSlideIndex from "@/store/currentSlide";

type Props = {
  images: Ad["images"];
  onClick: any;
};
const AdCarousel = ({ images, onClick }: Props) => {
  const { setCurrentSlideIndex } = useCurrentSlideIndex();

  const handleSlideChange = (swiper: any) => {
    setCurrentSlideIndex(swiper.realIndex);
  };

  return (
    <div className={styles.adCarouselContainer} onClick={onClick}>
      <div className={styles.imagesContainer}>
        <Swiper
          initialSlide={0}
          slidesPerView={1}
          spaceBetween={30}
          loop={false}
          keyboard={{
            enabled: true,
          }}
          autoplay={{
            delay: 8000,
            disableOnInteraction: true,
          }}
          onSlideChange={handleSlideChange}
          modules={[Keyboard, Autoplay]}
          autoHeight
          className={styles.swiper}
        >
          {images.map((image, index: number) => (
            <SwiperSlide className={styles.slideContainer} key={index}>
              <div className={styles.slide}>
                <div
                  className={styles.imageContainer}
                  style={{
                    maxHeight: "100vh",
                    width: "100%",
                    maxWidth: `calc(85vh * ${image.aspectRatio})`,
                    cursor: "auto",
                    position: "relative",
                  }}
                  onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                    event.stopPropagation()
                  }
                >
                  <Image
                    className={styles.image}
                    src={image.url}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1296px) 50vw, 33vw"
                    alt={`Image ${index}`}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div
            className={styles.leftButtonContainer}
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
              event.stopPropagation()
            }
          >
            <NavButtonLeft size="medium" className={styles.navButton} />
          </div>
          <div
            className={styles.rightButtonContainer}
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
              event.stopPropagation()
            }
          >
            <NavButtonRight size="medium" className={styles.navButton} />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default AdCarousel;
