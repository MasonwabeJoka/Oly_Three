import { Loader2Icon, LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type SpinnerProps = React.ComponentProps<"svg"> & {
  loaderType?: "circle" | "sunFlower";
};

function Spinner({ className, loaderType = "circle", ...props }: SpinnerProps) {
  const Icon = loaderType === "sunFlower" ? LoaderIcon : Loader2Icon;
  
  return (
    <Icon
      role="status"
      aria-label="Loading"
      className={cn("animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
