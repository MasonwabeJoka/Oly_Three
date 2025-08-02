"use client";
import React, { useEffect, useState } from "react";
import { Ad } from "@/sanityTemp/Types/Ad";
import ListingPageContent from "./ListingPageContent";
import useSidebarStore from "@/store/useSidebarStore";
import { usePathname } from "next/navigation";

export type ListingProps = {
  params: {
    listing: string;
  };
};

const ListingClient: React.FC<ListingProps> = ({ params }) => {
  const pathname = usePathname(); // Get the current pathname
  const listing = React.use(params).listing;
  const [ad, setAd] = useState<Ad | null>(null);
  const [isClient, setIsClient] = useState(false);
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);

  useEffect(() => {
    setIsClient(true);
    setIsSidebarOpen(false);
  }, []);

  useEffect(() => {
    const getAd = async () => {
      const fetchedAd = await fetchAd(listing);
      setAd(fetchedAd ? fetchedAd : null);
    };
    getAd();
  }, [listing]);

  useEffect(() => {
    if (isClient) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, isClient]);

  return isClient && <ListingPageContent ad={ad} />;
};

export default ListingClient;
