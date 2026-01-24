import { defineQuery } from "next-sanity";
import { LOW_STOCK_THRESHOLD } from "@/lib/shops/constants/stock";
import { sanityFetch } from "@/sanity/lib/live";

export const ALL_PRODUCTS_QUERY = defineQuery(
  `*[_type == "shop-product"] | order(name asc) { _id, name, "slug": slug.current, description, price, "images": images[]{ _key, asset->{ _id, url }, hotspot }, category->{ _id, title, "slug": slug.current }, material, colour, dimensions, stock, featured, assemblyRequired }`
);

export const FEATURED_PRODUCTS_QUERY = defineQuery(
  `*[_type == "shop-product" && featured == true && stock > 0] | order(name asc) [0...6] { _id, name, "slug": slug.current, description, price, "images": images[]{ _key, asset->{ _id, url }, hotspot }, category->{ _id, title, "slug": slug.current }, stock }`
);

export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(
  `*[_type == "shop-product" && category->slug.current == $categorySlug] | order(name asc) { _id, name, "slug": slug.current, price, "image": images[0]{ asset->{ _id, url }, hotspot }, category->{ _id, title, "slug": slug.current }, material, colour, stock }`
);

export const PRODUCT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "shop-product" && slug.current == $slug][0] { _id, name, "slug": slug.current, description, price, "images": images[]{ _key, asset->{ _id, url }, hotspot }, category->{ _id, title, "slug": slug.current }, material, colour, dimensions, stock, featured, assemblyRequired }`
);

export const SEARCH_PRODUCTS_QUERY = defineQuery(
  `*[_type == "shop-product" && (name match $searchQuery + "*" || description match $searchQuery + "*")] | score(boost(name match $searchQuery + "*", 3), boost(description match $searchQuery + "*", 1)) | order(_score desc) { _id, _score, name, "slug": slug.current, price, "image": images[0]{ asset->{ _id, url }, hotspot }, category->{ _id, title, "slug": slug.current }, material, colour, stock }`
);

export const FILTER_PRODUCTS_BY_NAME_QUERY = defineQuery(
  `*[_type == "shop-product" && ($categorySlug == "" || category->slug.current == $categorySlug) && ($colour == "" || colour == $colour) && ($material == "" || material == $material) && ($minPrice == 0 || price >= $minPrice) && ($maxPrice == 0 || price <= $maxPrice) && ($searchQuery == "" || name match $searchQuery + "*" || description match $searchQuery + "*") && ($inStock == false || stock > 0)] | order(name asc) { _id, name, "slug": slug.current, price, "images": images[0...4]{ _key, asset->{ _id, url } }, category->{ _id, title, "slug": slug.current }, material, colour, stock }`
);

export const FILTER_PRODUCTS_BY_PRICE_ASC_QUERY = defineQuery(
  `*[_type == "shop-product" && ($categorySlug == "" || category->slug.current == $categorySlug) && ($colour == "" || colour == $colour) && ($material == "" || material == $material) && ($minPrice == 0 || price >= $minPrice) && ($maxPrice == 0 || price <= $maxPrice) && ($searchQuery == "" || name match $searchQuery + "*" || description match $searchQuery + "*") && ($inStock == false || stock > 0)] | order(price asc) { _id, name, "slug": slug.current, price, "images": images[0...4]{ _key, asset->{ _id, url } }, category->{ _id, title, "slug": slug.current }, material, colour, stock }`
);

export const FILTER_PRODUCTS_BY_PRICE_DESC_QUERY = defineQuery(
  `*[_type == "shop-product" && ($categorySlug == "" || category->slug.current == $categorySlug) && ($colour == "" || colour == $colour) && ($material == "" || material == $material) && ($minPrice == 0 || price >= $minPrice) && ($maxPrice == 0 || price <= $maxPrice) && ($searchQuery == "" || name match $searchQuery + "*" || description match $searchQuery + "*") && ($inStock == false || stock > 0)] | order(price desc) { _id, name, "slug": slug.current, price, "images": images[0...4]{ _key, asset->{ _id, url } }, category->{ _id, title, "slug": slug.current }, material, colour, stock }`
);

export const FILTER_PRODUCTS_BY_RELEVANCE_QUERY = defineQuery(
  `*[_type == "shop-product" && ($categorySlug == "" || category->slug.current == $categorySlug) && ($colour == "" || colour == $colour) && ($material == "" || material == $material) && ($minPrice == 0 || price >= $minPrice) && ($maxPrice == 0 || price <= $maxPrice) && ($searchQuery == "" || name match $searchQuery + "*" || description match $searchQuery + "*") && ($inStock == false || stock > 0)] | score(boost(name match $searchQuery + "*", 3), boost(description match $searchQuery + "*", 1)) | order(_score desc, name asc) { _id, name, "slug": slug.current, price, "images": images[0...4]{ _key, asset->{ _id, url } }, category->{ _id, title, "slug": slug.current }, material, colour, stock }`
);

export const PRODUCTS_BY_IDS_QUERY = defineQuery(
  `*[_type == "shop-product" && _id in $ids] { _id, name, "slug": slug.current, price, "image": images[0]{ asset->{ _id, url }, hotspot }, stock }`
);

export const LOW_STOCK_PRODUCTS_QUERY = defineQuery(
  `*[_type == "shop-product" && stock > 0 && stock <= $threshold] | order(stock asc) { _id, name, "slug": slug.current, stock, "image": images[0]{ asset->{ _id, url } } }`
);

export const OUT_OF_STOCK_PRODUCTS_QUERY = defineQuery(
  `*[_type == "shop-product" && stock == 0] | order(name asc) { _id, name, "slug": slug.current, "image": images[0]{ asset->{ _id, url } } }`
);

export const AI_SEARCH_PRODUCTS_QUERY = defineQuery(
  `*[_type == "shop-product" && ($searchQuery == "" || name match $searchQuery + "*" || description match $searchQuery + "*" || category->title match $searchQuery + "*") && ($categorySlug == "" || category->slug.current == $categorySlug) && ($material == "" || material == $material) && ($colour == "" || colour == $colour) && ($minPrice == 0 || price >= $minPrice) && ($maxPrice == 0 || price <= $maxPrice)] | order(name asc) [0...20] { _id, name, "slug": slug.current, description, price, "image": images[0]{ asset->{ _id, url } }, category->{ _id, title, "slug": slug.current }, material, colour, dimensions, stock, featured, assemblyRequired }`
);


// Read

export async function getFilteredProducts(params: {
  searchQuery?: string;
  categorySlug?: string;
  colour?: string;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  inStock?: boolean;
}) {
  const {
    searchQuery = "",
    categorySlug = "",
    colour = "",
    material = "",
    minPrice = 0,
    maxPrice = 0,
    sort = "name",
    inStock = false,
  } = params;

  const getQuery = () => {
    // If searching and sort is relevance, use relevance query
    if (searchQuery && sort === "relevance") {
      return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
    }

    switch (sort) {
      case "price_asc":
        return FILTER_PRODUCTS_BY_PRICE_ASC_QUERY;
      case "price_desc":
        return FILTER_PRODUCTS_BY_PRICE_DESC_QUERY;
      case "relevance":
        return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
      default:
        return FILTER_PRODUCTS_BY_NAME_QUERY;
    }
  };

  const { data: products } = await sanityFetch({
    query: getQuery(),
    params: {
      searchQuery,
      categorySlug,
      colour,
      material,
      minPrice,
      maxPrice,
      inStock,
    },
  });

  return products;
}

 export const getFeaturedProducts = async () => {
  const { data: featuredProducts } = await sanityFetch({
    query: FEATURED_PRODUCTS_QUERY,
  });

  return featuredProducts;
};  
