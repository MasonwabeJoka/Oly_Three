"use client";
import styles from "./DesktopCarouselOne.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import Button from "../Buttons";
import Image from "next/image";

interface CarouselProps {
  src: string;
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

const DesktopCarouselOne = ({
  src,
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

  const changeSlide = useCallback(
    (number: number) => {
      for (let i = 0; i < data.length; i++) {
        slides.current[i].style.display = "none";
        slideDescription.current[i].style.display = "none";
        slideNames?.current[i]?.classList.remove(`${styles.active}`);
      }
      slides.current[number].style.display = "block";
      slideDescription.current[number].style.display = "block";
      slideNames?.current[number]?.classList.add(`${styles.active}`);
      setCurrentSlideNameIndex(number);
    },
    [data.length]
  );

  const prevNext = (number: number) => {
    setSlideIndex((previousIndex) =>
      previousIndex + number >= data.length
        ? 0
        : previousIndex + number < 0
          ? data.length - 1
          : previousIndex + number
    );
  };

  useEffect(() => {
    changeSlide(slideIndex);
  }, [slideIndex, changeSlide]);

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
              className={styles.slides}
              ref={(element) =>
                (slides.current[index] = element as HTMLDivElement)
              }
              key={index}
            >
              <Image
                className={styles.image}
                src={slide.src}
                alt={slide.slideName}
                width={954}
                height={358}
              />
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
            </li>
          );
        })}

        <ul className={styles.descriptionContainer}>
          {data.map((value, index) => {
            return (
              <li
                className={styles.description}
                key={index}
                ref={(element) =>
                  (slideDescription.current[index] = element as HTMLDivElement)
                }
              >
                <h2 className={styles.slideTitle}>{value.slideTitle}</h2>
              </li>
            );
          })}

          <div className={styles.buttons}>
            <Button
              className={`${styles.button} ${styles.prev}`}
              buttonChildren={
                <Image
                  src="/left-chevron.png"
                  alt="left"
                  width={24}
                  height={24}
                />
              }
              buttonType="roundStandardFeed"
              buttonSize=""
              name="nav-prev-btn"
              type="button"
              ariaLabel="Nav Previous Button"
              autoFocus={false}
              disabled={false}
              onClick={() => prevNext(-1)}
            />
            <Button
              className={`${styles.button} ${styles.next}`}
              buttonChildren={
                <Image
                  src="/right-chevron.png"
                  alt="right"
                  width={24}
                  height={24}
                />
              }
              buttonType="roundStandardFeed"
              buttonSize=""
              name="nav-next-btn"
              type="button"
              ariaLabel="Nav Next Button"
              autoFocus={false}
              disabled={false}
              onClick={() => prevNext(1)}
            />
          </div>
        </ul>
      </ul>
    </div>
  );
};

export default DesktopCarouselOne;
