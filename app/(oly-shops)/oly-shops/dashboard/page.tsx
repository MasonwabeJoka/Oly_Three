import styles from "./styles.module.scss";
import {
  storeStats,
  orders,
  products,
  earnings,
  customers,
} from "./data/shopData";
import { Order, Customer } from "./types/shopDataTypes";
import {
  formatNumberWithSpaces,
  formatPrice,
} from "@/utils/formatterFunctions/Formatter";
import DashboardCard from "@/components/cards/DashboardCard";

export const dynamic = "force-dynamic"; // Don't cache this admin

const Page = () => {
  const { totalSales } = storeStats;

  function calculateTotalAmount(orders: Order[]): number {
    return orders.reduce((sum, order) => sum + order.amount, 0);
  }

  const totalSpent = (customers: Customer[]) => {
    return customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  };

  const customersCount = customers.length;
  const ordersCount = orders.length;
  const productsCount = products.length;
  const totalAmount = calculateTotalAmount(orders) || 0;
  const totalAmountSpent = totalSpent(customers) || 0;

  const waitTemp = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  async function getData() {
    await waitTemp(2000);
    return {
      totalSales,
      orders,
      products,
      earnings,
      customers,
    };
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        <DashboardCard
          title="Total Sales"
          subtitle={`${ordersCount || 0} orders this week`}
          value={formatPrice(1200, { showCents: false , showCurrency: false })}
          // value={formatPrice(totalAmount, { showCents: false , showCurrency: false })}
        />

        <DashboardCard
          title="Customers"
          subtitle={`${customersCount || 0} customers this week`}
          value={`${customersCount || 0}`}
        />

        <DashboardCard
          title="Active Products"
          subtitle={`${formatNumberWithSpaces(1) || 0} inactive`}
          value={formatNumberWithSpaces(productsCount)}
        />
      </div>
    </div>
  );
};

export default Page;
