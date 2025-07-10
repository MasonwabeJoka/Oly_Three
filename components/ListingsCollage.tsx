import ListingsCollageClient, {
  ListingsCollageProps,
} from "./ListingsCollageClient";

export default function ListingsCollage(props: ListingsCollageProps) {
  // You can fetch server-side data here if needed in the future
  return <ListingsCollageClient {...props} />;
}
