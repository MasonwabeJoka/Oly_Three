"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TopProduct } from "../data/products";
import Checkbox from "@/components/Checkbox";


// This type is used to define the shape of our data.

export const productTableColumns: ColumnDef<TopProduct>[] = [
     {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "unitsSold",
    header: "Units Sold",
  },
  {
    accessorKey: "earnings",
    header: "Earnings",
  },
  {
    accessorKey: "conversionRate",
    header: "Conversion Rate",
  },
  {
    accessorKey: "stockStatus",
    header: "Stock Status",
  },
];
