import {queryOptions} from "@tanstack/react-query";
import { getListings } from "./data";
import { getFeaturedListings } from "../featuredListings/data";

export const listingsQueryOptions = (params: {
  searchTerm?: string;
  locationSearch?: string;
  page?: number;
  pageSize?: number;
}) => queryOptions({
    queryKey: ["listings", params],
    queryFn: () => getListings({
      searchTerm: params.searchTerm || "",
      locationSearch: params.locationSearch || "",
      page: params.page || 1,
      pageSize: params.pageSize || 10,
    }),
  });

export const featuredListingsQueryOptions = (page: number = 1) => queryOptions({
  queryKey: ["featuredListings", page],
  queryFn: () => getFeaturedListings(page),
});
  