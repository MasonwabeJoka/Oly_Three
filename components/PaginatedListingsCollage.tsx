import PaginatedListingsCollageClient, {
  PaginatedListingsCollageProps,
} from "./PaginatedListingsCollageClient";

export default function PaginatedListingsCollage(
  props: PaginatedListingsCollageProps
) {
  // You can fetch server-side data here if needed in the future
  return <PaginatedListingsCollageClient {...props} />;
}
