import { useEffect, RefObject } from "react";

export function useScrollAdjustments({
  filtersRef,
  tabsContainerRef,
  listingsRef,
  expanded,
  currentScreenSize,
  setOptionsWidth,
  setAltWidth,
	}: {
	  filtersRef: RefObject<HTMLDivElement>;
	  tabsContainerRef: RefObject<HTMLDivElement>;
	  listingsRef: RefObject<HTMLDivElement>;
	  expanded: boolean;
	  currentScreenSize: number;
	  setOptionsWidth: (value: string) => void;
	  setAltWidth: (value: number) => void;
	}) {
  useEffect(() => {
    const handleScroll = () => {
      if (!filtersRef.current || !tabsContainerRef.current || !listingsRef.current) return;
      if (currentScreenSize > 1382) {
        const filtersRect = filtersRef.current.getBoundingClientRect();
        const sortingRect = tabsContainerRef.current.getBoundingClientRect();
        const listingsRect = listingsRef.current.getBoundingClientRect();
        if (!expanded && listingsRect.top <= sortingRect.bottom) {
          setOptionsWidth("81.6rem");
          setAltWidth(1360);
        }
        if (listingsRect.top > filtersRect.bottom) {
          setOptionsWidth("57.24rem");
          setAltWidth(954);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expanded, currentScreenSize, setOptionsWidth, setAltWidth]);
}