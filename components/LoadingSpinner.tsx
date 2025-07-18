import Image from "next/image";

const LoadingSpinner = () => {
  return <Image src="/spinner.svg" alt="spinner" width={56} height={56} />;
};

export default LoadingSpinner;
