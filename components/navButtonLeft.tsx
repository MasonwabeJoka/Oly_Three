import Image from "next/image";
import Button from "./Buttons";
import styles from "./NavButtonLeft.module.scss";
import { useSwiper } from "swiper/react";

type Props = {
  size: "large" | "standard" | "small";
  onClick?: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
};

const NavButtonLeft = ({
  size,
  onClick,
  autoFocus = false,
  disabled = false,
  className,
}: Props) => {
  const swiper = useSwiper();

  return (
    <div className={styles.leftArrowContainer}>
      <Button
        className={`${className} ${styles.leftArrow}`}
        buttonChildren={
          <Image
            src="/icons/chevronLeft.png"
            alt="left"
            width={16}
            height={16}
            className={styles.left}
          />
        }
        buttonType="round"
        buttonSize={size}
        name="left-arrow-btn"
        type="button"
        ariaLabel="Left Arrow Button"
        autoFocus={autoFocus}
        disabled={disabled}
        onClick={onClick ?? (() => swiper?.slidePrev())}
      />
    </div>
  );
};

export default NavButtonLeft;
