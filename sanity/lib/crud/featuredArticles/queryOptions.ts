import {queryOptions} from "@tanstack/react-query";
import { getFeaturedArticles } from "./data";

export const featuredArticlesQueryOptions = queryOptions({
    queryKey: ["featuredArticles"],
    queryFn: getFeaturedArticles,
  });
  