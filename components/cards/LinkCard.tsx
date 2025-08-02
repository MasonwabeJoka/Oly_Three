"use client";
import styles from "./LinkCard.module.scss";
import useIsMobileStore from "@/store/useMobileStore";
import useSidebarStore from "@/store/useSidebarStore";
import useIsDashboardStore from "@/store/isDashboardStore";

interface CardProps {
  className?: string;
  label: string;
  image: string;
}

const LinkCardBox = ({ label, image }: CardProps): JSX.Element => {
  return (
    <article className={styles.cardContainer}>
      <div
        className={styles.imageContainer}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "75%",
          borderRadius: "2.5rem 2.5rem 0rem 0rem",
        }}
      ></div>
      <div className={styles.labelContainer}>
        <div className={styles.labelBackground}>
          <p className={styles.label}>{label}</p>
        </div>
      </div>
    </article>
  );
};

export default LinkCardBox;
