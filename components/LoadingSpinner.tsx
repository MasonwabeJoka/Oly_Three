import { Spinner } from "./ui/spinner";

const sizeMap = {
  1: "size-3",
  2: "size-6",
  3: "size-9",
  4: "size-12",
} as const;

const LoadingSpinner = ({
  size = 3,
  color = "rgba(0, 0, 0, 0.2)",
  loaderType = "circle",
  speed = 1.2,
  spinnerAriaLabel = "Processing...",
}: {
  size?: 1 | 2 | 3 | 4;
  color?: string;
  loaderType?: "circle" | "sunFlower";
  speed?: number;
  spinnerAriaLabel?: string;
}) => (
  <Spinner
    className={sizeMap[size]}
    style={{
      ...(color && { color }),
      animationDuration: `${1 / speed}s`,
    }}
    loaderType={loaderType}
    spinnerAriaLabel={spinnerAriaLabel}
  />
);

export default LoadingSpinner;
