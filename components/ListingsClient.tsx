import { ListingsQueryResult } from "@/sanity.types";
import ListingsCollage from "./ListingsCollage";
import ListingsExpanded from "./ListingsExpanded";

interface ListingsProps {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  expanded: boolean;
  listings: ListingsQueryResult;
  limit: number;
  page?: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

const ListingsClient = ({
  category,
  expanded,
  listings,

  limit,
  page,
  sortBy,
  sortOrder,
}: ListingsProps) => {
  return (
    <>
      {expanded ? (
        <ListingsExpanded
          category={category}
          listings={listings}
          isDeletable={false}
          isDashboard={false}
          limit={limit}
          page={page}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      ) : (
        <ListingsCollage
          category={category}
          listings={listings}
          isDeletable={false}
          isDashboard={false}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      )}
    </>
  );
};

export default ListingsClient;
