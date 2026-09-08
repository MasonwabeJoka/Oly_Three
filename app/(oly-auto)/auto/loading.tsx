import LoadingGraphic from "@/components/LoadingGraphic";

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
      <LoadingGraphic />
    </div>
  );
}
