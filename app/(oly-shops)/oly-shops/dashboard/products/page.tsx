import styles from "./styles.module.scss";
import Button from "@/components/Button";
import Link from "next/link";
import Table from "@/components/table/Table";
import { topProducts, TopProduct } from "../data/products";
import { productTableColumns } from "../products/columns";
import ProductsTable from "../_components/ProductsTable";

interface ShopDashboardProductsProps {}

const ShopDashboardProducts = ({}: ShopDashboardProductsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Products</h1>
        <Link href="/oly-shops/dashboard/products/add-product">
          <Button
            className={styles.button}
            children="Add Product"
            buttonVariant="primary"
            buttonSize="small"


            ariaLabel="Add Product"


          />
        </Link>
      </div>
      {/* <ProductsTable /> */}
      <Table<TopProduct, TopProduct>
        columns={productTableColumns}
        data={topProducts}
        placeholder="Search products..."
        searchColumn="name"
      />
    </div>
  );
};

export default ShopDashboardProducts;
