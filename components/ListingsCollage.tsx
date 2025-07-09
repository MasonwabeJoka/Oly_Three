import styles from "./ListingsCollage.module.scss";
import ListingsCollageClient from "./ListingsCollageClient";

type ListingsCollageProps = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  images: string[][];
  isDeletable?: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  isDashboard: boolean;
  isFeed?: boolean;
  cardSize?: "standard" | "small" | "large";
  limit: number;
  page?: number;
  sortOrder: "asc" | "desc";
  sortBy: string;
};

const ListingsCollage = ({
  category,
  images,
  isDeletable = false,
  checkedColour,
  hoverColour,
  checkedHovered,
  isDashboard,
  isFeed,
  cardSize,
  limit,
  page = 1,
  sortOrder,
  sortBy,
}: ListingsCollageProps) => {
  return (
    <>
      {category === "all" && (
        <section className={styles.container}>
          <ListingsCollageClient
            category={category}
            images={images}
            isDeletable={isDeletable}
            checkedColour={checkedColour}
            hoverColour={hoverColour}
            checkedHovered={checkedHovered}
            isDashboard={isDashboard}
            isFeed={isFeed}
            cardSize={cardSize}
            limit={limit}
            page={page}
            sortOrder={sortOrder}
            sortBy={sortBy}
          />
        </section>
      )}
      {category === "property" && (
        <section className={styles.container}>
          <ListingsCollageClient
            category={category}
            images={images}
            isDeletable={isDeletable}
            checkedColour={checkedColour}
            hoverColour={hoverColour}
            checkedHovered={checkedHovered}
            isDashboard={isDashboard}
            isFeed={isFeed}
            cardSize={cardSize}
            limit={limit}
            page={page}
            sortOrder={sortOrder}
            sortBy={sortBy}
          />
        </section>
      )}
    </>
  );
};

export default ListingsCollage;