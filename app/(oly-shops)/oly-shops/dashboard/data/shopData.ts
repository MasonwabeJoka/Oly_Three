import { Customer, Earnings, Order, Product, StoreInfo, StoreStats } from "../types/shopDataTypes";


export const storeInfo: StoreInfo = {
  id: "store_001",
  name: "TechWorld Gadgets",
  owner: "John Doe",
  logoUrl: "https://via.placeholder.com/80x80.png?text=Logo",
  joinedAt: "2023-04-10",
  status: "active",
};

export const storeStats: StoreStats = {
  totalSales: 154320,
  totalOrders: 1289,
  totalProducts: 56,
  totalCustomers: 784,
  monthlyRevenue: 12450,
  growthRate: 12.5,
};

export const orders: Order[] = [
  {
    id: "ORD-1001",
    customerName: "Alice Johnson",
    product: "Wireless Headphones",
    amount: 120,
    status: "delivered",
    date: "2025-09-12",
  },
  {
    id: "ORD-1002",
    customerName: "David Kim",
    product: "Smartwatch Series 5",
    amount: 250,
    status: "shipped",
    date: "2025-09-11",
  },
  {
    id: "ORD-1003",
    customerName: "Emma Brown",
    product: "Bluetooth Speaker",
    amount: 75,
    status: "pending",
    date: "2025-09-10",
  },
];

export const products: Product[] = [
  {
    id: "P-001",
    name: "Wireless Headphones",
    price: 120,
    stock: 32,
    sold: 420,
    availableForPurchase: true,
    imageUrl: "https://via.placeholder.com/100.png?text=Headphones",
  },
  {
    id: "P-002",
    name: "Smartwatch Series 5",
    price: 250,
    stock: 18,
    sold: 310,
    availableForPurchase: true,
    imageUrl: "https://via.placeholder.com/100.png?text=Smartwatch",
  },
  {
    id: "P-003",
    name: "Bluetooth Speaker",
    price: 75,
    stock: 50,
    sold: 280,
    availableForPurchase: true,
    imageUrl: "https://via.placeholder.com/100.png?text=Speaker",
  },
];

export const earnings: Earnings[] = [
  { month: "April", revenue: 8200, expenses: 3200, profit: 5000 },
  { month: "May", revenue: 9300, expenses: 3500, profit: 5800 },
  { month: "June", revenue: 10450, expenses: 3900, profit: 6550 },
  { month: "July", revenue: 9800, expenses: 3700, profit: 6100 },
  { month: "August", revenue: 12450, expenses: 4200, profit: 8250 },
];

export const customers: Customer[] = [
  {
    id: "CUST-001",
    name: "Alice Johnson",
    email: "alice@example.com",
    totalSpent: 1020,
    lastOrder: "2025-09-12",
  },
  {
    id: "CUST-002",
    name: "David Kim",
    email: "david@example.com",
    totalSpent: 850,
    lastOrder: "2025-09-11",
  },
  {
    id: "CUST-003",
    name: "Emma Brown",
    email: "emma@example.com",
    totalSpent: 640,
    lastOrder: "2025-09-10",
  },
];
