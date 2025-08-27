import styles from "./ListingCardSkeleton.module.scss";
import useIsMobileStore from "@/store/useMobileStore";
import useSidebarStore from "@/store/useSidebarStore";
import useIsDashboardStore from "@/store/isDashboardStore";

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

  dashboard: {
    large: `${styles.largeDashboard}`,
    standard: `${styles.standardDashboard}`,
    small: `${styles.smallDashboard}`,
    "": "",
  },
};

type SizeProps = {
  cardSize:
    | keyof typeof CARD_SIZE.regular
    | keyof typeof CARD_SIZE.feed
    | keyof typeof CARD_SIZE.dashboard;
};

type SkeletonProps = {
  orientation: "landscape" | "portrait";
  cardSize: "large" | "standard" | "small";
  isDashboard?: boolean;
};

const LandscapeListingCard: React.FC<SizeProps> = ({ cardSize, isDashboard }) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  // const isDashboard = useIsDashboardStore((state) => state.isDashboard);

  const cardStyle = isDashboard
    ? CARD_SIZE.dashboard[cardSize]
    : isSidebarOpen
      ? CARD_SIZE.feed[cardSize]
      : CARD_SIZE.regular[cardSize];

  return <div className={`${cardStyle} ${styles.landscapeAdContainer}`}></div>;
};

const ProfileListingCard: React.FC<SizeProps> = ({ cardSize, isDashboard }) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  const cardStyle = isDashboard
    ? CARD_SIZE.dashboard[cardSize]
    : isSidebarOpen
      ? CARD_SIZE.feed[cardSize]
      : CARD_SIZE.regular[cardSize];
  return <div className={`${cardStyle} ${styles.profileAdContainer}`}></div>;
};

const ListingCardSkeleton: React.FC<SkeletonProps> = ({ orientation, cardSize }) => {
  return (
    <div className={styles.container}>
      {orientation === "landscape" ? (
        <LandscapeListingCard cardSize={cardSize} />
      ) : (
        <ProfileListingCard cardSize={cardSize} />
      )}
    </div>
  );
};

export default ListingCardSkeleton;
