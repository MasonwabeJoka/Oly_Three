import {
  getFeaturedProducts,
  getFilteredProducts,
} from "@/sanity/lib/crud/shops/products/data";
import { getShopCategories } from "@/sanity/lib/crud/shops/categories/data";
import styles from "./styles.module.scss";
import { Suspense } from "react";
import { FeaturedProductsCarousel } from "./components/FeaturedProductsCarousel";
import { CategoryTiles } from "./components/CategoryTiles";
import { ProductSection } from "./components/ProductSection";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    colour?: string;
    material?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    inStock?: string;
  }>;
}

const Home = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const searchQuery = params.q ?? "";
  const categorySlug = params.category ?? "";
  const colour = params.colour ?? "";
  const material = params.material ?? "";
  const minPrice = Number(params.minPrice) || 0;
  const maxPrice = Number(params.maxPrice) || 0;
  const sort = params.sort ?? "name";
  const inStock = params.inStock === "true";

  const products = await getFilteredProducts({
    searchQuery,
    categorySlug,
    colour,
    material,
    minPrice,
    maxPrice,
    sort,
    inStock,
  });

  const categories = await getShopCategories();
  const featuredProducts = await getFeaturedProducts();
  console.log({ categories });

  return (
    <div className={styles.container}>
      {/* Featured Products Carousel */}

      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedProductsCarousel products={featuredProducts} />
      </Suspense>

        {/* Page Banner */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Shop {categorySlug ? categorySlug : "All Products"}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Premium furniture for your home
          </p>
        </div>

        {/* Category Tiles - Full width */}
        <div className="mt-6">
          <CategoryTiles
            categories={categories}
            activeCategory={categorySlug || undefined}
          />
        </div>
      </div>

      {/* <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductSection
          categories={categories}
          products={products}
          searchQuery={searchQuery}
        />
      </div> */}
    </div>
  
  );
};

export default Home;
