import { create } from "zustand";
import { variables } from "./utils/typescript-variables/variables";

type State = {
  currentScreenSize: number;
  isMobile: boolean;
  isTablet: boolean;
  isSmallDesktop: boolean;
  isLargeDesktop: boolean;
  isExtraLargeDesktop: boolean;
  setCurrentScreenSize: (size: number) => void;
};

const initialState = () => {
  const width = typeof window !== "undefined" ? window.innerWidth : 0;
  return {
    currentScreenSize: width,
    isMobile: width >= variables.minMobile && width <= variables.maxMobile,
    isTablet: width >= variables.minTablet && width <= variables.maxTablet,
    isSmallDesktop: width >= variables.minSmallDesktop && width <= variables.maxSmallDesktop,
    isLargeDesktop: width >= variables.minLargeDesktop && width <= variables.maxLargeDesktop,
    isExtraLargeDesktop: width >= variables.minExtraLargeDesktop,
  };
};

const useBreakpointStore = create<State>((set) => {
  const state = initialState();
  if (typeof window !== "undefined") {
    const debounce = (func: Function, wait: number) => {
      let timeout: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    };
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      set({
        currentScreenSize: width,
        isMobile: width >= variables.minMobile && width <= variables.maxMobile,
        isTablet: width >= variables.minTablet && width <= variables.maxTablet,
        isSmallDesktop: width >= variables.minSmallDesktop && width <= variables.maxSmallDesktop,
        isLargeDesktop: width >= variables.minLargeDesktop && width <= variables.maxLargeDesktop,
        isExtraLargeDesktop: width >= variables.minExtraLargeDesktop,
      });
    }, 100);
    window.addEventListener("resize", handleResize);
    return {
      ...state,
      setCurrentScreenSize: (size) => set({
        currentScreenSize: size,
        isMobile: size >= variables.minMobile && size <= variables.maxMobile,
        isTablet: size >= variables.minTablet && size <= variables.maxTablet,
        isSmallDesktop: size >= variables.minSmallDesktop && size <= variables.maxSmallDesktop,
        isLargeDesktop: size >= variables.minLargeDesktop && size <= variables.maxLargeDesktop,
        isExtraLargeDesktop: size >= variables.minExtraLargeDesktop,
      }),
      destroy: () => window.removeEventListener("resize", handleResize),
    };
  }
  return {
    ...state,
    setCurrentScreenSize: (size) => set({
      currentScreenSize: size,
      isMobile: size >= variables.minMobile && size <= variables.maxMobile,
      isTablet: size >= variables.minTablet && size <= variables.maxTablet,
      isSmallDesktop: size >= variables.minSmallDesktop && size <= variables.maxSmallDesktop,
      isLargeDesktop: size >= variables.minLargeDesktop && size <= variables.maxLargeDesktop,
      isExtraLargeDesktop: size >= variables.minExtraLargeDesktop,
    }),
  };
});

export default useBreakpointStore;


// Example of use:
//import useBreakpointStore from "./useBreakpointStore";

// const MyComponent = () => {
//   const { isMobile, isTablet, isSmallDesktop, isLargeDesktop, isExtraLargeDesktop, currentScreenSize } = useBreakpointStore();

//   return (
//     <div>
//       {isMobile && <p>Mobile view (320px–767px)</p>}
//       {isTablet && <p>Tablet view (768px–1199px)</p>}
//       {isSmallDesktop && <p>Small Desktop view (1200px–1439px)</p>}
//       {isLargeDesktop && <p>Large Desktop view (1440px–1951px)</p>}
//       {isExtraLargeDesktop && <p>Extra Large Desktop view (1952px+)</p>}
//       <p>Current screen width: {currentScreenSize}px</p>
//     </div>
//   );
// };