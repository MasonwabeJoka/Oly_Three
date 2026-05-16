import { defineQuery } from "next-sanity";

export const categoriesQuery = defineQuery(`*[_type == "category" && level == 0][0]{
  title,
  "categories": subcategories[]->{
    _id,
    title,
    slug {
      current
    },
    "secondLevelSubcategories": subcategories[]->{
      _id,
      title,
      slug {
        current
      }
    },
    "thirdLevelSubcategories": subcategories[]->subcategories[]->{
      _id,
      title,
      slug {
        current
      }
    }
  },
}`);

export const featuredCategoriesQuery = defineQuery(`*[_type == "category" && isFeatured == true] {
  "id": _id,
  title,
  "displayTitle": coalesce(featuredTitle, title),
  "image": image
}`);

export const featuredCategoriesSectionQuery = defineQuery(`
  *[_type == "featuredCategoriesSection" && isActive == true][0] {
    _id,
    title,
    callToAction,
    featuredCategories[]{
        _key,
        isActive,
        sortOrder,
        featuredPriority,
        overrideTitle,
        overrideUrl,
        overrideImage,
        "category": categoryRef->{
          _id,
          title,
          slug,
          path,
          "image": image.asset->url,
          isActive,
          order
        },
        "displayTitle": coalesce(overrideTitle, categoryRef->title),
        "displayImage": coalesce(overrideImage, categoryRef->image.asset->url)
    }
  }
`);
