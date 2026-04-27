import React from "react";
import styles from "./BoxCardDetails.module.scss";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
import Icon from "./Icon";

type DetailsProps = {
    site:
    | "oly"
    | "oly-properties"
    | "oly-auto"
    | "oly-hiring"
    | "oly-services"
    | "oly-shops"
    | "oly-agents"
    | "oly-dealerships";
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
  site,
  isCardHovered,
  title,
  description,
  price,
}) => {
  const truncateTitle = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  const getDetailsClass = () => {
    let className = styles.details;
    if ((site === "oly" || site === "oly-shops") && isCardHovered)
      className += ` ${styles.detailsHovered}`;
    if (site === "oly-properties") className += ` ${styles.property}`;
    if (site === "oly-auto") className += ` ${styles.vehicles}`;
    return className;
  };

  const renderContent = () => {
    if (site === "oly" || site === "oly-shops") {
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

    if (site === "oly-properties") {
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
    if (site === "oly-auto") {
      return (
        <>
          <div className={styles.titleAndPrice}>
            
            <p className={styles.title}><span>2018</span> {title && truncateTitle(title, 44)} </p>
            <p className={styles.price}>
              {price && Formatter.formatLargeNumber(price)}
            </p>
          </div>

          <div className={styles.locationContainer}>
            <div className={styles.city}>Sunnyside</div>
            <div className={styles.suburb}>PTA</div>
          </div>
          <div className={styles.vehicleSpecs}>
            <span>Used</span>
            <span>Automatic</span>  
            <span>10000km</span>
            <span>Petrol</span>
          </div>


          {/* <div className={styles.featuresWithIcons}>
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
          </div> */}
        </>
      );
    }

    return null;
  };

  return site === "oly" ||
    site === "oly-shops" ||
    site === "oly-properties" ||
    site === "oly-auto" ? (
    <div className={getDetailsClass()}>{renderContent()}</div>
  ) : null;
};
