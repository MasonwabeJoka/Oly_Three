import React from "react";
import styles from "./BoxCardDetails.module.scss";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
import { PortableTextBlock } from "sanity";
import Icon from "./Icon";

type DetailsProps = {
  category: "all" | "property" | "vehicle" | "service" | "job";
  isCardHovered: boolean;
  title?: string;
  description?: string | PortableTextBlock[] | null;
  price?: number;
  postAge?: string;
};
// change the colour of property card icons to $black-four
export const BoxCardDetails: React.FC<DetailsProps> = ({
  category,
  isCardHovered,
  title,
  description,
  price,
  postAge,
}) => {
  const descriptionString = description && description[0]?.children[0]?.text;

  return category === "all" ? (
    <>
      {!isCardHovered ? (
        <div className={styles.details}>
          <div className={styles.titleDescription}>
            <p className={styles.title}>
              {title
                ? title.length > 64
                  ? `${title.slice(0, 64)}...`
                  : title
                : ""}
            </p>
          </div>
          <p className={styles.price}>
            {price ? Formatter.formatLargeNumber(price) : ""}
          </p>
        </div>
      ) : (
        <div className={`${styles.details} ${styles.detailsHovered}`}>
          <div className={styles.titleDescription}>
            <p className={styles.title}>{title?.slice(0, 96)}</p>
            <p className={styles.description}>{descriptionString}</p>
          </div>
          <h3 className={styles.price}>
            {price
              ? Formatter.formatPrice(price, {
                  showCurrency: false,
                  formatMillions: false,
                  formatThousands: false,
                })
              : ""}
          </h3>
        </div>
      )}
    </>
  ) : category === "property" ? (
    <div
      className={styles.details}
      style={{
        display: "flex",
        flexDirection: "column",
        height: category === "property" ? "132px" : "96px",
      }}
    >
      <div className={styles.titlePrice}>
        <p className={styles.title}>
          {title
            ? title.length > 44
              ? `${title.slice(0, 44)}...`
              : title
            : ""}
        </p>
        <p className={styles.price}>
          {price ? Formatter.formatLargeNumber(price) : ""}
        </p>
      </div>

      <div className={styles.locationContainer}>
        <div className={styles.city}>Sunnyside</div>
        <div className={styles.suburb}>PTA</div>
      </div>
      <div className={styles.featuresWithIcons}>
        <div className={`${styles.feature} ${styles.beds}`}>
          <Icon
            src="/icons/property/beds.png"
            alt="BedsIcon"
            width={16}
            height={16}
          />
          <p>
            <span style={{ marginRight: "0.2rem" }}>3</span>Beds
          </p>
        </div>
        <div className={`${styles.feature} ${styles.bathrooms}`}>
          <Icon
            src="/icons/property/bathrooms.png"
            alt="BathroomsIcon"
            width={16}
            height={16}
          />
          <p>
            <span style={{ marginRight: "0.2rem" }}>2</span>Bathrooms
          </p>
        </div>
        <div className={`${styles.feature} ${styles.landSize}`}>
          <Icon
            src="/icons/property/landSize.png"
            alt="LandSizeIcon"
            width={16}
            height={11}
          />
          <p>100m²</p>
        </div>
      </div>
    </div>
  ) : null;
};
