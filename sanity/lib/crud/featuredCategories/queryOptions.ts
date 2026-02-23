import {queryOptions} from "@tanstack/react-query";
import {getFeaturedCategories} from "./data";

export const featuredCategoriesQueryOptions = queryOptions({
    queryKey: ["featuredCategories"],
    queryFn: getFeaturedCategories,
  });
  