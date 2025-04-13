import Image from "next/image";
import Button from "./Buttons";
import styles from "./NavButtonRight.module.scss";
import { useSwiper } from "swiper/react";

type Props = {
  size: "large" | "standard" | "small";
  onClick?: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
};
const NavButtonRight = ({
  size,
  onClick,
  autoFocus = false,
  disabled = false,
  className,
}: Props) => {
  const swiper = useSwiper();

  return (
    <div className={styles.rightArrowContainer}>
      <Button
        className={`${className} ${styles.rightArrow}`}
        buttonChildren={
          <Image
            src="/icons/chevronRight.png"
            alt="right"
            width={16}
            height={16}
            className={styles.right}
          />
        }
        buttonType="round"
        buttonSize={size}
        name="right-arrow-btn"
        type="button"
        ariaLabel="Right Arrow Button"
        autoFocus={autoFocus}
        disabled={disabled}
        onClick={onClick ?? (() => swiper?.slideNext())}
      />
    </div>
  );
};

export default NavButtonRight;
