"use client";

import { useArticlesQuery } from "@/hooks/useArticlesQuery";
import { articleCategories } from "@/data/articlesCategories";
import Articles from "./Articles";

interface ArticleContentProps {
  category: string;
  nextPage?: string | null;
}

export default function ArticleContent({
  category,
  nextPage,
}: ArticleContentProps) {
  const { data, isLoading, error, fetchStatus } = useArticlesQuery({
    category,
    nextPage,
  });
  if (isLoading) {
    return <div>Loading articles...</div>;
  }

  if (error) {
    return <div>Error loading articles: {error.message}</div>;
  }

  if (!data) {
    return <div>No articles found.</div>;
  }

  const { articles, totalResults, nextPage: nextPageNumber } = data;

  return (
    <Articles
      articles={articles}
      articleCategories={articleCategories}
      nextPage={nextPageNumber}
      category={category}
    />
  );
}
