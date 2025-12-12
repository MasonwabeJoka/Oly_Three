'use client'
import { RefObject, useEffect } from "react";
//https://usehooks-ts.com/react-hook/use-on-click-outside
type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | RefObject<T>[],
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const refs = Array.isArray(ref) ? ref : [ref];
      const isClickInside = refs.some(r => r?.current?.contains((event?.target as Node) || null));
      if (isClickInside) {
        return;
      }
      

      // Skip if click is on scrollbar (approximation)
      if (event instanceof MouseEvent) {
        const { clientX, clientY } = event;
        const threshold = 15; // Pixels from edge to consider as scrollbar
        if (
          clientX > window.innerWidth - threshold ||
          clientY > window.innerHeight - threshold
        ) {
          return;
        }
      }

      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};