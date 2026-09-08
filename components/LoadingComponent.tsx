import Image from "@/components/Image";
import LoadingGraphic from "@/components/LoadingGraphic";

export default function LoadingComponent({
  spinnerAriaLabel ="Processing...",
}: {
  spinnerAriaLabel: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <LoadingGraphic spinnerAriaLabel={spinnerAriaLabel} />
    </div>
  );
}
