import styles from "./ListingsCollage.module.scss";
import { useEffect, useState } from "react";
import AdCard from "@/components/AdCard";
import Masonry from "react-masonry-css";
import { fetchAds } from "@/sanity/actions/adsActions";
import { fetchListings } from "@/utils/serverActions/sanityActions";
import { categoriesArray } from "@/utils/categoriesArray";
import useSidebarStore from "@/store/useSidebarStore";
import useIsDashboardStore from "@/store/isDashboardStore";
import Link from "next/link";

type ImageMetadata = {
  dimensions: {
    width: number;
    height: number;
    aspectRatio: number;
  };
};

type AssetReference = {
  _ref: string;
  _type: string;
  url: string;
  metadata: ImageMetadata;
};

type Image = {
  _key: string;
  _type: string;
  alt: string;
  asset: AssetReference;
};

type Ad = {
  _createdAt: string; // or Date if you prefer to work with Date objects
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string; // or Date
  description: string;
  images: Image[];
  price: number;
  title: string;
};
type ListingsCollageProps = {
  isDeletable: boolean;
  checkedColour: string;
  hoverColour: string;
  checkedHovered: string;
};

const ListingsCollage = ({
  isDeletable,
  checkedColour,
  hoverColour,
  checkedHovered,
}: ListingsCollageProps) => {
  const [imagesData, setImagesData] = useState<any[]>([]);
  const [adData, setAdData] = useState<Ad[]>([]);
  const [adDocuments, setAdDocuments] = useState<any>(null);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isDashboard = useIsDashboardStore((state) => state.isDashboard);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchListings();
        if (data) {
          setImagesData(data);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const adsFunction = async () => {
      const ads = await fetchAds();
      setAdData(ads);
    };

    adsFunction();
  }, []);

  useEffect(() => {
    const documentsFunction = async () => {
      setAdDocuments(categoriesArray);
    };

    documentsFunction();
  }, []);

  const breakpointColumnsObj = {
    default: isSidebarOpen ? 3 : 4,
    1399: isSidebarOpen ? 3 : 4,
    1023: 2,
    639: 1,
  };

  // Convert array to JSX items
  const cards = adData.map((ad) => {
    return (
      <Link href={`/ad/${ad._id}`} className={styles.card} key={ad._id}>
        <AdCard
          id={ad._id}
          cardType="box"
          images={ad.images[0].asset.url}
          title="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit."
          price={ad.price}
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam voluptatibus ipsa quibusdam. Consequuntur dolorum minus quasi assumenda adipisci ab, delectus eligendi sed quo veniam distinctio officia maxime reiciendis earum sit labore, placeat ad eveniet perferendis accusamus dolore illo eius cum suscipit? Enim necessitatibus odio recusandae commodi iure explicabo cupiditate cumque."
          isDeletable={isDeletable}
          isDashboard={isDashboard}
          isFeed={isSidebarOpen}
          checkedColour={checkedColour}
          hoverColour={hoverColour}
          checkedHovered={checkedHovered}
        />
      </Link>
    );
  });

  return (
    <Masonry
      className={styles.listingsContainer}
      breakpointCols={breakpointColumnsObj}
      columnClassName={styles.listingsContainerColumns}
    >
      {cards}
    </Masonry>
  );
};

export default ListingsCollage;
