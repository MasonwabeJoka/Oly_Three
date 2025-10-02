import IsAuction from "../components/IsAuction";
import ListingTypeSelection from "../components/ListingTypeSelection";

export default async function ListingTypePage({
  params,
}: {
  params: { site: string };
}) {
  const { site } = await params;

  return <IsAuction />;
}
