"use client";

import styles from "./Cart.module.scss";
import Button from "@/components/Buttons";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
import CartItem from "@/app/[listing]/components/CartItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useCart } from "../store/useCart";
import { PaymentFormWrapper } from "../PaymentFormWrapper";
// TODO: If cart is empty change button form Proceed To Payments to a Back button for example
const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;
  const fee = 1;
  const total = items.reduce((total, { ad }) => total + ad.price, 0) + fee;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <PaymentFormWrapper title="Cart">
      <div className={styles.container}>
        {isClient && items.length > 0 ? (
          <>
            <div className={styles.ItemsCount}>Items: {itemCount}</div>
            <ul className={styles.items}>
              <ScrollArea>
                <li key={item.ad._id}>

                {items.map((item) => (
                  <CartItem  ad={item.ad} />
                ))}
                </li>
              </ScrollArea>
            </ul>
            <div className={styles.transactionSummaryContainer}>
              <h2>TransactionSummary</h2>
              <div className={styles.transactionFeeContainer}>
                <div className={styles.transactionFeeLabel}>TransactionFee</div>
                <div className={styles.transactionFee}>
                  {fee
                    ? Formatter.formatPrice(fee, {
                        showCurrency: false,
                        formatMillions: false,
                        formatThousands: false,
                      })
                    : ""}
                </div>
              </div>
              <div className={styles.totalContainer}>
                <div className={styles.totalLabel}>Total</div>
                <div className={styles.total}>
                  {total
                    ? Formatter.formatPrice(total, {
                        showCurrency: false,
                        formatMillions: false,
                        formatThousands: false,
                      })
                    : ""}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Cart is empty</p>
        )}

        {/* <div className={styles.button}>
        <Button
          className={styles.buyButton}
          buttonChildren="Proceed To Payments"
          buttonType="primary"
          buttonSize="medium"
          name="buy-btn"
          type="button"
          ariaLabel="Buy Button"
          autoFocus={false}
          disabled={false}
          ariaHidden={false}
          // onClick={confirmPurchase}
        />
      </div> */}
      </div>
    </PaymentFormWrapper>
  );
};

export default Cart;
