import { priceRanges } from "./PriceRanges";

export const SearchResultsData = [
  {
    id: 1,
    link: "",
    result: "First Result",
  },
  {
    id: 2,
    link: "",
    result: "Second Result",
  },
  {
    id: 3,
    link: "",
    result: "Third Result",
  },
  {
    id: 4,
    link: "",
    result: "Fourth Result",
  },
  {
    id: 5,
    link: "",
    result: "Fifth Result",
  },
];

export const LocationsResultsData = [
  {
    id: 1,
    link: "",
    result: "First Result",
  },
  {
    id: 2,
    link: "",
    result: "Second Result",
  },
  {
    id: 3,
    link: "",
    result: "Third Result",
  },
  {
    id: 4,
    link: "",
    result: "Fourth Result",
  },
  {
    id: 5,
    link: "",
    result: "Fifth Result",
  },
];

export const SortData = [
  {
    id: 1,
    link: "",
    result: "Default",
  },
  {
    id: 2,
    link: "",
    result: "Highest Price",
  },
  {
    id: 3,
    link: "",
    result: "Lowest Price",
  },
  {
    id: 4,
    link: "",
    result: "Most Recent",
  },
  {
    id: 5,
    link: "",
    result: "Nearest To Me",
  },
];

export const PriceRanges = priceRanges.map((priceRange, index) => {
  return {
    id: index + 1,
    link: "",
    result: [`${priceRange.minPrice}`, `${priceRange.maxPrice}`],
  
  };
});
