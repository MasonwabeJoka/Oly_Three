
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

// Query
export const featuredArticlesQuery = defineQuery(`*[_type == "olyArticlesSection"][0] {
  _id,
  title,
  "articles": *[_type == "olyArticle" && imageUrl != null && imageUrl != ""] | order(pubDate desc) [0...10] {
    _id,
    title,
    content,
    pubDate,
    imageUrl,
    "creator": domain[0],
    sourceUrl,
    sourceIcon
  }
}`);

// Read
export const getFeaturedArticles = async () => {
    try {
        const featuredArticles = await client.fetch(featuredArticlesQuery);
        if (!featuredArticles) {
            console.warn("Featured articles section data not found");
            return { _id: null, title: "Featured Articles", articles: [] };
        }
        return featuredArticles;
    } catch (error) {
        console.error("Error fetching featuredArticles:", error);
        // Return fallback data instead of throwing error
        console.warn("Returning fallback data for featured articles");
        return { _id: null, title: "Featured Articles", articles: [] };
    }
}