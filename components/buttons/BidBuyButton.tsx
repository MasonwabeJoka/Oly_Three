import styles from "./BidBuyButton.module.scss";
import { UIData } from "@/data/UIData";
import Button from "../Button";

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
        children={buttonChildren}
        buttonSize={small}
        buttonVariant="normal"
        name={name}
        type="submit"
        ariaLabel={ariaLabel}
        autoFocus={autoFocus}
        isDisabled={disabled}
        formTarget="_blank"
        {...otherProps}
      />
    </div>
  );
};

export default BidBuyButton;
