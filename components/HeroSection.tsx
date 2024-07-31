import Image from "next/image";
import styles from "./HeroSection.module.scss";
import HeroSectionSearch from "@/components/HeroSectionSearch";

const HeroSection = () => {
  return (
    <div className={styles.mainSection}>
      <div className={styles.star}>
        <Image
        src="/brandNew.svg"
        height={100}
        width={100}
        alt="star"
        />
      </div>
      <h1 className={styles.mainTitle}>
        Welcome to South Africa's hub for buying and selling. Oly is a
        modern marketplace. The future of classifieds.
      </h1>
      {/* <h1 className={styles.mainTitle}>
        Welcome to South Africa's brand new hub for buying and selling. Oly is a
        modern marketplace. The future of classifieds.
      </h1> */}
      <div className={styles.heroSectionSearchContainer}>
        <HeroSectionSearch />
      </div>
    </div>
  );
};

export default HeroSection;
