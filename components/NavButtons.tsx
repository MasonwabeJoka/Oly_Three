"use client";
import styles from "./NavButtons.module.scss";
import Button from "@/components/Buttons";
import Image from "@/components/Image";
import { useSwiper } from "swiper/react";
type Props = {
  size?: "large" | "medium" | "small";
  onClick?: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
};
const NavButtons = ({
  size = "medium",
  onClick,
  autoFocus = false,
  disabled = false,
  className,
}: Props) => {
  const swiper = useSwiper();

  return (
    <div className={styles.container}>
      <div className={styles.prev}>
        <Button
          className={`${className} ${styles.button}`}
          buttonChildren={
            <Image
              src="/icons/left-arrow.png"
              alt="left"
              width={20}
              height={20}
              className={styles.left}
            />
          }
          buttonType="round"
          buttonSize={size}
          type="button"
          name="nav-prev-btn"
          ariaLabel="Nav Previous Button"
          autoFocus={autoFocus}
          disabled={disabled}
          onClick={onClick ?? (() => swiper?.slidePrev())}
        />
      </div>
      <div className={styles.next}>
        <Button
          className={`${className} ${styles.button}`}
          buttonChildren={
            <Image
              src="/icons/right-arrow.png"
              alt="right"
              width={20}
              height={20}
              className={styles.right}
            />
          }
          buttonType="round"
          buttonSize={size}
          type="button"
          name="nav-next-btn"
          ariaLabel="Nav Next Button"
          autoFocus={autoFocus}
          disabled={disabled}
          onClick={onClick ?? (() => swiper?.slideNext())}
        />
      </div>
    </div>
  );
};

export default NavButtons;
