export const FeaturedCategoriesData = [
  {
    category: "Vehicles",
    fetch: `*[_type == "category" && title == "Cars And Vehicles"]  {
            _id,
            title,
            "slug": slug.current,
            "image": image.asset->url,
        }`,
  },
  {
    category: "Video Games & Consoles",
    fetch: `*[_type == "category" && title == "Video Games & Consoles"]  {
            _id,
            title,
            "slug": slug.current,
            "image": image.asset->url,
        }`,
  },
  {
    category: "Phones & Tablets",
    fetch: `*[_type == "category" && title == "Phones, Mobile Phones & Telecoms"]  {
            _id,
            title,
            "slug": slug.current,
            "image": image.asset->url,
        }`,
  },
  {
    category: "Pets",
    fetch: `*[_type == "category" && title == "Pets"]  {
            _id,
            title,
            "slug": slug.current,
            "image": image.asset->url,
        }`,
  },
  {
    category: "Furniture",
    fetch: `*[_type == "category" && title == "Home & Garden"]  {
            _id,
            title,
            "slug": slug.current,
            "image": image.asset->url,
        }`,
  },
  {
    category: "Musical Instruments",
    fetch: `*[_type == "category" && title == "Musical Instruments & DJ Equipment"]  {
            _id,
            title,
            "slug": slug.current,
            "image": image.asset->url,
        }`,
  },
  {
    category: "Fashion",
    fetch: `*[_type == "category" && title == "Clothing"]  {
            _id,
            title,
            "slug": slug.current,
            "image": image.asset->url,
        }`,
  },
  {
    category: "Kids",
    fetch: `*[_type == "category" && title == "Baby & Kids"]  {
            _id,
            title,
            "slug": slug.current,
            "image": image.asset->url,
        }`,
  },
];
