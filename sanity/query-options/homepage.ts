import { queryOptions } from "@tanstack/react-query";
import { getFeaturedServicesSection } from "@/server/sanity/services/homepage";
import { getMoreFromOly } from "@/server/sanity/services/homepage";
import { getFeaturedCategories } from "@/server/sanity/services/categories";

export const featuredServicesSectionQueryOptions = queryOptions({
  queryKey: ["featuredServicesSection"],
  queryFn: getFeaturedServicesSection,
});

export const moreFromOlyQueryOptions = queryOptions({
  queryKey: ["moreFromOly"],
  queryFn: getMoreFromOly,
});

export const featuredCategoriesQueryOptions = queryOptions({
  queryKey: ["featuredCategories"],
  queryFn: getFeaturedCategories,
});
