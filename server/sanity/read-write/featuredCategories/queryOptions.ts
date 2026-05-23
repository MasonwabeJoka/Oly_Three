import {queryOptions} from "@tanstack/react-query";
import {getFeaturedCategories} from "./read";

export const featuredCategoriesQueryOptions = queryOptions({
    queryKey: ["featuredCategories"],
    queryFn: getFeaturedCategories,
  });
  