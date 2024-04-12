import styles from "./FeaturesCarousel.module.scss";
import Image from "next/image";
import Button from "@/components/Buttons";
const FeaturesCarousel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
          voluptatibus ipsa quibusdam. Consequuntur dolorum minus quasi
          assumenda adipisci ab, officia maxime reiciendis earum sit labore.
        </h2>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.button}
            buttonChildren="More Information"
            buttonType="normal"
            buttonSize="medium"
            name="more-info-btn"
            type="button"
            ariaLabel="More Information Button"
            autoFocus={false}
            disabled={false}
          />
        </div>
      </div>
      <div className={styles.illustrationContainer}>
        <Image
          className={styles.illustration}
          src="/icons/heart-hover.svg"
          width={400}
          height={400}
          alt="alt"
        />
      </div>
    </div>
  );
};

export default FeaturesCarousel;
