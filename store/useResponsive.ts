import { useMediaQuery } from 'react-responsive';


type ScreenSize = 'desktop' | 'tablet' | 'mobile';

// Define a function that returns media queries based on the sidebar state
const getMediaQuery = (screenSize: ScreenSize, isSidebarOpen: boolean): string => {
  const sizeMap = {
    desktop: isSidebarOpen ? '(min-width: 39.9375em)' : '(min-width: 64em)',
    tablet: isSidebarOpen 
              ? '(min-width: 40em) and (max-width: 63.9375em)' 
              : '(min-width: 48em) and (max-width: 63.9375em',
    mobile: '(max-width: 39.9375em)',
  };

  return sizeMap[screenSize];
};

export const useResponsive = (screenSize: ScreenSize, isSidebarOpen: boolean) => {
  const query = getMediaQuery(screenSize, isSidebarOpen);
  const isMatch = useMediaQuery({ query });
  return isMatch;
};

/*
  const isDesktop = useResponsive("desktop", isSidebarOpen);
  const isTablet = useResponsive("tablet", isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);
*/
