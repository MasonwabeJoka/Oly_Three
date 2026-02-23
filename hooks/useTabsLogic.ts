import { useState, useRef } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

type Option = { id: number; result: string | string[] };

interface UseTabsLogicProps {
  getOptions: (index: number) => Option[] | null;
}

export function useTabsLogic({ getOptions }: UseTabsLogicProps) {
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef as React.RefObject<HTMLElement>, () => {
    console.log("useTabsLogic: clicked outside, closing dropdown");
    setActiveTabIndex(null);
  });

  const handleTabClick = (index: number) => {
    if (activeTabIndex === index) {
      setActiveTabIndex(null);
    } else {
      const options = getOptions(index);
      if (options && options.length > 0) {
        setActiveTabIndex(index);
      }
    }
  };

  const handleOptionSelect = (option: Option) => {
    console.log("useTabsLogic: selected option =", option);
    setActiveTabIndex(null);
  };

  return {
    activeTabIndex,
    setActiveTabIndex,
    containerRef,
    handleTabClick,
    handleOptionSelect,
  };
}