import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
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
