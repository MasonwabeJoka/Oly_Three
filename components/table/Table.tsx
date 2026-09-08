"use client";
import styles from "./Table.module.scss";
import { Button as ShadcnButton } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { useState } from "react";
import Button from "../Button";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableDropdownMenu } from "./TableDropdownMenu";
import Input from "../Input";

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  placeholder: string;
  searchColumn: string;
}

export function Table<TData, TValue>({
  columns,
  data,
  placeholder,
  searchColumn,
}: TableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  if (!data || !columns || columns.length === 0) {
    return null;
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className={styles.container}>
      <>
        <div className={styles.searchInputContainer}>
          <Input
            className={styles.searchInput}
            placeholder={placeholder}
            value={
              (table
                .getColumn(`${searchColumn}`)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
            inputType="text"
            inputSize="xLarge"
            label="Search"
            id="search"
            ariaLabel="Search"
            autoComplete="off"
            required={false}
            dashboard
          />
        </div>
        <TableDropdownMenu
          columns={table.getAllColumns()}
          triggerText="Columns"
          buttonSize="medium" // Example: Using medium size for the default button
        />

        <ShadcnTable className={styles.tableContainer}>
          <TableHeader className={styles.tableHeader}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className={styles.tableRow}>
                {headerGroup.headers?.map((header) => {
                  return (
                    <TableHead key={header.id} className={styles.tableHead}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className={styles.tableBody}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows?.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={styles.tableRow}
                >
                  {row.getVisibleCells()?.map((cell) => (
                    <TableCell key={cell.id} className={styles.tableCell}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className={styles.tableRow}>
                <TableCell
                  colSpan={columns.length}
                  className={styles.tableCell}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </ShadcnTable>
        <div className={styles.paginationContainer}>
          <Button
            className={styles.previousButton}
            children="prev"
            buttonShape="round"
            buttonSize="medium"
            ariaLabel="Previous Button"
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          />
          <Button
            className={styles.nextButton}
            children="next"
            buttonShape="round"
            buttonSize="medium"
            ariaLabel="Next Button"
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          />
        </div>
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </>
    </div>
  );
}

export default Table;
