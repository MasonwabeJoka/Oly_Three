"use client";
import { useEffect, useState } from "react";
import useArticlesStore from "@/store/articlesStore";
import ListingsCollage from "@/components/ListingsCollage";
import ListingsExpanded from "@/components/ListingsExpanded";
import Tabs from "@/components/Tabs";
import useSidebarStore from "@/store/useSidebarStore";
import useIsDashboardStore from "@/store/isDashboardStore";
import { useResponsive } from "@/store/useResponsive";
import useFeedStore from "@/store/feedStore";
import styles from "./LikedAds.module.scss";

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
  }, [setIsFeedOpen]);

  useEffect(() => {
    getAvatars();
  }, [getAvatars]);

  const changeViews = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <div className={styles.sortingButtonsContainer} id="sortingButtons">
        <Tabs
          tabs={[
            "Select All",
            "Delete",
            expanded ? "Collage View" : "Expanded View",
          ]}
          condition={!expanded}
          width={954}
          collageViewWidth={988}
          dashboard
          onClickHandlers={[() => {}, () => {}, changeViews]}
        />
      </div>
      {!isMobile && <div className={styles.fixedDiv}></div>}
      <div className={styles.listings}>
        {expanded ? (
          <ListingsExpanded
            category="all"
            listings={[]}
            isDeletable={true}
            isDashboard={true}
            limit={10}
            sortBy="postedOn"
            sortOrder="desc"
          />
        ) : (
          <ListingsCollage
            category="all"
            listings={[]}
            isDeletable={true}
            isDashboard={true}
            sortBy="postedOn"
            sortOrder="desc"
          />
        )}
      </div>
    </>
  );
};

export default LikedAds;
