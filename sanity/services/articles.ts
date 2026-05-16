import { client } from "@/server/sanity/lib/client";
import { featuredArticlesQuery } from "@/server/sanity/queries/articles";

export const getFeaturedArticles = async () => {
  try {
    const data = await client.fetch(featuredArticlesQuery);
    if (!data) return { _id: null, title: "Featured Articles", articles: [] };
    return data;
  } catch (error) {
    console.error("Error fetching featured articles:", error);
    return { _id: null, title: "Featured Articles", articles: [] };
  }
};
