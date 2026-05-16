import {queryOptions} from "@tanstack/react-query";
import { getShopCategories } from "./data";

export const shopCategoriesQueryOptions = queryOptions({
    queryKey: ["shopCategories"],
    queryFn: getShopCategories,
  });