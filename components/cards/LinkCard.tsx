"use client";
import styles from "./LinkCard.module.scss";
import useIsMobileStore from "@/store/useMobileStore";
import useSidebarStore from "@/store/useSidebarStore";
import useIsDashboardStore from "@/store/isDashboardStore";

interface CardProps {
  className?: string;
  label: string;
  image: string;
  cardSize:
    | keyof typeof CARD_SIZE.regular
    | keyof typeof CARD_SIZE.feed
    | keyof typeof CARD_SIZE.mobile
    | keyof typeof CARD_SIZE.dashboard;
}
const CARD_SIZE = {
  regular: {
    large: `${styles.large}`,
    standard: `${styles.standard}`,
    small: `${styles.small}`,
    "": "",
  },
  feed: {
    large: `${styles.largeFeed}`,
    standard: `${styles.standardFeed}`,
    small: `${styles.smallFeed}`,
    "": "",
  },
  mobile: {
    large: `${styles.largeMobile}`,
    standard: `${styles.standardMobile}`,
    small: `${styles.smallMobile}`,
    "": "",
  },
  dashboard: {
    large: `${styles.largeDashboard}`,
    standard: `${styles.standardDashboard}`,
    small: `${styles.smallDashboard}`,
    "": "",
  },
};

const LinkCardBox = ({ label, image, cardSize }: CardProps): JSX.Element => {

  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isDashboard = useIsDashboardStore((state) => state.isDashboard);

  const cardStyle = isDashboard
    ? CARD_SIZE.dashboard[cardSize]
    : isSidebarOpen
    ? CARD_SIZE.feed[cardSize]
    : CARD_SIZE.regular[cardSize];

  return (
    <article className={`${cardStyle} ${styles.cardContainer}`}>
      <div
        className={
          cardSize === "standard"
            ? styles.largeImageContainer
            : styles.imageContainer
        }
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
      <div
        className={`${styles.labelContainer} ${
          cardSize === "large"
            ? isSidebarOpen
              ? styles.largeLabelContainer
              : styles.largeLabelContainer
            : isSidebarOpen
            ? styles.standardLabelContainerFeed
            : styles.standardLabelContainer
        }`}
      >
        <div className={styles.labelBackground}>

        <p className={styles.label}>{label}</p>
        </div>
      </div>
    </article>
  );
};

export default LinkCardBox;
