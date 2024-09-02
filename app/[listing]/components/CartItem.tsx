import { Ad } from "@/sanity/Types/Ad";
import styles from "./CartItem.module.scss";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import Button from "../../../components/Buttons";
import { useCart } from "@/store/useCart";
import * as Formatter from "@/utils/formatterFunctions/Formatter";

const CartItem = ({ ad }: { ad: Ad }) => {
  const { url: imageUrl } = ad.images[0];

  const { removeItem } = useCart();

  const fee = 5;
  function parseToNumber(input: string | number): number {
    if (typeof input === "number") return input;
    const cleanedInput = input.replace(/[^\d.-]/g, "");
    const number = parseFloat(cleanedInput);
    return isNaN(number) ? 0 : number;
  }
  return (
    <div className={styles.container}>
      <div className={styles.itemWrapper}>
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={ad.title}
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                <ImageIcon aria-hidden className={styles.imageIcon} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.adDetails}>
          <span className={styles.adTitle}>{ad.title}</span>
          <div className={styles.removeButtonContainer}>
            <Button
              className={styles.removeButton}
              buttonChildren={
                <>
                  <X className="w-3 h-3" /> Remove
                </>
              }
              buttonType="icon"
              buttonSize="medium"
              name="remove-btn"
              type="button"
              ariaLabel="Remove Button"
              autoFocus={false}
              disabled={false}
              onClick={() => removeItem(ad._id)}
            />
          </div>
        </div>
        <div className={styles.adPrice}>
          <span className="ml-auto line-clamp-1 text-sm">
            {ad.price
              ? Formatter.formatPrice(ad.price, {
                  showCurrency: false,
                  formatMillions: false,
                  formatThousands: false,
                })
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
