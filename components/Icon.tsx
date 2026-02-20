import Image from "./Image";

interface IconProps {
  className?: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;               // ← new
  boxShadow?: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
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
  fill = false,                 
  boxShadow = "none",
  onClick,
  isButton = false,
  ariaLabel,
  ariaHidden = false,
}: IconProps) => {
  if (!src || src.trim() === "") return null;

  return (
    <Image
      className={className}
      src={src}
      alt={ariaHidden ? "" : alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}                   
      style={{
        objectFit: fill ? "contain" : "cover",   
        boxShadow,
      }}
      onClick={onClick}
      role={isButton ? "button" : undefined}
      tabIndex={isButton ? 0 : undefined}
      onKeyDown={
        isButton
          ? (e) => {
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