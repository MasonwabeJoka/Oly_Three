export interface StoreInfo {
  id: string;
  name: string;
  owner: string;
  logoUrl: string;
  joinedAt: string;
  status: "active" | "suspended" | "pending";
}

export interface StoreStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  monthlyRevenue: number;
  growthRate: number; // % growth compared to last month
}

export interface Order {
  id: string;
  customerName: string;
  product: string;
  amount: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  sold: number;
  availableForPurchase: boolean;
  imageUrl: string;
}

export interface Earnings {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  lastOrder: string;
}



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