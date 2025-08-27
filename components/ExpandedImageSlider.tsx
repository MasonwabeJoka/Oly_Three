"use client";
import styles from "./ExpandedImageSlider.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Icon from "./Icon";
import NavButtonLeft from "./navButtonLeft";
import NavButtonRight from "./navButtonRight";
import { useLikeButton } from "./../hooks/useLikeButton";

interface ImageSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrls?: string[];
  hasLikeButton: boolean;
  aspectRatios?: number[];
  isHeartClicked: boolean;
  isHeartHovered: boolean;
  isCardHovered: boolean;
  onHeartClick: (e: React.MouseEvent) => void;
  onHeartHover: (hovered: boolean) => void;
}

const ExpandedImageSlider = ({
  imageUrls,
  hasLikeButton = false,
  aspectRatios,
  isHeartClicked,
  isHeartHovered,
  isCardHovered,
  onHeartClick,
  onHeartHover,
}: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (imageUrls?.length ?? 0) - 1,
  });
  const {
    showHeart,
    showNav,
    isLeftNavHovered,
    isRightNavHovered,
    heartVisibility,
    heartSize,
    getImageSrc,
    setIsLeftNavHovered,
    setIsRightNavHovered,
    handleNavButtonClick,
  } = useLikeButton({
    isHeartClicked,
    isHeartHovered,
    isCardHovered,
  });


  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (imageUrls?.length ?? 0) - 1,
      });
    });
  }, [swiper, imageUrls]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isCardHovered) {
      timer = setTimeout(() => {
        if (swiper && activeIndex !== 0) {
          swiper.slideTo(0);
        }
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isCardHovered, swiper, activeIndex]);
        console.log("IMAGE ULRS", imageUrls);

  return (
    <div className={styles.container}>
      <div className={styles.buttonsAndLike}>
        {hasLikeButton && (
          <div
            className={styles.likeIconContainer}
            onMouseEnter={() => onHeartHover(true)}
            onMouseLeave={() => onHeartHover(false)}
            onClick={onHeartClick}
            style={heartVisibility}
          >
            <Icon
              className={styles.likeIcon}
              src={getImageSrc()}
              alt="Like Icon"
              width={heartSize}
              height={heartSize}
            />
          </div>
        )}
        <div
          className={styles.buttonContainer}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "20.5rem",
          }}
          onClick={(e) => e.preventDefault()}
          onMouseEnter={() => setIsLeftNavHovered(true)}
          onMouseLeave={() => setIsLeftNavHovered(false)}
        >
          <div
            className={`${styles.button} ${styles.leftButton}`}
            onClick={(e) => handleNavButtonClick(e, "prev", swiper)}
            style={{
              display: slideConfig.isBeginning || !showNav ? "none" : "flex",
            }}
          >
            <NavButtonLeft size="small" />
          </div>
        </div>
        <div
          className={styles.buttonContainer}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "20.5rem",
          }}
          onClick={(e) => e.preventDefault()}
          onMouseEnter={() => setIsRightNavHovered(true)}
          onMouseLeave={() => setIsRightNavHovered(false)}
        >
          <div
            className={`${styles.button} ${styles.rightButton}`}
            onClick={(e) => handleNavButtonClick(e, "next", swiper)}
            style={{
              display: slideConfig.isEnd || !showNav ? "none" : "flex",
            }}
          >
            <NavButtonRight size="small" />
          </div>
        </div>
      </div>
      <Swiper
        className={styles.swiper}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        centeredSlides={true}
        slidesPerView={1}
      >

         {imageUrls?.map((url, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <div
              style={{
                position: "relative",
                height: "16rem",
                width: `calc(16rem * ${aspectRatios && aspectRatios[index] ? aspectRatios[index] : "auto"})`,
                borderRadius: "2.5rem",
              }}
            >
              <Image
                className={styles.image}
                src={url}
                fill
                alt="Ad Image"
                style={{ objectFit: "cover", borderRadius: "2.5rem", zIndex: "50" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ExpandedImageSlider;