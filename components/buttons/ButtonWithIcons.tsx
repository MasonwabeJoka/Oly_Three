import styles from "./ButtonWithIcons.module.scss";
import Image from "@/components/Image";

interface ButtonProps {
  className?: string;
  buttonChildren: any;
  buttonType: keyof typeof BUTTON_TYPE;
  buttonSize: keyof typeof BUTTON_SIZE;
  iconPosition: "left" | "right" | "leftRight";
  name: string;
  type: "button" | "submit" | "reset";
  ariaLabel: string;
  autoFocus: boolean;
  disabled: boolean;
  iconSrcLeft: string | "";
  iconSrcRight: string | "";
  width: number;
  height: number;
  form?: string;
  formAction?: string;
  formEncType?:
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain";
  formMethod?: "get" | "post";
  formNoValidate?: boolean;
  formTarget?: "_blank" | "_self" | "_parent" | "_top" | string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BUTTON_TYPE = {
  primary: `${styles.primary}`,
  normal: `${styles.normal}`,
  round: `${styles.round}`,
  outlined: `${styles.outlined}`,
  success: `${styles.success}`,
  warning: `${styles.warning}`,
  danger: `${styles.danger}`,
  info: `${styles.info}`,
  link: `${styles.linkBtn}`,
  icon: `${styles.icon}`,
  filter: `${styles.filter}`,
  sort: `${styles.sort}`,
  listingOption: `${styles.listingOption}`,
  bidBuy: `${styles.bidBuy}`,
};

const BUTTON_SIZE = {
  large: `${styles.large}`,
  medium: `${styles.medium}`,
  small: `${styles.small}`,
  "": "",
};

const ButtonWithIcons = ({
  type,
  ariaLabel,
  buttonChildren,
  buttonSize,
  buttonType,
  iconPosition,
  className,
  onClick,
  autoFocus = false,
  disabled = false,
  iconSrcLeft,
  iconSrcRight,
  width,
  height,
  ...otherProps
}: ButtonProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <button
        className={`${buttonType ? BUTTON_TYPE[buttonType] : ""} ${
          buttonSize ? BUTTON_SIZE[buttonSize] : ""
        } ${className}`}
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        autoFocus={autoFocus}
        disabled={disabled}
        {...otherProps}
      >
        {iconPosition === "right" ? (
          <>
            {buttonChildren}{" "}
            <Image
              src={iconSrcRight}
              alt={`${ariaLabel} Icon}`}
              width={width}
              height={height}
            />
          </>
        ) : iconPosition === "leftRight" ? (
          <>
            <Image
              src={iconSrcLeft}
              alt={`${ariaLabel} Icon}`}
              width={width}
              height={height}
            />{" "}
            {buttonChildren}
            <Image
              src={iconSrcRight}
              alt={`${ariaLabel} Icon}`}
              width={width}
              height={height}
            />
          </>
        ) : (
          <>
            <Image
              src={iconSrcLeft}
              alt={`${ariaLabel} Icon}`}
              width={width}
              height={height}
            />{" "}
            {buttonChildren}
          </>
        )}
      </button>
    </div>
  );
};

export default ButtonWithIcons;

{
  /* <Button
  className={styles.facebook}
  buttonChildren="Facebook"
  buttonType={icon}
  buttonSize={small}
  name="facebook_icon"
  type="button"
  ariaLabel="Facebook Icon"
  autoFocus={false}
  disabled={false}
/>; */
}
