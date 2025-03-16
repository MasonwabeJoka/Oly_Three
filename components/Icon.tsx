// import missing_image from '@/public/missing_image.jpg'
import Image from "next/image";
interface IconProps {
  className?: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  boxShadow?: string;
}
const Icon = ({ 
  className = "", 
  src, 
  alt, 
  width = 20, 
  height = 20,
  boxShadow = "none",
}: IconProps) => {
  return (
    <Image 
      className={className}
      src={src} 
      alt={alt} 
      width={width} 
      height={height}
      style={{ boxShadow: boxShadow }}
    />
  );
};

export default Icon;
