import styles from "./ListingCardSkeleton.module.scss";
import useIsMobileStore from "@/store/useMobileStore";
import useSidebarStore from "@/store/useSidebarStore";
import useIsDashboardStore from "@/store/isDashboardStore";

const PORTRAIT_CARD_SIZE= {
  regular: {
    large: `${styles.largePortrait}`,
    standard: `${styles.standardPortrait}`,
    small: `${styles.smallPortrait}`,
    "": "",
  },

  dashboard: {
    large: `${styles.largeDashboardPortrait}`,
    standard: `${styles.standardDashboardPortrait}`,
    small: `${styles.smallDashboardPortrait}`,
    "": "",
  },
};
const LANDSCAPE_CARD_SIZE= {
  regular: {
    large: `${styles.largeLandscape}`,
    standard: `${styles.standardLandscape}`,
    small: `${styles.smallLandscape}`,
    "": "",
  },

  dashboard: {
    large: `${styles.largeDashboardLandscape}`,
    standard: `${styles.standardDashboardLandscape}`,
    small: `${styles.smallDashboardLandscape}`,
    "": "",
  },
};

type PortraitSizeProps = {
  cardSize: keyof typeof PORTRAIT_CARD_SIZE.regular | keyof typeof PORTRAIT_CARD_SIZE.dashboard;
};
type LandscapeSizeProps = {
  cardSize: keyof typeof LANDSCAPE_CARD_SIZE.regular | keyof typeof LANDSCAPE_CARD_SIZE.dashboard;
};

type SkeletonProps = {
  orientation: "landscape" | "portrait";
  cardSize: "large" | "standard" | "small";
  isDashboard?: boolean;
};

const LandscapeListingCard: React.FC<LandscapeSizeProps> = ({ cardSize }) => {

  const isDashboard = useIsDashboardStore((state) => state.isDashboard);

  const cardStyle = isDashboard
    ? LANDSCAPE_CARD_SIZE.dashboard[cardSize]
    : LANDSCAPE_CARD_SIZE.regular[cardSize];

  return <div className={`${cardStyle} ${styles.landscapeAdContainer}`}></div>;
};

const PortraitListingCard: React.FC<PortraitSizeProps> = ({ cardSize }) => {
  const isDashboard = useIsDashboardStore((state) => state.isDashboard);

  const cardStyle = isDashboard
    ? PORTRAIT_CARD_SIZE.dashboard[cardSize]
    : PORTRAIT_CARD_SIZE.regular[cardSize];
  return <div className={`${cardStyle} ${styles.portraitAdContainer}`}></div>;
};

const ListingCardSkeleton: React.FC<SkeletonProps> = ({
  orientation,
  cardSize,
}) => {
  return (
    <div className={styles.container}>
      {orientation === "landscape" ? (
        <LandscapeListingCard cardSize={cardSize} />
      ) : (
        <PortraitListingCard cardSize={cardSize} />
      )}
    </div>
  );
};

export default ListingCardSkeleton;
