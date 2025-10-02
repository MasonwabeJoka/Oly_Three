// For sellers to understand who their buyers are and whether repeat customers are showing up.
export type Customer = {
  customerId: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpend: number;
  lastOrderDate: string;
  averageOrderValue: number;
};
export const customers: Customer[] = [
  {
    customerId: "CUST-001",
    name: "John Doe",
    email: "john@example.com",
    totalOrders: 15,
    totalSpend: 3250.0,
    lastOrderDate: "2025-09-16T10:25:00Z",
    averageOrderValue: 216.67,
  },
  {
    customerId: "CUST-002",
    name: "Sarah Lee",
    email: "sarah@gmail.com",
    totalOrders: 3,
    totalSpend: 450.0,
    lastOrderDate: "2025-09-15T08:15:00Z",
    averageOrderValue: 150.0,
  },
  {
    customerId: "CUST-003",
    name: "A. Patel",
    email: "apatel@outlook.com",
    totalOrders: 8,
    totalSpend: 5400.0,
    lastOrderDate: "2025-09-16T14:05:00Z",
    averageOrderValue: 675.0,
  },
];
