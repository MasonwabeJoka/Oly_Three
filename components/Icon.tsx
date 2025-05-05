import Image from "next/image";

interface IconProps {
  className?: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  boxShadow?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  isButton?: boolean;
}

const Icon = ({
  className = "",
  src,
  alt,
  width = 20,
  height = 20,
  boxShadow = "none",
  onClick,
  isButton = false,
}: IconProps) => {
  return (
    <Image
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ objectFit: "contain", boxShadow: boxShadow }}
      onClick={onClick}
      role={isButton ? "button" : undefined}
      tabIndex={isButton ? 0 : undefined}
      onKeyDown={isButton ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(e as any);
        }
      } : undefined}
      aria-label={isButton ? alt : undefined}
    />
  );
};

export default Icon;