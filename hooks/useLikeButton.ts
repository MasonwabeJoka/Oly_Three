import { useState, useEffect } from "react";

interface UseLikeButtonProps {
  isHeartClicked: boolean;
  isHeartHovered: boolean;
  isCardHovered: boolean;
  isLeftNavHovered?: boolean;
  isRightNavHovered?: boolean;
  navClickedRecently?: boolean;
}

interface UseLikeButtonReturn {
  showHeart: boolean;
  showNav: boolean;
  isLeftNavHovered: boolean;
  isRightNavHovered: boolean;
  navClickedRecently: boolean;
  navInteractionOccurred: boolean;
  heartVisibility: { opacity: number; transition: string };
  heartSize: number;
  getImageSrc: () => string;
  setIsLeftNavHovered: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRightNavHovered: React.Dispatch<React.SetStateAction<boolean>>;
  setNavClickedRecently: React.Dispatch<React.SetStateAction<boolean>>;
  setNavInteractionOccurred: React.Dispatch<React.SetStateAction<boolean>>;
  handleNavButtonClick: (
    e: React.MouseEvent,
    direction: "prev" | "next",
    swiper: any
  ) => void;
}

export const useLikeButton = ({
  isHeartClicked,
  isHeartHovered,
  isCardHovered,
  isLeftNavHovered: initialLeftNavHovered = false,
  isRightNavHovered: initialRightNavHovered = false,
  navClickedRecently: initialNavClickedRecently = false,
}: UseLikeButtonProps): UseLikeButtonReturn => {
  const [showHeart, setShowHeart] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [isLeftNavHovered, setIsLeftNavHovered] = useState(initialLeftNavHovered);
  const [isRightNavHovered, setIsRightNavHovered] = useState(initialRightNavHovered);
  const [navClickedRecently, setNavClickedRecently] = useState(initialNavClickedRecently);
  const [navInteractionOccurred, setNavInteractionOccurred] = useState(false);

  // Manage heart visibility
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const isNavHovered = isLeftNavHovered || isRightNavHovered;

    if (navClickedRecently || isNavHovered) {
      setShowHeart(false); // Hide heart during nav click or hover
      timer = setTimeout(() => {
        setNavClickedRecently(false);
        if (isHeartClicked && !isNavHovered) setShowHeart(true); // Reappear clicked heart
      }, 500);
    } else if (isHeartClicked) {
      setShowHeart(true); // Keep clicked heart visible
    } else if (isHeartHovered || (isCardHovered && !navInteractionOccurred)) {
      setShowHeart(true); // Show hover heart only if no nav interaction
      timer = setTimeout(() => {
        setShowHeart(false); // Disappear after 2 seconds if not clicked
      }, 2000);
    } else {
      setShowHeart(false); // Hide if no conditions met
    }

    // Reset nav interaction flag when card hover ends
    if (!isCardHovered) {
      setNavInteractionOccurred(false);
    }

    return () => clearTimeout(timer);
  }, [
    isCardHovered,
    isHeartClicked,
    isHeartHovered,
    isLeftNavHovered,
    isRightNavHovered,
    navClickedRecently,
    navInteractionOccurred,
  ]);

  // Manage navigation visibility
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (
      isCardHovered ||
      isLeftNavHovered ||
      isRightNavHovered ||
      isHeartClicked
    ) {
      setShowNav(true);
    } else {
      timer = setTimeout(() => {
        setShowNav(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isCardHovered, isHeartClicked, isLeftNavHovered, isRightNavHovered]);

  const handleNavButtonClick = (
    e: React.MouseEvent,
    direction: "prev" | "next",
    swiper: any
  ) => {
    e.preventDefault();
    if (direction === "prev") swiper?.slidePrev();
    if (direction === "next") swiper?.slideNext();
    setShowNav(true);
    setShowHeart(false); // Hide heart on nav click
    setNavClickedRecently(true); // Trigger nav click effect
    setNavInteractionOccurred(true); // Mark nav interaction
    if (
      !isHeartClicked &&
      !isHeartHovered &&
      !isLeftNavHovered &&
      !isRightNavHovered
    ) {
      setTimeout(() => {
        setShowNav(false);
      }, 2000);
    }
  };

  const getImageSrc = () => {
    if (isHeartClicked) return "/icons/heart-clicked.svg";
    if (isHeartHovered || (isCardHovered && !navInteractionOccurred))
      return "/icons/heart-hover.svg";
    return "/icons/heart-hover.svg";
  };

  const heartVisibility = {
    opacity: showHeart ? 1 : 0,
    transition: "opacity 0.5s ease",
  };

  const heartSize = isHeartHovered ? 64 : 52;

  return {
    showHeart,
    showNav,
    isLeftNavHovered,
    isRightNavHovered,
    navClickedRecently,
    navInteractionOccurred,
    heartVisibility,
    heartSize,
    getImageSrc,
    setIsLeftNavHovered,
    setIsRightNavHovered,
    setNavClickedRecently,
    setNavInteractionOccurred,
    handleNavButtonClick,
  };
};