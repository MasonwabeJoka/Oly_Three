"use client";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import useArticlesStore from "@/store/articlesStore";
import ListingsCollage from "@/components/ListingsCollage";
import ListingsExpanded from "@/components/ListingsExpanded";
import Tabs from "@/components/Tabs";
import useSidebarStore from "@/store/useSidebarStore";
import useIsDashboardStore from "@/store/isDashboardStore";
import MaxWidthWrapper from "@/components/utilComponents/MaxWidthWrapper";
import { useResponsive } from "@/store/useResponsive";
import useFeedStore from "@/store/feedStore";

const LikedAds = () => {
  const avatars = useArticlesStore((state) => state.avatars);
  const getAvatars = useArticlesStore((state) => state.getAvatars);
  const [expanded, setExpanded] = useState(true);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  const isDashboard = useIsDashboardStore((state) => state.isDashboard);
  const setIsDashboard = useIsDashboardStore((state) => state.setIsDashboard);
  const isMobile = useResponsive("mobile", isSidebarOpen);
  const isFeedOpen = useFeedStore((state) => state.isFeedOpen);
  const setIsFeedOpen = useFeedStore((state) => state.setIsFeedOpen);

  useEffect(() => {
    setIsFeedOpen(true);
  }, []);

  useEffect(() => {
    getAvatars();
  }, [getAvatars]);

  const changeViews = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <MaxWidthWrapper className={styles.maxWidthWrapper}>
      <div className={styles.container}>
        <h4 className={styles.title}>Liked Ads</h4>

        <div className={styles.listingsContainer}>
          <div className={styles.sortingButtonsContainer} id="sortingButtons">
            <Tabs
              tabs={[
                "Select All",
                "Delete",
                expanded ? "Collage View" : "Expanded View",
              ]}
              condition={!expanded}
              width={954}
              altWidth={988}
              dashboard
              onClickHandlers={[undefined, undefined, changeViews]}
            />
          </div>
          {!isMobile && <div className={styles.fixedDiv}></div>}
          <div className={styles.listings}>
            {expanded ? (
              <ListingsExpanded
                avatars={avatars}
                isDeletable={true}
                isFeed={false}
                isDashboard={true}
              />
            ) : (
              <ListingsCollage isDeletable={true} isDashboard={true} />
            )}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default LikedAds;
