// import missing_image from '@/public/missing_image.jpg'
import Image from "next/image";
interface IconProps {
  className: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}
const Icon = ({ src, alt, width = 20, height = 20, className }: IconProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Icon;
