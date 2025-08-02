import styles from "./FeaturedCategories.module.scss";
import LinkCard from "@/components/cards/LinkCard";
import { getTopCategories } from "@/sanityTemp/actions/topCategoriesActions";
import { FeaturedCategoriesData } from "@/data/featuredCategoriesData";
import FeaturedCategoriesClient, {
  FeaturedCategoriesClientProps,
} from "./FeaturedCategoriesClient";

const FeaturedCategories = async () => {
  const fetchedCategories = await Promise.all(
    FeaturedCategoriesData.map(async (category) => {
      return await getTopCategories(category.fetch);
    })
  );
  const categories: FeaturedCategoriesClientProps["categories"] =
    fetchedCategories.flat();

  return <FeaturedCategoriesClient categories={categories} />;
};

export default FeaturedCategories;
