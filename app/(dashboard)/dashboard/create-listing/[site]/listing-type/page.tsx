import { notFound } from "next/navigation";
import IsAuction from "../../components/IsAuction";

const siteCopy = {
  oly: {
    title: "Do you want to auction your item?",
    description:
      "Choose 'Yes' to auction your item or 'No' to sell at a fixed price.",
  },
  "oly-auto": {
    title: "Do you want to auction your car?",
    description:
      "Pick 'Yes' to auction your car or 'No' to set a fixed selling price.",
  },
  "oly-properties": {
    title: "Auction your property?",
    description:
      "Choose 'Yes' to auction the property or 'No' to list at a fixed price.",
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

  return <IsAuction title={title} description={description} />;
}
