import Image from "@/components/Image";
import Button from "./Button";
import styles from "./NavButtonLeft.module.scss";
import { useSwiper } from "swiper/react";

type Props = {
  size?: "large" | "medium" | "small";
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
        children={
          <Image
            src="/icons/left-arrow.png"
            alt="left"
            width={20}
            height={20}
            className={styles.left}
          />
        }
        buttonShape="round"
        buttonSize={size}


        ariaLabel="Left Arrow Button"
        autoFocus={autoFocus}
        isDisabled={disabled}
        onClick={onClick ?? (() => swiper?.slidePrev())}
      />
    </div>
  );
};

export default NavButtonLeft;
