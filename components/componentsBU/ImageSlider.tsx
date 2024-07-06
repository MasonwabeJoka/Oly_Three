"use client";
import styles from "./BoxImageSlider.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BoxImageSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  urls: string[];
}
const BoxImageSlider = ({ urls }: BoxImageSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0); // to show or hide navigation buttons based on the state
  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    // the last index if there are no urls (null) it defaults to 0.
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  });

  useEffect(() => {
    // whenever we have a slideChange event we will update the slide state.
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      // we set the slide to keep tract of where we are.

      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      });
    });
  }, [swiper, urls]);
  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300";
  const inactiveStyles = "hidden text-gray-400";
  return (
    <div className={styles.container}>
      <div className="absolute z-50 inset-0 opacity-0 hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
          className={cn(activeStyles, "left-3 transition", {
            [inactiveStyles]: slideConfig.isBeginning,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isBeginning,
          })}
          aria-label="previous image"
        >
          <ChevronLeft className="h-4 w-4 text-zinc-700" />{" "}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
          className={cn(activeStyles, "right-3 transition", {
            // only when we are at the end of the slide we will make the button inactive
            [inactiveStyles]: slideConfig.isEnd,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isEnd,
          })}
          aria-label="next image"
        >
          <ChevronRight className="h-4 w-4 text-zinc-700" />{" "}
        </button>
      </div>
      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span  class="rounded-full transition ${className}"></span>`;
          },
        }}
        className={styles.swiper}
        onSwiper={(swiper) => setSwiper(swiper)}
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
      >
        {urls.map((url, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <Image
              src={url}
              width={310}
              height={248}
              alt="Ad Image"
              style={{
                verticalAlign: "top",
                minHeight: 248,
                objectFit: "cover",
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BoxImageSlider;
