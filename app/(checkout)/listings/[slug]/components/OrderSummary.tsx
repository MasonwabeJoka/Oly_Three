"use client";
import styles from "./OrderSummary.module.scss";
import { formatPrice } from "@/utils/formatterFunctions/Formatter";
import { OrderSummaryTypes } from "../data/order-summary";

const OrderSummary = ({
  itemTitle,
  sellerName,
  phoneNumber,
  location,
  price,
  total,
  notes,
}: OrderSummaryTypes) => {
  return (
    <div className={styles.container}>
      <p className={styles.itemTitle}>{itemTitle}</p>

      <div className={styles.priceContainer}>
        <div className={styles.totalPrice}>
          {formatPrice(total, {
            showCents: true,
            formatThousands: false,
            formatMillions: false,
          })}
        </div>
        <div className={styles.price}>
          {formatPrice(price, {
            showCents: true,
            formatThousands: false,
            formatMillions: false,
          })}{" "}
          <span className={styles.platformFee}>+Transaction Fees</span>
        </div>
      </div>
      {/* <div className={styles.sellerInfo}>
        <p className={styles.sellerName}>{sellerName}</p>
        <p className={styles.phoneNumber}>{phoneNumber}</p>
        <p  className={styles.location}>{location}</p>
      </div> */}

      <div className={styles.notesContainer}>
        <ul>
          {notes?.map((n, i) => (
            <li key={`${i}-${n}`}>{n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderSummary;
