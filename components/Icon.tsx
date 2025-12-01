import Image from "@/components/Image";

interface IconProps {
  className?: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  boxShadow?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  isButton?: boolean;
  ariaLabel?: string;
  ariaHidden?: boolean;
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
  ariaLabel,
  ariaHidden = false,
}: IconProps) => {
  // Don't render if src is empty or invalid
  if (!src || src.trim() === "") {
    return null;
  }

  return (
    <Image
      className={className}
      src={src}
      alt={ariaHidden ? "" : alt}
      width={width}
      height={height}
      style={{ objectFit: "contain", boxShadow: boxShadow }}
      onClick={onClick}
      role={isButton ? "button" : undefined}
      tabIndex={isButton ? 0 : undefined}
      onKeyDown={
        isButton
          ? (e: React.KeyboardEvent<HTMLImageElement>) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.(e as any);
              }
            }
          : undefined
      }
      aria-label={ariaLabel || (isButton ? alt : undefined)}
      aria-hidden={ariaHidden}
    />
  );
};

export default Icon;
