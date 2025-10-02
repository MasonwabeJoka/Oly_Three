import { getCategories } from "@/sanity/lib/crud/categories/data";
import CategoriesClient from "./CategoriesClient";

export default async function Categories() {
  const fetchedCategories = await getCategories();
  return <CategoriesClient categories={fetchedCategories} />;
}
