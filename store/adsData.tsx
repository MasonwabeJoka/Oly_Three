import { create } from "zustand";
import { Ad } from "@/sanity/Types/Ad";
import { fetchAds } from "@/sanity/actions/adsActions";

interface FetchAdStore {
  adsData: Ad[];
  imageUrls: string[];
  fetchAds: () => Promise<void>;
}

export const useFetchAdStore = create<FetchAdStore>((set) => ({
  adsData: [],
  imageUrls: [],
  fetchAds: async () => {
    const ads = await fetchAds();
    set({ adsData: ads });
    const allImageUrls = ads.flatMap((ad) =>
      ad.images.map((image) => image.url)
    );
    set({ imageUrls: allImageUrls });
  },
}));


interface CreateAdState {
  adsData: Partial<Ad>;
  setadsData: (data: Partial<Ad>) => void;
}

export const useCreateAdStore = create<CreateAdState>((set) => ({
  adsData: {},
  setadsData: (data) => set({ adsData: data }),
}));

