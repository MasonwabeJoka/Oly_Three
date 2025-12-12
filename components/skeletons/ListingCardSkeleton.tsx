"use client";
import styles from "./ListingCardSkeleton.module.scss";
import useIsMobileStore from "@/store/useMobileStore";
import useSidebarStore from "@/store/useSidebarStore";
import useIsDashboardStore from "@/store/isDashboardStore";

const BOX_CARD_SIZE = {
  regular: {
    large: `${styles.largeBox}`,
    standard: `${styles.standardBox}`,
    small: `${styles.smallBox}`,
    "": "",
  },

  dashboard: {
    large: `${styles.largeDashboardBox}`,
    standard: `${styles.standardDashboardBox}`,
    small: `${styles.smallDashboardBox}`,
    "": "",
  },
};
const EXPANDED_CARD_SIZE = {
  regular: {
    large: `${styles.largeExpanded}`,
    standard: `${styles.standardExpanded}`,
    small: `${styles.smallExpanded}`,
    "": "",
  },

  dashboard: {
    large: `${styles.largeDashboardExpanded}`,
    standard: `${styles.standardDashboardExpanded}`,
    small: `${styles.smallDashboardExpanded}`,
    "": "",
  },
};

type BoxSizeProps = {
  cardSize:
    | keyof typeof BOX_CARD_SIZE.regular
    | keyof typeof BOX_CARD_SIZE.dashboard;
};
type ExpandedSizeProps = {
  cardSize:
    | keyof typeof EXPANDED_CARD_SIZE.regular
    | keyof typeof EXPANDED_CARD_SIZE.dashboard;
};

type SkeletonProps = {
  orientation: "expanded" | "box";
  cardSize: "large" | "standard" | "small";
  isDashboard?: boolean;
};

const ExpandedListingCard: React.FC<ExpandedSizeProps> = ({ cardSize }) => {
  const isDashboard = useIsDashboardStore((state) => state.isDashboard);

  const cardStyle = isDashboard
    ? EXPANDED_CARD_SIZE.dashboard[cardSize]
    : EXPANDED_CARD_SIZE.regular[cardSize];

  return <div className={`${cardStyle} ${styles.expandedAdContainer}`}></div>;
};

const BoxListingCard: React.FC<BoxSizeProps> = ({ cardSize }) => {
  const isDashboard = useIsDashboardStore((state) => state.isDashboard);

  const cardStyle = isDashboard
    ? BOX_CARD_SIZE.dashboard[cardSize]
    : BOX_CARD_SIZE.regular[cardSize];
  return <div className={`${cardStyle} ${styles.boxAdContainer}`}></div>;
};

const ListingCardSkeleton: React.FC<SkeletonProps> = ({
  orientation,
  cardSize,
}) => {
  return (
    <div className={styles.container}>
      {orientation === "expanded" ? (
        <ExpandedListingCard cardSize={cardSize} />
      ) : (
        <BoxListingCard cardSize={cardSize} />
      )}
    </div>
  );
};

export default ListingCardSkeleton;
