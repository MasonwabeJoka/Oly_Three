import Image from "next/image";
interface IconProps {
  className?: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  boxShadow?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
}
const Icon = ({
  className = "",
  src,
  alt,
  width = 20,
  height = 20,
  boxShadow = "none",
  onClick,
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
    />
  );
};

export default Icon;
