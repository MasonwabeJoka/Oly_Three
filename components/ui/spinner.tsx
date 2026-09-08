import { Loader2Icon, LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SpinnerProps = React.ComponentProps<"svg"> & {
  loaderType?: "circle" | "sunFlower";
  spinnerAriaLabel: string;
};

function Spinner({
  className,
  loaderType = "circle",
  spinnerAriaLabel = "Processing...",
  ...props
}: SpinnerProps) {
  const Icon = loaderType === "sunFlower" ? LoaderIcon : Loader2Icon;

  return (
    <Icon
      role="status"
      aria-label={spinnerAriaLabel}
      className={cn("animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
