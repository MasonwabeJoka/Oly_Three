'use client';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { toggleProductAvailability } from "../_actions/products";

type ActiveToggleDropdownItemProps = {
  id: string;
  availableForPurchase: boolean;
};

export const ActiveToggleDropdownItem = ({
  id,
  availableForPurchase,
}: ActiveToggleDropdownItemProps) => {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !availableForPurchase);
        });
      }}
    >
      {availableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
};