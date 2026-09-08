import Image from "@/components/Image";

const LoadingGraphic = ({ spinnerAriaLabel ="Processing..." }: { spinnerAriaLabel: string }) => {
  return (
    <Image
      src="/spinner.svg"
      alt="spinner"
      width={56}
      height={56}
      unoptimized
      aria-label={spinnerAriaLabel}
    />
  );
};

export default LoadingGraphic;
