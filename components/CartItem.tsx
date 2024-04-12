import { Ad } from "@/payload.types";
import styles from "./CartItem.module.scss";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { AD_CATEGORIES } from "@/config";
import Button from "./Buttons";
import { useCart } from "@/store/useCart";
import * as Formatter from "@/utils/formatterFunctions/Formatter";

const CartItem = ({ ad }: { ad: Ad }) => {
  const { image } = ad.images[0];

  const label = AD_CATEGORIES.find(({ value }) => value === ad.category)?.label;

  const { removeItem } = useCart();

  const fee = 5;
  function parseToNumber(input: string | number): number {
    if (typeof input === "number") return input;
    const cleanedInput = input.replace(/[^\d.-]/g, "");
    const number = parseFloat(cleanedInput);
    return isNaN(number) ? 0 : number;
  }
  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof image !== "string" && image?.url ? (
              <Image
                src={image.url}
                alt={ad.title}
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden
                  className="h4 w-4 text-muted-foreground"
                />
              </div>
              //   <div className={styles.imagePlaceholder}></div>
            )}
          </div>
        </div>
        <div className="flex flex-col self-start">
          <span className="line-clamp-1 text-sm font-medium mb-1">
            {ad.title}
          </span>
          <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
            {label}
          </span>
          <div className="mt-4 text-xs text-muted-foreground">
            <Button
              // className={styles.removeButton}
              className="flex items-center gap-0.5"
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
              onClick={() => removeItem(ad.id)}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {Formatter.formatPrice(parseToNumber(ad.price))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
