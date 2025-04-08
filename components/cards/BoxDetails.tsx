
import React from "react";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
import styles from "./AdCard.module.scss";
import { Ad } from "./AdCardTypes";
interface Props {
  ad: Ad;
  isCardHovered: boolean;
}

const BoxDetails: React.FC<Props> = ({ ad, isCardHovered }) => {
//   const descriptionString = ad.description?.[0]?.children?.[0]?.text || "";
  const descriptionString = "abc defg hijklmnopqrstuvwxyz";

  return (
    <div
      className={`${styles.details} ${isCardHovered ? styles.detailsHovered : ""}`}
    >
      <div className={styles.titleDescription}>
        <p className={styles.title}>
          {isCardHovered
            ? ad.title.length > 96
              ? `${ad.title.slice(0, 96)}...`
              : ad.title
            : ad.title.length > 64
              ? `${ad.title.slice(0, 64)}...`
              : ad.title}
        </p>
        {isCardHovered && (
          <p className={styles.description}>{descriptionString}</p>
        )}
      </div>
      <h3 className={styles.price}>
        {ad.price
          ? isCardHovered
            ? Formatter.formatPrice(ad.price, {
                showCurrency: false,
                formatMillions: false,
                formatThousands: false,
              })
            : Formatter.formatLargeNumber(ad.price)
          : ""}
      </h3>
    </div>
  );
};

export default BoxDetails;