"use client";
import styles from "./BoxImageSlider.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Icon from "./Icon";
import NavButtonRight from "./navButtonRight";
import NavButtonLeft from "./navButtonLeft";

interface ImageSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  urls?: string[];
  hasLikeButton: boolean;
  aspectRatios?: number[];
}
const ImageSlider = ({
  urls,
  hasLikeButton = false,
  aspectRatios,
}: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0); // to show or hide navigation buttons based on the state
  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    // the last index if there are no urls (null) it defaults to 0.
    isEnd: activeIndex === (urls?.length ?? 0) - 1,
  });
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    // whenever we have a slideChange event we will update the slide state.
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      // we set the slide to keep tract of where we are.

      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls?.length ?? 0) - 1,
      });
    });
  }, [swiper, urls]);

  const handleIconClick = (e: any) => {
    e.preventDefault();
    setIsHeartClicked(!isHeartClicked);
    setShowHeart(true);
  };

  const getImageSrc = () => {
    if (isHeartClicked) return "/icons/heart-clicked.svg";
    if (isHeartHovered) return "/icons/heart-hover.svg";
    return "/icons/heart-hover.svg";
  };



  const heartHovered = {
    opacity: isHeartHovered || isHeartClicked ? 1 : 0,
  };

  const cardHover = {
    opacity: showHeart ? 1 : 0,
    transition: "opacity 0.5s ease",
  };

  const handleMouseEnter = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 2000); // Set showHeart to false after 2 seconds
  };

  const handleMouseLeave = () => {
    setShowHeart(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.buttonsAndLike}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={styles.likeIconContainer}
          onMouseEnter={() => setIsHeartHovered(true)}
          onMouseLeave={() => setIsHeartHovered(false)}
          onClick={handleIconClick}
          style={{ ...cardHover, ...heartHovered }}
        >
          <Icon
            className={styles.likeIcon}
            src={getImageSrc()}
            alt="Like Icon"
            width={isHeartHovered ? 64 : 52}
            height={isHeartHovered ? 64 : 52}
          />
        </div>
        <div
          className={styles.buttonContainer}
          style={{
            // display: slideConfig.isBeginning ? "none" : "flex",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // marginRight: "18.5rem",
            marginRight: "16rem",
          }}
          onClick={(e) => e.preventDefault()}
        >
          <div
            className={`${styles.button} ${styles.leftButton}`}
            onClick={(e) => {
              e.preventDefault();
              swiper?.slidePrev();
            }}
            style={{
              // ...activeStyles,
              display: slideConfig.isBeginning ? "none" : "flex",
              // marginRight: "16rem",
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
            // marginLeft: "18.5rem",
            marginLeft: "16rem",
          }}
          onClick={(e) => e.preventDefault()}
        >
          <div
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              swiper?.slideNext();
            }}
            style={{
              // ...activeStyles,
              display: slideConfig.isEnd ? "none" : "flex",
              // marginLeft: "16rem",
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
        slidesPerView={1}
        autoHeight
      >
        {urls?.map((url, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <div
              style={{
                height: `calc(19.375rem / ${aspectRatios && aspectRatios[index]})`,
                width: "19.375rem",
                borderRadius: "1.5rem",
              }}
            >
              <Image
                className={styles.image}
                src={url}
                fill
                alt="Ad Image"
                style={{
                  verticalAlign: "top",
                  minHeight: 248,
                  objectFit: "cover",
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
