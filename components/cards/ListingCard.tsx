
import type { PortableTextBlock } from "sanity";
import ListingCardClient from "./ListingCardClient";
import ListingCardSkeleton from "../skeletons/ListingCardSkeleton";

type Props = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  listing: any | null;
  index: number;
  cardType: "expanded" | "box";
  id?: string | number;
  slug?: string;
  imageUrls: string[];
  title?: string;
  description?: string | PortableTextBlock[] | null;
  descriptionLength?: number;
  postAge?: string;
  price?: number;
  cardSize?: "large" | "standard" | "small";
  aspectRatios?: number[];
  width?: number;
  height?: number;
  isDashboard: boolean;
  isDeletable: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  avatar?: string;
  suburb?: string;
  city?: string;
};

const ListingCard: React.FC<Props> = ({
  category,
  listing,
  id,
  slug,
  index,
  aspectRatios,
  width,
  height,
  cardType,
  imageUrls,
  title,
  vehicleVariant,
  description,
  descriptionLength,
  postAge,
  price,
  cardSize = "standard",
  isDashboard,
  isDeletable,
  checkedColour,
  hoverColour,
  checkedHovered,
  avatar,
  city,
  suburb,
}) => {
  return (
    <div>
   
        <ListingCardClient
          category={category}
          listing={listing}
          id={id}
          slug={slug}
          index={index}
          aspectRatios={aspectRatios}
          width={width}
          height={height}
          cardType={cardType}
          imageUrls={imageUrls}
          title={title}
          vehicleVariant={vehicleVariant}
          description={description}
          descriptionLength={descriptionLength}
          postAge={postAge}
          price={price}
          cardSize={cardSize}
          isDashboard={isDashboard}
          isDeletable={isDeletable}
          checkedColour={checkedColour}
          hoverColour={hoverColour}
          checkedHovered={checkedHovered}
          avatar={avatar}
          city={city}
          suburb={suburb}
        />
    
    </div>
  );
};

export default ListingCard;
