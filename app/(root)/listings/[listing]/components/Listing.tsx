"use client";
import React, { useEffect, useState } from "react";
import { Ad } from "@/sanity/Types/Ad";
import ListingPageContent from "./ListingPageContent";
import useSidebarStore from "@/store/useSidebarStore";


type ListingProps = {
  params: {
    listing: string;
  };
};

const Listing: React.FC<ListingProps> = ({ params }) => {
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

  return isClient && <ListingPageContent ad={ad} />;
};

export default Listing;