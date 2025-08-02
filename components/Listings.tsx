import ListingsCollage from "./ListingsCollage";
import ListingsExpanded from "./ListingsExpanded";

interface ListingsProps {
  expanded: boolean;
  tempImages: string[][];
  avatars: string[];
}

const Listings = ({ expanded, tempImages, avatars }: ListingsProps) => {
  return (
    <>
      {expanded ? (
        <ListingsExpanded
          category="all"
          images={tempImages}
          avatars={avatars}
          isDeletable={false}
          isDashboard={false}
          limit={4}
          page={1}
          sortBy="postedOn"
          sortOrder="desc"
        />
      ) : (
        <ListingsCollage
          category="all"
          images={tempImages}
          isDeletable={false}
          isDashboard={false}
          limit={4}
          page={1}
          sortBy="postedOn"
          sortOrder="desc"
        />
      )}
    </>
  );
};

export default Listings;
