import { ListingsQueryResult } from "@/sanity.types";
import ListingsCollage from "./ListingsCollage";
import ListingsExpanded from "./ListingsExpanded";

interface ListingsProps {
  site:
    | "oly"
    | "oly-properties"
    | "oly-auto"
    | "oly-hiring"
    | "oly-services"
    | "oly-shops"
    | "oly-agents"
    | "oly-dealerships";
  expanded: boolean;
  listings: ListingsQueryResult;
  limit: number;
  page?: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

const ListingsClient = ({
  site,
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
          site={site}
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
          site={site}
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
