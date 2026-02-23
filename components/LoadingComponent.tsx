import Image from "@/components/Image";

import LoadingSpinner from "@/components/LoadingSpinner";

export default function LoadingComponent() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <LoadingSpinner />
    </div>
  );
}
