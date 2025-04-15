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
  buttonSize:
    | keyof typeof BUTTON_SIZE.regular
    | keyof typeof BUTTON_SIZE.feed
    | keyof typeof BUTTON_SIZE.dashboard
    | keyof typeof ROUND_BUTTON_SIZE.regular
    | keyof typeof ROUND_BUTTON_SIZE.feed;
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

const BUTTON_SIZE = {
  regular: {
    xxLarge: `${styles.xxLarge}`,
    xLarge: `${styles.xLarge}`,
    large: `${styles.large}`,
    standard: `${styles.standard}`,
    medium: `${styles.medium}`,
    small: `${styles.small}`,
    tiny: `${styles.tiny}`,
    "": "",
  },
  feed: {
    xxLarge: `${styles.xxLargeFeed}`,
    xLarge: `${styles.xLargeFeed}`,
    large: `${styles.largeFeed}`,
    standard: `${styles.standardFeed}`,
    medium: `${styles.mediumFeed}`,
    small: `${styles.smallFeed}`,
    tiny: `${styles.tinyFeed}`,
    "": "",
  },
  dashboard: {
    xxLarge: `${styles.xxLargeDashboard}`,
    xLarge: `${styles.xLargeDashboard}`,
    large: `${styles.largeDashboard}`,
    standard: `${styles.standardFeed}`,
    medium: `${styles.mediumDashboard}`,
    small: `${styles.smallFeed}`,
    tiny: `${styles.tinyFeed}`,
    "": "",
  },
};

const ROUND_BUTTON_SIZE = {
  regular: {
    large: `${styles.roundLarge}`,
    standard: `${styles.roundStandard}`,
    small: `${styles.roundSmall}`,
    "": "",
  },
  feed: {
    large: `${styles.roundLarge}`,
    standard: `${styles.roundStandard}`,
    small: `${styles.roundSmall}`,
    "": "",
  },
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
  autoFocus = false,
  disabled = false,
  fontSize,
  ...otherProps
}: ButtonProps): JSX.Element => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  let sizeClass = "";
  if (buttonType === "round") {
   
    switch (buttonSize) {
      case "large":
        sizeClass = isSidebarOpen ? styles.roundLargeFeed : styles.roundLarge;
        break;
      case "standard":
        // 'standard' size is assumed to be valid only for round buttons
        sizeClass = isSidebarOpen
          ? styles.roundStandardFeed
          : styles.roundStandard;
        break;
      case "small":
        sizeClass = isSidebarOpen ? styles.roundSmallFeed : styles.roundSmall;
        break;
      // ... include any other 'round' specific sizes
      default:
        // For any non-specific round sizes, we default to regular button sizes
        sizeClass = isSidebarOpen
          ? BUTTON_SIZE.feed[buttonSize]
          : BUTTON_SIZE.regular[buttonSize];
    }
  } else {
    // Non-round buttons
    sizeClass = isSidebarOpen
      ? BUTTON_SIZE.feed[buttonSize]
      : dashboard 
      ? BUTTON_SIZE.dashboard[buttonSize]
      : BUTTON_SIZE.regular[buttonSize];
  }

// const round = buttonType === "round" ? styles.round : null

  return (
    <>
      <button
        className={`${styles.button} ${
          BUTTON_TYPE[buttonType] || ""
        } ${sizeClass} ${className}`}
        type={type}
        onClick={onClick}
        onBlur={onBlur}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        autoFocus={autoFocus}
        disabled={disabled}
        style={{fontSize: fontSize}}
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
