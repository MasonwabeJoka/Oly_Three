"use client";
import styles from "./MobileCarouselOne.module.scss";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface CarouselProps {
  src: string;
  mobileSrc: string;
  slideName: string;
  slideTitle: string;
  slideParagraph: string;
  initialValue: number;
  data: Array<{
    src: string;
    slideName: string;
    slideTitle: string;
    slideParagraph: string;
  }>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MobileCarouselOne = ({
  src,
  mobileSrc,
  slideName,
  slideTitle,
  initialValue,
  data,
  ...otherProps
}: CarouselProps): JSX.Element => {
  const [slideIndex, setSlideIndex] = useState<number>(initialValue);
  const [currentSlideNameIndex, setCurrentSlideNameIndex] =
    useState<number>(initialValue);
  const slides = useRef<HTMLDivElement[]>([]);
  const slideDescription = useRef<HTMLDivElement[]>([]);
  const slideNames = useRef<HTMLButtonElement[]>([]);

  const nextSlideName = (number: number): void => {
    slideNames?.current[number]?.classList.add(`${styles.active}`);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(
        (previousSlideIndex) => (previousSlideIndex + 1) % data.length
      );
      nextSlideName(slideIndex);
    }, 6000);
    return () => clearInterval(timer);
  }, [slideIndex, data.length]);

  function currentSlide(number: number) {
    setSlideIndex(number);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.slidesContainer}>
        {data.map((slide, index) => {
          return (
            <li
              className={styles.slide}
              ref={(element) =>
                (slides.current[index] = element as HTMLDivElement)
              }
              key={index}
            >
              <Image
                className={styles.image}
                src={slide.mobileSrc}
                alt={slide.slideName}
                width={311}
                height={333}
              />

              <div className={styles.description}>
                <h3 className={styles.slideTitle}>{slide.slideTitle}</h3>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.slideDotsContainer}>
          <ul className={styles.slideDots}>
            {data.map((slide, index) => {
              return (
                <li
                  className={styles.dotsContainer}
                  onClick={() => setSlideIndex(index)}
                  key={index}
                >
                  <button
                    key={index}
                    className={`${styles.dot} ${
                      currentSlideNameIndex === index ? styles.active : ""
                    }`}
                    type="button"
                    aria-label={`${slide.slideName} button`}
                    autoFocus={false}
                    disabled={false}
                  ></button>
                </li>
              );
            })}
          </ul>
        </div>
    </div>
  );
};

export default MobileCarouselOne;
