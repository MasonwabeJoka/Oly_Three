import React, { useEffect } from "react";
import { Ad } from "@/sanity/Types/Ad";
import useSidebarStore from "@/store/useSidebarStore";
import { fetchAd } from "@/sanity/actions/singleAdActions";

type ClientEffectsProps = {
  listing: string;
  setAd: React.Dispatch<React.SetStateAction<Ad | null>>;
  setIsClient: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const ClientEffects: React.FC<ClientEffectsProps> = ({
  listing,
  setAd,
  setIsClient,
  children,
}) => {
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

  return <>{children}</>;
};

export default ClientEffects;