import styles from "./ProductsTable.module.scss";
import {
  Table as DataTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { products } from "../data/shopData";
import { CheckCircle2, MoreVertical, XCircleIcon } from "lucide-react";
import { formatPrice } from "@/utils/formatterFunctions/Formatter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ActiveToggleDropdownItem } from "./ActiveToggleDropdownItem";
import { DeleteDropdownItem } from "./DeleteDropdownItem";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

interface TableProps {}

const ProductsTable = ({}: TableProps) => {
  return (
    <DataTable className={styles.table}>
      <TableHeader className={styles.header}>
        <TableRow className={styles.row}>
          <TableHead style={{ width: "0" }}>
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead >Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead style={{ width: "0" }}>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.availableForPurchase ? (
                <>
                  <CheckCircle2 />
                  <span className="sr-only">Available</span>
                </>
              ) : (
                <>
                  <XCircleIcon />
                  <span className="sr-only">Unvailable</span>
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>
              {formatPrice(product.price, {
                showCents: false,
                showCurrency: true,
              })}
            </TableCell>
            <TableCell>{product.sold}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                
                  <DropdownMenuItem asChild>
                    <a
                      href={`/oly-shops/dashboard/products/${product.id}/download`}
                    >
                      Download
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={`/oly-shops/dashboard/products/${product.id}/edit`}
                    >
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <ActiveToggleDropdownItem id={product.id} availableForPurchase={product.availableForPurchase}/>
                  <DropdownMenuSeparator/>
                  <DeleteDropdownItem id={product.id} disabled={product.sold > 0}/>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </DataTable>
  );
};

export default ProductsTable;
