import styles from "./BidBuyButton.module.scss";
import { UIData } from "@/data/UIData";
import Button from "../Buttons";

interface bidBuyButtonProps {
  className: string;
  buttonChildren: string;
  name: string;
  ariaLabel: string;
  autoFocus: boolean;
  disabled: boolean;
  amount: number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BidBuyButton = ({
  className,
  buttonChildren,
  name,
  ariaLabel,
  autoFocus,
  disabled,
  amount,
  ...otherProps
}: bidBuyButtonProps) => {
  const { small, bidBuy } = UIData;
  return (
    <div className={styles.container}>
      <div className={styles.amount}>R{amount}</div>
      <Button
        className={`${className} ${styles.button}`}
        buttonChildren={buttonChildren}
        buttonSize={small}
        buttonType={bidBuy}
        name={name}
        type="submit"
        ariaLabel={ariaLabel}
        autoFocus={autoFocus}
        disabled={disabled}
        formTarget="_blank"
        {...otherProps}
      />
    </div>
  );
};

export default BidBuyButton;
