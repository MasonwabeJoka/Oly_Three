"use client";
import styles from "./ListingCardSkeletons.module.scss";
import ListingCardSkeleton from "./ListingCardSkeleton";
interface ListingCardSkeletonsProps {
  isDashboard?: boolean;
  skeletonCount?: number;
  orientation?: "expanded" | "box";
  cardSize?: "large" | "standard" | "small";
}

const ListingCardSkeletons = ({
  isDashboard,
  skeletonCount = 10,
  orientation = "box",
  cardSize = "standard",
}: ListingCardSkeletonsProps) => {
  
  const containerStyles = {
    display: "flex" as const,
    flexDirection:
      orientation === "expanded" ? ("column" as const) : ("row" as const),
    justifyContent: orientation === "expanded" ? "unset" : "center",
    alignItems: orientation === "expanded" ? "center" : "unset",
    flexWrap: "wrap" as const,
    width: "100vw",
    gap: "2rem",
  };

  const skeletons = Array(skeletonCount)
    .fill(null)
    .map((_, i) => (
      <div key={i} className={styles.skeletonContainer}>
        <div className={styles.skeleton}>
          <ListingCardSkeleton orientation={orientation} cardSize={cardSize} />
        </div>
      </div>
    ));
  return (
    <div
      className={styles.listingsContainer}
      style={{
        maxWidth: isDashboard ? "59.625rem" : "95vw",
        ...containerStyles,
      }}
    >
      {skeletons || []}
    </div>
  );
};

export default ListingCardSkeletons;
