"use client";
import styles from "./Feed.module.scss";
import { useState } from "react";
import OlyFeed from "@/features/oly-feed/OlyFeed";
import Button from "@/components/Buttons";
import useSidebarStore from "@/store/useSidebarStore";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import Icon from "./Icon";

const Feed = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // const openOlyFeed = () => {
  //   setIsSidebarOpen(true);
  // };

  const closeOlyFeed = () => {
    setIsSidebarOpen(false);
  };
  return (
    <>
      {pathname !== "/listing" && (
        <div
          className={`${styles.OlyFeed} ${
            isSidebarOpen ? styles.open : styles.closed
          }`}
        >
          <Sheet
            modal={false}
            // open={open} and onOpenChange are to make sure when the sheet is open you can click outside of it without closing it
            open={open}
            onOpenChange={(open) => {
              // Only change the state if `open` is true or another condition you define
              if (open) setOpen(open);
            }}
          >
            <SheetTrigger>
              <Icon
                className={styles.openFeed}
                // ariaHidden={true}
                src="/icons/send.svg"
                alt="Open Feed"
                width={40}
                height={40}
              />
            </SheetTrigger>
            
            <SheetContent className="w-[400px] sm:w-[8000px]" side="left">
              <SheetHeader>
                <SheetTitle>Oly Feed</SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </>
  );
};

export default Feed;
