"use client";
import styles from "./BoxImageSlider.module.scss";
import Image from "@/components/Image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Icon from "./Icon";
import NavButtonRight from "./navButtonRight";
import NavButtonLeft from "./navButtonLeft";
import { normalizeImageSrc } from "@/utils/imageUtils";
import { useLikeButton } from "./../hooks/useLikeButton";

interface ImageSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  imagesUrls?: string[];
  hasLikeButton: boolean;
  aspectRatios?: number[];
  isHeartClicked: boolean;
  isHeartHovered: boolean;
  isCardHovered: boolean;
  onHeartClick: (e: React.MouseEvent) => void;
  onHeartHover: (hovered: boolean) => void;
}

const ImageSlider = ({
  category,
  imagesUrls,
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
    isEnd: activeIndex === (imagesUrls?.length ?? 0) - 1,
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
        isEnd: activeIndex === (imagesUrls?.length ?? 0) - 1,
      });
    });
  }, [swiper, imagesUrls]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isCardHovered) {
      timer = setTimeout(() => {
        if (swiper && activeIndex !== 0) {
          swiper.slideTo(0);
        }
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isCardHovered, swiper, activeIndex]);

  const swiperStyles = {
    width: category === "property" || category === "vehicles" ? "24.21875rem" : "19.375rem",
  };
  const swiperSlideHeight = (index: number) => {
    if (category === "property" || category === "vehicles") {
      return "13.623046875rem";
    } else if (category === "shops") {
     
        if (aspectRatios && aspectRatios[index] >= 1) {
        return "15.5rem";
      } else {
        return "27.5rem";
      }
    } else {
      return `calc(19.375rem / ${aspectRatios && aspectRatios[index]})`;
    }
  };

  const swiperSlideWidth =
    category === "property" || category === "vehicles" ? "24.21875rem" : "19.375rem";

  return (
    <div className={styles.container} style={swiperStyles}>
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
          className={styles.navButtonContainer}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: category === "property" ? "21rem" : "16rem",
          }}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
          onMouseEnter={() => setIsLeftNavHovered(true)}
          onMouseLeave={() => setIsLeftNavHovered(false)}
        >
          <div className={styles.buttonWrapper}>
            <div
              className={`${styles.button} ${styles.leftButton}`}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => handleNavButtonClick(e, "prev", swiper)}
              style={{
                display: slideConfig.isBeginning || !showNav ? "none" : "flex",
              }}
            >
              <NavButtonLeft size="small" />
            </div>
          </div>
        </div>
        <div
          className={styles.navButtonContainer}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: category === "property" ? "21rem" : "16rem",
          }}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
          onMouseEnter={() => setIsRightNavHovered(true)}
          onMouseLeave={() => setIsRightNavHovered(false)}
        >
          <div
            className={styles.button}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => handleNavButtonClick(e, "next", swiper)}
            style={{
              display: slideConfig.isEnd || !showNav ? "none" : "flex",
            }}
          >
            <NavButtonRight size="small" />
          </div>
        </div>
      </div>
      <Swiper
        key="image-slider"
        className={styles.swiper}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        slidesPerView={1}
        autoHeight
        style={swiperStyles}
      >
        {imagesUrls?.map((url, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <div
              style={{
                position: "relative",
                height: swiperSlideHeight(index),
                width: swiperSlideWidth,
                backgroundColor: "#e4e6e7",
              }}
            >
              <Image
                className={styles.image}
                src={normalizeImageSrc(url)}
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
