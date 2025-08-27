import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "./GallerySection.module.scss";
import Gallery from "@/components/Gallery";
import { Ad } from "@/sanityTemp/Types/Ad";
import ImageGallery from "@/components/ImageGallery";
import { imagesData } from "@/data/galleryImages";
import PostMetrics from "./PostMetrics";
import { useState } from "react";

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "#" },
  { id: 2, name: "Properties For Sale", href: "#" },
  { id: 3, name: "Gauteng", href: "#" },
  { id: 4, name: "Bryanston", href: "#" },
];

type Props = {

  images?: Ad["images"] | undefined;


};
const GallerySection = ({

  images


}: Props) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
    const handleIconClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  const getImageSrc = () => {
    if (isHeartClicked) return "/icons/heart-clicked.svg";
    if (isHeartHovered) return "/icons/heart-hover.svg";
    return "/icons/heart.svg";
  };

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
          <ImageGallery images={imagesData}/>
        </div>
        <PostMetrics/>
      </div>
    </div>
  );
};

export default GallerySection;


