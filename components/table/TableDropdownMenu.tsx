"use client";

import * as React from "react";
import styles from "./TableDropdownMenu.module.scss";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";

interface TableDropdownMenuProps<TData, TValue> {
  triggerText?: string;
  label?: string;
  columns: Column<TData, TValue>[];
  triggerElement?: React.ReactNode;
  buttonSize?: "large" | "medium" | "small";
}

export function TableDropdownMenu<TData, TValue>({
  triggerText = "Columns",
  label = "Toggle Columns",
  columns,
  triggerElement,
  buttonSize = "small",
}: TableDropdownMenuProps<TData, TValue>) {
  const sizeStyles: Record<"large" | "medium" | "small", string> = {
    large: "h-12 px-6 text-lg",
    medium: "h-10 px-4 text-base",
    small: "h-8 px-3 text-sm",
  };

  const defaultTrigger = (
    <Button variant="outline" className={sizeStyles[buttonSize]}>
      {triggerText}
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {triggerElement || defaultTrigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={styles.dropdownMenuContent}>
        <DropdownMenuLabel className={styles.dropdownMenuLabel}>
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns
          .filter((column) => column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className={styles.dropdownMenuItem}
              checked={column.getIsVisible()}
              onCheckedChange={(value: any) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
