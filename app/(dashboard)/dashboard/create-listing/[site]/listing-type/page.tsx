import { notFound } from "next/navigation";
import IsAuction from "../../components/IsAuction";

const siteCopy = {
  oly: {
    title: "Choose your listing type",
    description:
      "Select Auction to let buyers place bids, or Fixed Price to sell your item at a set price.",
  },
  "oly-auto": {
    title: "Choose your vehicle listing type",
    description:
      "Select Auction to let buyers bid on your vehicle, or Fixed Price to sell it at a set price.",
  },
  "oly-properties": {
    title: "Choose your property listing type",
    description:
      "Select Auction to let buyers bid on your property, or Fixed Price to list it at a set price.",
  },
} as const;

type ValidSite = keyof typeof siteCopy;

export default async function ListingTypePage({
  params,
}: {
  params: { site: ValidSite };
}) {
  const { site } = await params;
  if (!(site in siteCopy)) {
    notFound();
  }
  const { title, description } = siteCopy[site];

  return <IsAuction title={title} description={description} site={site} />;
}
