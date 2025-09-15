
'use client';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteProduct } from "../_actions/products";

type DeleteDropdownItemProps = {
  id: string;
  disabled: boolean;
};

export const DeleteDropdownItem = ({
  id,
  disabled,
}: DeleteDropdownItemProps) => {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
};