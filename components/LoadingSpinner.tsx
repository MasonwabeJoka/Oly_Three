import Image from "@/components/Image";

const LoadingSpinner = () => {
  return (
    <Image
      src="/spinner.svg"
      alt="spinner"
      width={56}
      height={56}
      unoptimized
    />
  );
};

export default LoadingSpinner;
