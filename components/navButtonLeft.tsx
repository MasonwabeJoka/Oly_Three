import Image from "next/image";
import Button from "./Buttons";
import styles from "./NavButtonLeft.module.scss";
import { useSwiper } from "swiper/react";

type Props = {
  size: "large" | "standard" | "small";
};

const NavButtonLeft = ({ size }: Props) => {
  const swiper = useSwiper();

  return (
    <div className={styles.leftArrowContainer} >
      <Button
        className={styles.leftArrow}
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
        autoFocus={false}
        disabled={false}
        onClick={() => swiper?.slidePrev()}
      />
    </div>
  );
};

export default NavButtonLeft;
