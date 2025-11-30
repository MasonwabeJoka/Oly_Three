import React from "react";
import styles from "./ExpandedDetails.module.scss";
import Avatar from "@/components/Avatar";
import Checkbox from "./Checkbox";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
import Icon from "./Icon";

type ExpandedDetailsProps = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  isDeletable: boolean;
  id?: string;
  isFeed: boolean;
  checkedColour?: string;
  hoverColour?: string;
  checkedHovered?: string;
  avatar?: string;
  title?: string;
  vehicleVariant?: any;
  description?: string | null;
  descriptionLength?: number;
  suburb?: string;
  city?: string;
  price?: number;
  postAge?: string;
  isCardHovered: boolean;
};

const propertyAttributes = [
  {
    icon: "/icons/property/beds.png",
    alt: "BedsIcon",
    value: "3",
    label: "Beds",
    className: "beds",
  },
  {
    icon: "/icons/property/bathrooms.png",
    alt: "BathroomsIcon",
    value: "2",
    label: "Bathrooms",
    className: "bathrooms",
  },
  {
    icon: "/icons/property/landSize.png",
    alt: "LandSizeIcon",
    value: "100m²",
    label: "",
    className: "landSize",
  },
];

const PreventLinkClick = ({ children }: { children: React.ReactNode }) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  return (
    <div className={styles.childrenContainer} onClick={handleClick}>
      {children}
    </div>
  );
};

export const ExpandedDetails: React.FC<ExpandedDetailsProps> = ({
  category,
  isDeletable,
  id,
  isFeed,
  checkedColour,
  hoverColour,
  checkedHovered,
  avatar,
  title,
  description,
  suburb,
  city,
  price,
  postAge,
}) => {
  const truncateTitle = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) : text;

  const truncateDescription = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  const getDetailsClass = () => {
    let className = styles.details;
    if (category === "property") className += ` ${styles.property}`;
    return className;
  };

  const formatLocation = () => {
    if (!suburb && !city) return "";
    return `${suburb || ""}, ${city || ""}`;
  };

  return (
    <div className={getDetailsClass()}>
      {isDeletable && (
        <div className={styles.checkboxContainer}>
          <PreventLinkClick>
            <Checkbox
              className={styles.checkbox}
              id={id || ""}
              label=""
              isFeed={isFeed}
              checkedColour={checkedColour || ""}
              hoverColour={hoverColour || ""}
              checkedHovered={checkedHovered || ""}
            />
          </PreventLinkClick>
        </div>
      )}

      <div className={styles.infoSectionContainer}>
        <div className={styles.infoSection}>
          <div className={styles.topSection}>
            <Avatar
              className={styles.avatar}
              avatarSize="regular"
              avatar={avatar}
              isOnline={false}
            />
            <div className={styles.titleWrapper}>
              <p className={styles.title}>
                {category === "vehicles" && <span>2018</span>}{" "}
                {title && truncateTitle(title, 44)}
              </p>
              <div className={styles.location}>
                <p className={styles.locationText}>
                  {formatLocation()}
                  Sandton, JHB
                </p>
              </div>
              <div className={styles.postAge}>
                {/* {postAge && Formatter.formatRelativeTime(postAge)} */}
                12 June
              </div>
            </div>
          </div>

          <div className={styles.descriptionContainer}>
            <p className={styles.description}>
              {description && truncateDescription(description, 230)}
            </p>
          </div>

          <div className={styles.cardBottom}>
            <div className={styles.propertiesContainer}>
              {category === "property" && (
                <div className={styles.featuresWithIcons}>
                  {propertyAttributes.map(
                    ({ icon, alt, value, label, className }) => (
                      <div
                        key={alt}
                        className={`${styles.feature} ${styles[className]}`}
                      >
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
                    )
                  )}
                </div>
              )}
              {category === "vehicles" && (
                <div className={styles.vehicleSpecs}>
                  <span>Used</span> •<span>Automatic</span> •
                  <span>10000km</span> •<span>Petrol</span>
                </div>
              )}
            </div>

            <p className={styles.price}>
              {price && Formatter.formatPrice(price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
