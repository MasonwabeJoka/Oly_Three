// how much sellers are making, order activity, and customer engagement.
export type Sales = {
  date: string;
  transactions: number;
  totalRevenue: number;
  averageOrderValue: number;
  unitsSold: number;
  refunds: number;
};
export const sales = {
  date: "2025-09-17", // daily, weekly, or monthly view
  transactions: 120, // number of orders
  totalRevenue: 15400.75, // sum of order values
  averageOrderValue: 128.34, // ARPU-style insight
  unitsSold: 340, // total products sold
  refunds: 3 // number of refunds/returns
};