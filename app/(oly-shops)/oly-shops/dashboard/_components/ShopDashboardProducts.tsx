import styles from "./ShopDashboardProducts.module.scss";
import { PageHeader } from "./PageHeader";
import Button from "@/components/Buttons";
import Link from "next/link";
import ProductsTable from "./ProductsTable";

interface ShopDashboardProductsProps {}

const ShopDashboardProducts = ({}: ShopDashboardProductsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <PageHeader>Products</PageHeader>
        <Link href="/oly-shops/dashboard/products/add-product">
          <Button
            className={styles.button}
            buttonChildren="Add Product"
            buttonType="primary"
            buttonSize="small"
            name="add-product-btn"
            type="button"
            ariaLabel="Add Product"
            autoFocus={false}
            disabled={false}
          />
        </Link>
      </div>
      <ProductsTable />
    </div>
  );
};

export default ShopDashboardProducts;
