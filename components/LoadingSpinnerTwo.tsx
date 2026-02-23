import { Spinner } from "./ui/spinner";

const sizeMap = {
  1: "size-3",
  2: "size-4",
  3: "size-6",
  4: "size-8",
} as const;

const LoadingSpinnerTwo = ({ 
  size = 2, 
  color = "rgba(0, 0, 0, 0.2)",
  loaderType = "circle",
  speed = 1
}: { 
  size?: 1 | 2 | 3 | 4; 
  color?: string;
  loaderType?: "circle" | "sunFlower";
  speed?: number;
}) => (
  <Spinner 
    className={sizeMap[size]} 
    style={{ 
      ...(color && { color }),
      animationDuration: `${1 / speed}s`
    }} 
    loaderType={loaderType} 
  />
);

export default LoadingSpinnerTwo;
