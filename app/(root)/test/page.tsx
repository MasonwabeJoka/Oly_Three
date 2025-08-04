
"use client";
import { useEffect, useState } from "react";
import useBreakpointStore from "./../../../store/useBreakpointStore";

const MyComponent = () => {
  const { isMobile, isTablet, isSmallDesktop, isLargeDesktop, isExtraLargeDesktop, currentScreenSize } = useBreakpointStore();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if(!isClient) return null;



  
  return (
    <div>
      {isMobile && <p>Mobile view (320px–767px)</p>}
      {isTablet && <p>Tablet view (768px–1199px)</p>}
      {isSmallDesktop && <p>Small Desktop view (1200px–1439px)</p>}
      {isLargeDesktop && <p>Large Desktop view (1440px–1951px)</p>}
      {isExtraLargeDesktop && <p>Extra Large Desktop view (1952px+)</p>}
      <p>Current screen width: {currentScreenSize}px</p>
    </div>
  );
};

export default MyComponent;
