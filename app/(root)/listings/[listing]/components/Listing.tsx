import ListingClient, { ListingProps } from "./ListingClient";

export default function Listing(props: ListingProps) {
  // You can fetch server-side data here if needed in the future
  return <ListingClient {...props} />;
}
