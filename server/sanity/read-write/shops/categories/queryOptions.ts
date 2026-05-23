import {queryOptions} from "@tanstack/react-query";
import { getShopCategories } from "./read";

export const shopCategoriesQueryOptions = queryOptions({
    queryKey: ["shopCategories"],
    queryFn: getShopCategories,
  });