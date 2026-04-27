"use client";
import styles from "./Locations.module.scss";
import Link from "next/link";
import MobileSubcategories from "@/components/MobileSubcategories";
import { useModalStore } from "@/store/modalStore";
import { useState, useEffect } from "react";
import { useBreakpoint } from "@/store/useBreakpointStore";

interface LocationItem {
  _id: string;
  title: string | null;
  slug: { current: string | null } | null;
  secondLevelLocations?: Array<{
    _id: string;
    title: string | null;
    slug: { current: string | null } | null;
  }> | null;
  thirdLevelLocations?: Array<{
    _id: string;
    title: string | null;
    slug: { current: string | null } | null;
  } | null> | null;
}

export type LocationsProps = {
  locations: LocationItem[] | null | undefined;
};

const Locations = ({ locations }: LocationsProps) => {
  const [isClient, setIsClient] = useState(false);
  const [totalVisibleLocations, setVisibleLocations] = useState<
    Record<string, number>
  >({});
  const { isMobile, isTablet, currentScreenSize } = useBreakpoint();
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );

  const LOCATIONS_TO_SHOW = 6;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleContainerClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
  };

  const handleToggleLocations = (
    id: string,
    numberOfCurrentlyVisible: number,
    totalCount: number
  ) => {
    setVisibleLocations((prev) => {
      const newCurrentlyVisible: Record<string, number> = {};

      locations?.forEach((location) => {
        if (location._id !== id) {
          newCurrentlyVisible[location._id] = LOCATIONS_TO_SHOW;
        }
      });

      if (numberOfCurrentlyVisible === totalCount) {
        newCurrentlyVisible[id] = LOCATIONS_TO_SHOW;
      } else {
        const nextCount =
          (prev[id] || LOCATIONS_TO_SHOW) + LOCATIONS_TO_SHOW;
        newCurrentlyVisible[id] =
          nextCount >= totalCount ? totalCount : nextCount;
      }

      return newCurrentlyVisible;
    });
  };

  if (!isClient) return null;

  if (isMobile) {
    return (
      <div
        className={styles.container}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "1440px",
          paddingTop: "6rem",
          overflowX: "hidden",
        }}
        onClick={() => setShowCategoriesModal(false)}
      >
        <ul className={styles.locationsContainer}>
          {(locations as any)?.map((locationItem: any, index: any) => {
            const {
              _id: id,
              title,
              secondLevelLocations,
              thirdLevelLocations,
            } = locationItem;

            const sublocations =
              (secondLevelLocations?.length || 0) < 3
                ? thirdLevelLocations
                : secondLevelLocations;

            return (
              <li
                className={styles.mobileSubcategoriesContainer}
                key={`location-mobile-${index}`}
                onClick={handleContainerClick as any}
              >
                <MobileSubcategories
                  options={sublocations || []}
                  category={title || ""}
                  id={id}
                  name={title || ""}
                  ariaLabel={title || ""}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      onClick={() => setShowCategoriesModal(false)}
    >
      <div
        className={styles.locationsContainer}
        onClick={handleContainerClick}
        style={{
          columns: isTablet
            ? currentScreenSize < 1100
              ? "200px 2"
              : "200px 3"
            : "",
          width: isTablet
            ? currentScreenSize < 1100 && isTablet
              ? "47rem"
              : ""
            : "",
        }}
      >
        {(locations as any)?.map((location: any, index: any) => {
          const {
            _id: id,
            title,
            secondLevelLocations,
            thirdLevelLocations,
          } = location;

          const sublocations =
            (secondLevelLocations?.length || 0) < 3
              ? thirdLevelLocations
              : secondLevelLocations;

          const visibleCount =
            totalVisibleLocations[id] || LOCATIONS_TO_SHOW;

          return (
            <div
              key={`location-${index}`}
              className={styles.locationsSection}
            >
              <h4 className={styles.location}>{title}</h4>

              {(sublocations?.length || 0) > 0 &&
                sublocations
                  ?.slice(0, visibleCount)
                  .map((sublocation: any, subIndex: any) =>
                    sublocation && (
                      <div
                        key={`sublocation-${subIndex}`}
                        className={styles.subcategoryContainer}
                      >
                        <Link
                          href={`/location/${sublocation?.slug?.current}`}
                        >
                          <p className={styles.subcategory}>
                            {sublocation?.title &&
                            sublocation.title.length > 20
                              ? `${sublocation.title.slice(0, 60)}`
                              : sublocation?.title}
                          </p>
                        </Link>
                      </div>
                    )
                  )}

              {!sublocations && (
                <div className={styles.subcategoryContainer}>
                  <Link href={`/location/${location?.slug?.current || ""}`}>
                    <p className={styles.subcategory}>
                      {(location?.title?.length || 0) > 20
                        ? `${location?.title?.slice(0, 60)}`
                        : location?.title}
                    </p>
                  </Link>
                </div>
              )}

              {(sublocations?.length || 0) > LOCATIONS_TO_SHOW && (
                <div
                  className={styles.showMoreContainer}
                  onClick={() =>
                    handleToggleLocations(
                      id,
                      visibleCount,
                      sublocations?.length || 0
                    )
                  }
                >
                  <p className={styles.more}>
                    {visibleCount === (sublocations?.length || 0)
                      ? "Show Less..."
                      : "Show More..."}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Locations;