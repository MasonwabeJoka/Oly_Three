import { defineQuery } from "next-sanity";

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
