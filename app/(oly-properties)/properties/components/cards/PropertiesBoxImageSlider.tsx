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
import { normalizeImageSrc } from '@/utils/imageUtils';

interface ImageSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  urls?: string[];
  hasLikeButton: boolean;
  aspectRatios?: number[];
  isHeartClicked: boolean;
  isHeartHovered: boolean;
  isCardHovered: boolean;
  onHeartClick: (e: React.MouseEvent) => void;
  onHeartHover: (hovered: boolean) => void;
}

const ImageSlider = ({
  urls,
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
    isEnd: activeIndex === (urls?.length ?? 0) - 1,
  });
  const [showHeart, setShowHeart] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [isLeftNavHovered, setIsLeftNavHovered] = useState(false);
  const [isRightNavHovered, setIsRightNavHovered] = useState(false);
  const [navClickedRecently, setNavClickedRecently] = useState(false);
  const [navInteractionOccurred, setNavInteractionOccurred] = useState(false);

  // The purpose of this code is to monitor when a user swipes or navigates between images in the slider, and then update the component's state to reflect which image is currently showing. This helps the component know whether to show or hide the navigation buttons (like "previous" and "next" buttons).
  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls?.length ?? 0) - 1,
      });
    });
  }, [swiper, urls]);

  // Reset slider to first slide after 2 seconds of not hovering card
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

  // Manage heart visibility
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const isNavHovered = isLeftNavHovered || isRightNavHovered;

    if (navClickedRecently || isNavHovered) {
      setShowHeart(false); // Hide heart during nav click or hover
      timer = setTimeout(() => {
        setNavClickedRecently(false);
        if (isHeartClicked && !isNavHovered) setShowHeart(true); // Reappear clicked heart
      }, 500);
    } else if (isHeartClicked) {
      setShowHeart(true); // Keep clicked heart visible
    } else if (isHeartHovered || (isCardHovered && !navInteractionOccurred)) {
      setShowHeart(true); // Show hover heart only if no nav interaction
      timer = setTimeout(() => {
        setShowHeart(false); // Disappear after 2 seconds if not clicked
      }, 2000);
    } else {
      setShowHeart(false); // Hide if no conditions met
    }

    // Reset nav interaction flag when card hover ends
    if (!isCardHovered) {
      setNavInteractionOccurred(false);
    }

    return () => clearTimeout(timer);
  }, [
    isCardHovered,
    isHeartClicked,
    isHeartHovered,
    isLeftNavHovered,
    isRightNavHovered,
    navClickedRecently,
    navInteractionOccurred,
  ]);

  // Manage navigation visibility
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (
      isCardHovered ||
      isLeftNavHovered ||
      isRightNavHovered ||
      isHeartClicked
    ) {
      setShowNav(true);
    } else {
      timer = setTimeout(() => {
        setShowNav(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isCardHovered, isHeartClicked, isLeftNavHovered, isRightNavHovered]);

  const handleNavButtonClick = (
    e: React.MouseEvent,
    direction: "prev" | "next"
  ) => {
    e.preventDefault();
    if (direction === "prev") swiper?.slidePrev();
    if (direction === "next") swiper?.slideNext();
    setShowNav(true);
    setShowHeart(false); // Hide heart on nav click
    setNavClickedRecently(true); // Trigger nav click effect
    setNavInteractionOccurred(true); // Mark nav interaction
    if (
      !isHeartClicked &&
      !isHeartHovered &&
      !isLeftNavHovered &&
      !isRightNavHovered
    ) {
      setTimeout(() => {
        setShowNav(false);
      }, 2000);
    }
  };

  const getImageSrc = () => {
    if (isHeartClicked) return "/icons/heart-clicked.svg";
    if (isHeartHovered || (isCardHovered && !navInteractionOccurred))
      return "/icons/heart-hover.svg";
    return "/icons/heart-hover.svg";
  };

  const heartVisibility = {
    opacity: hasLikeButton && showHeart ? 1 : 0,
    transition: "opacity 0.5s ease",
  };

  const heartSize = isHeartHovered ? 64 : 52;

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
            marginRight: "16rem",
          }}
          onClick={(e) => e.preventDefault()}
          onMouseEnter={() => setIsLeftNavHovered(true)}
          onMouseLeave={() => setIsLeftNavHovered(false)}
        >
          <div className={styles.buttonWrapper}>
            <div
              className={`${styles.button} ${styles.leftButton}`}
              onClick={(e) => handleNavButtonClick(e, "prev")}
             
              style={{
                display: slideConfig.isBeginning || !showNav ? "none" : "flex",
              }}
            >
              <NavButtonLeft size="small" />
            </div>
          </div>
        </div>
        <div
          className={styles.buttonContainer}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "16rem",
          }}
          onClick={(e) => e.preventDefault()}
          onMouseEnter={() => setIsRightNavHovered(true)}
          onMouseLeave={() => setIsRightNavHovered(false)}
        >
          <div
            className={styles.button}
            onClick={(e) => handleNavButtonClick(e, "next")}
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


