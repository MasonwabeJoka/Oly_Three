import {queryOptions} from "@tanstack/react-query";
import { getFeaturedArticles } from "./read";


export const featuredArticlesQueryOptions = queryOptions({
    queryKey: ["featuredArticles"],
    queryFn: getFeaturedArticles,
  });
  