import React from "react";
import styles from "./BoxCardDetails.module.scss";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
import Icon from "./Icon";

type DetailsProps = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  isCardHovered: boolean;
  title?: string;
  description?: string;
  descriptionLength?: number;
  price?: number;
  postAge?: string;
};

const FEATURES = [
  {
    icon: "/icons/property/beds.png",
    alt: "BedsIcon",
    value: "3",
    label: "Beds",
    className: styles.beds,
  },
  {
    icon: "/icons/property/bathrooms.png",
    alt: "BathroomsIcon",
    value: "2",
    label: "Bathrooms",
    className: styles.bathrooms,
  },
  {
    icon: "/icons/property/landSize.png",
    alt: "LandSizeIcon",
    value: "100m²",
    label: "",
    className: styles.landSize,
  },
];

export const BoxCardDetails: React.FC<DetailsProps> = ({
  category,
  isCardHovered,
  title,
  description,
  price,
}) => {
  const truncateTitle = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  const getDetailsClass = () => {
    let className = styles.details;
    if ((category === "all" || category === "shops") && isCardHovered)
      className += ` ${styles.detailsHovered}`;
    if (category === "property") className += ` ${styles.property}`;
    return className;
  };

  const renderContent = () => {
    if (category === "all" || category === "shops") {
      const titleLength = isCardHovered ? 96 : 64;
      const PriceTag = isCardHovered ? "h3" : "p";

      return (
        <>
          <div className={styles.titleAndDescription}>
            <p className={styles.title}>
              {title && truncateTitle(title, titleLength)}
            </p>
            {isCardHovered && description && (
              <p className={styles.description}>{description}</p>
            )}
          </div>
          <PriceTag className={styles.price}>
            {price &&
              (isCardHovered
                ? Formatter.formatPrice(price, {
                    showCurrency: false,
                    formatMillions: false,
                    formatThousands: false,
                  })
                : Formatter.formatLargeNumber(price))}
          </PriceTag>
        </>
      );
    }

    if (category === "property") {
      return (
        <>
          <div className={styles.titleAndPrice}>
            <p className={styles.title}>{title && truncateTitle(title, 44)}</p>
            <p className={styles.price}>
              {price && Formatter.formatLargeNumber(price)}
            </p>
          </div>

          <div className={styles.locationContainer}>
            <div className={styles.city}>Sunnyside</div>
            <div className={styles.suburb}>PTA</div>
          </div>

          <div className={styles.featuresWithIcons}>
            {FEATURES.map(({ icon, alt, value, label, className }) => (
              <div key={alt} className={`${styles.feature} ${className}`}>
                <Icon
                  src={icon}
                  alt={alt}
                  width={16}
                  height={alt === "LandSizeIcon" ? 11 : 16}
                />
                <p>
                  {label && (
                    <span className={styles.featureValue}>{value}</span>
                  )}
                  {label || value}
                </p>
              </div>
            ))}
          </div>
        </>
      );
    }

    return null;
  };

  return category === "all" ||
    category === "shops" ||
    category === "property" ? (
    <div className={getDetailsClass()}>{renderContent()}</div>
  ) : null;
};
