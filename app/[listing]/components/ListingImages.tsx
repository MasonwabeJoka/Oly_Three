import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "./ListingImages.module.scss";
import Gallery from "@/components/Gallery";
import { Ad } from "@/sanity/Types/Ad";
import ImageGallery from "@/components/ImageGallery";
import { imagesData } from "@/data/galleryImages";

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "#" },
  { id: 2, name: "Properties For Sale", href: "#" },
  { id: 3, name: "Gauteng", href: "#" },
  { id: 4, name: "Bryanston", href: "#" },
];

type ListingImagesProps = {
  id: string | undefined;
  images?: Ad["images"] | undefined;
  aspectRatios: (number | undefined)[] | undefined;
  onClick: () => void;
};
const ListingImages = ({
  id,
  images,
  aspectRatios,
  onClick,
}: ListingImagesProps) => {
  return (
    <div className={styles.listingImages}>
      <div className={styles.galleryContainer}>
        <div className={styles.breadcrumbsContainer}>
          <Breadcrumbs
            homeBreadcrumb={BREADCRUMBS[0]}
            firstBreadcrumb={BREADCRUMBS[1]}
            secondBreadcrumb={BREADCRUMBS[2]}
            searchResult={BREADCRUMBS[3]}
          />
        </div>
        <div className={styles.gallery}>

          <ImageGallery
            id={id ? id : ""}
            // images={images ? images : []}
            images={imagesData}
            onClick={onClick}
            aspectRatios={aspectRatios ? aspectRatios : []}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingImages;
