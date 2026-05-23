import { getCategories } from "@/server/sanity/read-write/categories/read";
import CategoriesClient from "./CategoriesClient";
import { CategoriesQueryResult } from "@/sanity.types";

export default async function Categories() {
  const fetchedCategories: CategoriesQueryResult = await getCategories();
  // Extract the categories array from the query result
  const categories = fetchedCategories?.categories || [];

  return <CategoriesClient categories={categories} />;
}

