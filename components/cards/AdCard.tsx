import styles from "./AdCard.module.scss";
import AdSkeleton from "../skeletons/AdSkeleton";
import AdCardClient from "./AdCardClient";
import type { PortableTextBlock } from "sanity";



type Props = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  ad: any | null;
  index: number;
  cardType: "expanded" | "box";
  id?: string | number;
  images?: string[];
  title?: string;
  description?: string | PortableTextBlock[] | null;
  descriptionLength?: number;
  postAge?: string;
  price?: number;
  cardSize?: "large" | "standard" | "small";
  aspectRatios?: number[];
  width?: number;
  height?: number;
  isFeed: boolean;
  isDashboard: boolean;
  isDeletable: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  avatar?: string;
  suburb?: string;
  city?: string;
};

const AdCard: React.FC<Props> = ({
  category,
  ad,
  id,
  index,
  aspectRatios,
  width,
  height,
  cardType,
  images,
  title,
  description = 230,
  descriptionLength,
  postAge,
  price,
  cardSize = "standard",
  isFeed,
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
      {!ad ? (
        <AdSkeleton orientation="portrait" cardSize={cardSize || "standard"} />
      ) : (
        <AdCardClient
          category={category}
          ad={ad}
          id={id}
          index={index}
          aspectRatios={aspectRatios}
          width={width}
          height={height}
          cardType={cardType}
          images={images}
          title={title}
          description={description}
          descriptionLength={descriptionLength}
          postAge={postAge}
          price={price}
          cardSize={cardSize}
          isFeed={isFeed}
          isDashboard={isDashboard}
          isDeletable={isDeletable}
          checkedColour={checkedColour}
          hoverColour={hoverColour}
          checkedHovered={checkedHovered}
          avatar={avatar}
          city={city}
          suburb={suburb}
        />
      )}
    </div>
  );
};

export default AdCard;
