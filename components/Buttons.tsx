"use client";
import styles from "./Buttons.module.scss";
import useSidebarStore from "@/store/useSidebarStore";
import React, { ButtonHTMLAttributes } from "react";

//Todo: Change Button colour to $back-four on hover or if primary button.
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  buttonChildren: any;
  dashboard?: boolean;
  buttonType: keyof typeof BUTTON_TYPE;
  buttonSize: "large" | "medium" | "small" | "tiny";
  name: string;
  type: "button" | "submit" | "reset";
  ariaLabel?: string;
  ariaHidden?: boolean;
  autoFocus: boolean;
  disabled?: boolean;
  inputDescription?: string;
  fontSize?: string;
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
  onDoubleClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onMouseDown?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseEnter?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onMouseLeave?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  // onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onContextMenu?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onDragStart?: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDragEnd?: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDragOver?: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDragEnter?: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLButtonElement>) => void;
  onAnimationStart?: (event: React.AnimationEvent<HTMLButtonElement>) => void;
  onAnimationEnd?: (event: React.AnimationEvent<HTMLButtonElement>) => void;
  onAnimationIteration?: (
    event: React.AnimationEvent<HTMLButtonElement>
  ) => void;
  onTransitionEnd?: (event: React.TransitionEvent<HTMLButtonElement>) => void;
}

const BUTTON_TYPE = {
  primary: `${styles.primary}`,
  normal: `${styles.normal}`,
  outlined: `${styles.outlined}`,
  success: `${styles.success}`,
  warning: `${styles.warning}`,
  danger: `${styles.danger}`,
  info: `${styles.info}`,
  link: `${styles.linkBtn}`,
  icon: `${styles.icon}`,
  round: `${styles.round}`,
  tab: `${styles.tab}`,
  filter: `${styles.filter}`,
  sort: `${styles.sort}`,
  listingOption: `${styles.listingOption}`,
  add: `${styles.add}`,
  roundLargeFeed: `${styles.roundLargeFeed}`,
  roundLarge: `${styles.roundLarge}`,
  roundLargeMobile: `${styles.roundLargeMobile}`,
  roundStandardFeed: `${styles.roundStandardFeed}`,
  roundStandard: `${styles.roundStandard}`,
  roundStandardMobile: `${styles.roundStandardMobile}`,
  roundSmallFeed: `${styles.roundSmallFeed}`,
  roundSmall: `${styles.roundSmall}`,
  roundSmallMobile: `${styles.roundSmallMobile}`,
  exit: `${styles.exit}`,
  exitFeed: `${styles.exitFeed}`,
  exitMobile: `${styles.exitMobile}`,
  bidBuy: `${styles.bidBuy}`,
};

const Button = ({
  type,
  ariaLabel,
  ariaHidden = false,
  buttonChildren,
  buttonSize,
  buttonType,
  className,
  dashboard,
  onClick,
  onBlur,
  onKeyDown,
  autoFocus = false,
  disabled = false,
  fontSize,
  ...otherProps
}: ButtonProps): JSX.Element => {
  let sizeClass = "";
  switch (buttonSize) {
    case "medium":
      sizeClass = !dashboard
        ? styles.mediumButton
        : styles.mediumDashboardButton;
      break;
    case "small":
      sizeClass = !dashboard ? styles.smallButton : styles.smallDashboardButton;
      break;
    case "tiny":
      sizeClass = !dashboard ? styles.tinyButton : styles.tinyDashboardButton;
      break;
    default:
      sizeClass = !dashboard ? styles.largeButton : styles.largeDashboardButton;
  }

  let roundButtonSize = "";
  if (buttonType === "round") {
    switch (buttonSize) {
      case "large":
        roundButtonSize = styles.roundLarge;
        break;
      case "medium":
        roundButtonSize = styles.roundMedium;
        break;
      case "small":
        roundButtonSize = styles.roundSmall;
        break;
      default:
        roundButtonSize = styles.roundStandard;
    }
  }

  return (
    <>
      <button
        className={`${roundButtonSize} ${sizeClass} ${styles.button} ${
          BUTTON_TYPE[buttonType] || ""
        } ${className || ""}`}
        type={type}
        onClick={onClick}
        onBlur={onBlur}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        autoFocus={autoFocus}
        disabled={disabled}
        style={{ fontSize: fontSize }}
        {...otherProps}
      >
        {buttonChildren}
      </button>
    </>
  );
};

export default Button;

{
  /* 
  <Button
    className={styles.proceedButton}
    buttonChildren="Proceed"
    buttonType="normal"
    buttonSize="large"
    name="proceed-btn"
    type="button"
    ariaLabel="Proceed Button"
    autoFocus={false}
    disabled={false}
/>; 
*/
}
