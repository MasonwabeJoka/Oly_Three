import CategoriesClient, { CategoriesProps } from "./CategoriesClient";
import { getCategories } from "@/sanity/actions/categoriesActions";

export default async function Categories() {
  const fetchedCategories = await getCategories();
  return <CategoriesClient fetchedCategories={fetchedCategories} />;
}
