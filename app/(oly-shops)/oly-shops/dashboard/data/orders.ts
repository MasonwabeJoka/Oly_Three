export type Order = {
  orderId: string;
  customerId: string;
  customerName: string;
  orderDate: string;
  orderStatus: string; // pending | processing | shipped | delivered | canceled | refunded
  orderValue: number;
  paymentStatus: string; // paid | pending | failed | refunded
};

export const orders: Order[] = [
  {
    orderId: "ORD-1001",
    customerId: "CUST-001",
    customerName: "John Doe",
    orderDate: "2025-09-16T10:25:00Z",
    orderStatus: "delivered", // pending | processing | shipped | delivered | canceled | refunded
    orderValue: 350.75,
    paymentStatus: "paid", // paid | pending | failed | refunded
  },
  {
    orderId: "ORD-1002",
    customerId: "CUST-002",
    customerName: "Sarah Lee",
    orderDate: "2025-09-16T11:45:00Z",
    orderStatus: "processing",
    orderValue: 1200.0,
    paymentStatus: "paid",
  },
  {
    orderId: "ORD-1003",
    customerId: "CUST-003",
    customerName: "A. Patel",
    orderDate: "2025-09-16T14:05:00Z",
    orderStatus: "canceled",
    orderValue: 89.0,
    paymentStatus: "refunded",
  },
];
