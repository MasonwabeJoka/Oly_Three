import { getFeaturedCategories } from "@/server/sanity/read-write/featuredCategories/read";
import FeaturedCategoriesClient from "./FeaturedCategoriesClient";

const FeaturedCategories = async () => {
  const data = await getFeaturedCategories();
  const categories = Array.isArray(data) ? data : [];

  return <FeaturedCategoriesClient data={categories} />;
};

export default FeaturedCategories;

