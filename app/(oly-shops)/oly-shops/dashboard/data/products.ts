// For sellers to know what’s selling the most.
export type TopProduct = {
    name: string;
    category: string;
    unitsSold: number;
    earnings: number;
    conversionRate: number;
    stockStatus: "in stock" | "low" | "out of stock" | "n/a";
};
export const topProducts: TopProduct[] = [
  {
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    unitsSold: 240,
    earnings: 11999.99,
    conversionRate: 12.5, // percentage (views → orders)
    stockStatus: "low", // "in stock" | "low" | "out of stock"
  },
  {
    name: "Organic Coffee Beans 1kg",
    category: "Groceries",
    unitsSold: 180,
    earnings: 4500.0,
    conversionRate: 9.3,
    stockStatus: "in stock",
  },
  {
    name: "Home Cleaning Service (2h)",
    category: "Services",
    unitsSold: 95,
    earnings: 7600.0,
    conversionRate: 7.8,
    stockStatus: "n/a", // not applicable for services
  },
];
