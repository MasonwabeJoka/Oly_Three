import styles from "./FeaturedCategories.module.scss";
import LinkCard from "@/components/cards/LinkCard";
import { getTopCategories } from "@/sanity/actions/topCategoriesActions";
import { FeaturedCategoriesData } from "@/data/featuredCategoriesData";
import FeaturedCategoriesClient from "./FeaturedCategoriesClient";

const FeaturedCategories = async () => {
  const fetchedCategories = await Promise.all(
    FeaturedCategoriesData.map(async (category) => {
      return await getTopCategories(category.fetch);
    })
  );
  const categories = fetchedCategories.flat();

  return (
    <div className={styles.categoriesSection}>
      <div className={styles.categoriesContainer}>
        {categories.slice(0, 12).map((category) => (
          <LinkCard
            key={category._id}
            label={category.title}
            cardSize="large"
            image={category.image}
          />
        ))}
      </div>
      <FeaturedCategoriesClient />
    </div>
  );
};

export default FeaturedCategories;