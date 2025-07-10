
import { SortData, PriceRanges } from "@/data/DropdownData";
import multipleImages from "@/data/multipleImages";
import { articles } from "@/data/articles";
import { articleCategories } from "@/data/articlesCategories";
import ListingsClient from "./ListingsClient";

// If you have server-fetchable data, fetch it here and pass as props
export default async function ListingsServer() {
  // Example: fetch data here if needed
  // const ads = await fetchAdsOnServer();
  // const avatars = await fetchAvatarsOnServer();
  // Pass as props below
  return (
    <ListingsClient
      sortData={SortData}
      priceRanges={PriceRanges}
      multipleImages={multipleImages}
      articles={articles}
      articleCategories={articleCategories}
    />
  );
}
