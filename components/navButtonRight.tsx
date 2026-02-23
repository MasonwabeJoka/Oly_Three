import Image from "@/components/Image";
import Button from "./Buttons";
import styles from "./NavButtonRight.module.scss";
import { useSwiper } from "swiper/react";

type Props = {
  size: "large" | "medium" | "small";
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
            src="/icons/right-arrow.png"
            alt="right"
            width={20}
            height={20}
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
