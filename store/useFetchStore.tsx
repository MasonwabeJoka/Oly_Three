import { create } from "zustand";
import { Ad } from "@/sanityTemp/Types/Ad";
import {
  PartialAd,
  PartialAdSchema,
} from "@/sanityTemp/Types/PartialSchemas/AdPartial";
import { fetchAds } from "@/sanityTemp/actions/fetchAds";
import { FetchAdsParams } from "@/sanityTemp/actions/fetchAds";

interface FetchAdStore {
  ads: PartialAd[];
  imageUrls: string[];
  hasMore: boolean;
  fetchAds: (params: FetchAdsParams) => Promise<void>;
}

export const useFetchAdStore = create<FetchAdStore>((set) => ({
  ads: [],
  imageUrls: [],
  hasMore: true,
  fetchAds: async (
    params: FetchAdsParams = {
      page: 1,
      limit: 4,
      offset: 1,
      category: "",
      sortOrder: "asc",
      sortBy: "",
    }
  ) => {
    const { limit, page, offset, category, sortOrder, sortBy } = params;
    try {
      const { ads, hasMore } = await fetchAds({
        limit,
        page,
        offset,
        category,
        sortBy,
        sortOrder,
      });
      set((state) => {
        const newAds = ads.filter(
          (ad) => !state.ads.some((existingAd) => existingAd._id === ad._id)
        );
        return { ads: [...state.ads, ...newAds], hasMore };
      });
    } catch (error) {
      console.error("Error fetching ads:", error);
      throw new Error("Failed to fetch ads");
    }
  },
}));

export const useFetchAdStorePaginated = create<FetchAdStore>((set) => ({
  ads: [],
  imageUrls: [],
  hasMore: true,
  fetchAds: async (
    params: FetchAdsParams = {
      page: 0,
      limit: 4,
      offset: 0,
      category: "",
      sortOrder: "asc",
      sortBy: "",
    }
  ) => {
    const { limit, page, offset, category, sortOrder, sortBy } = params;
    try {
      const { ads, hasMore } = await fetchAds({
        limit,
        page,
        offset,
        category,
        sortBy,
        sortOrder,
      });
      set((state) => {
        const newAds = ads.filter(
          (ad) => !state.ads.some((existingAd) => existingAd._id === ad._id)
        );
        return { ads: [...newAds], hasMore };
      });
    } catch (error) {
      console.error("Error fetching ads:", error);
      throw new Error("Failed to fetch ads");
    }
  },
}));
