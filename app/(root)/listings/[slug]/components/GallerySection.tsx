import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "./GallerySection.module.scss";
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


type Image = {
  id?: string;
  url?: string;
  width?: number;
  height?: number;
  alt?: string;
  aspectRatio?: number;
};
type Props = {
  images: Image[];
};
const GallerySection = ({
  images,
}: Props) => {




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


