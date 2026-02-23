import { create } from "zustand";
import { variables } from "./../utils/typescript-variables/variables";

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

const useBreakpointStore = create<State>((set, get) => {
  const state = initialState();

  // Initialize client-side values when the store is first accessed
  const initializeClientValues = () => {
    if (typeof window !== "undefined" && get().currentScreenSize === 0) {
      const width = window.innerWidth;
      set({
        currentScreenSize: width,
        isMobile: width >= variables.minMobile && width <= variables.maxMobile,
        isTablet: width >= variables.minTablet && width <= variables.maxTablet,
        isSmallDesktop: width >= variables.minSmallDesktop && width <= variables.maxSmallDesktop,
        isLargeDesktop: width >= variables.minLargeDesktop && width <= variables.maxLargeDesktop,
        isExtraLargeDesktop: width >= variables.minExtraLargeDesktop,
      });
    }
  };

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

    // Initialize immediately when on client
    setTimeout(initializeClientValues, 0);
  }

  return {
    ...state,
    setCurrentScreenSize: (size) => {
      initializeClientValues(); // Ensure client values are set
      set({
        currentScreenSize: size,
        isMobile: size >= variables.minMobile && size <= variables.maxMobile,
        isTablet: size >= variables.minTablet && size <= variables.maxTablet,
        isSmallDesktop: size >= variables.minSmallDesktop && size <= variables.maxSmallDesktop,
        isLargeDesktop: size >= variables.minLargeDesktop && size <= variables.maxLargeDesktop,
        isExtraLargeDesktop: size >= variables.minExtraLargeDesktop,
      });
    },
  };
});

// Custom hook that ensures the store is initialized on the client
export const useBreakpoint = () => {
  const store = useBreakpointStore();

  // Trigger initialization check when the hook is called
  if (typeof window !== "undefined" && store.currentScreenSize === 0) {
    store.setCurrentScreenSize(window.innerWidth);
  }

  return store;
};

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