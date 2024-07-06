import styles from "./NavButtons.module.scss";
import Button from "@/components/Buttons";
import Image from "next/image";
import { useSwiper } from "swiper/react";

const NavButtons = () => {
  const swiper = useSwiper();
 
  return (
    <div className={styles.container}>
      <div className={styles.prev}>
        <Button
          className={styles.button}
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
          buttonSize="standard"
          type="button"
          name="nav-prev-btn"
          ariaLabel="Nav Previous Button"
          autoFocus={false}
          disabled={false}
          onClick={() => swiper.slidePrev()}
        />
      </div>
      <div className={styles.next}>
        <Button
          className={styles.button}
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
          buttonSize="standard"
          type="button"
          name="nav-next-btn"
          ariaLabel="Nav Next Button"
          autoFocus={false}
          disabled={false}
          onClick={() => swiper.slideNext()}
        />
      </div>
    </div>
  );
};

export default NavButtons;
