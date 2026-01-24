"use client";
import styles from "./Buttons.module.scss";
import useSidebarStore from "@/store/useSidebarStore";
import React, { ButtonHTMLAttributes } from "react";
import { Button as ShadcnButton } from "@/components/ui/button";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  buttonChildren: any;
  dashboard?: boolean;
  buttonType: keyof typeof BUTTON_TYPE;
  buttonSize: "large" | "medium" | "small" | "tiny" | "";
  name: string;
  type: "button" | "submit" | "reset";
  ariaLabel?: string;
  ariaHidden?: boolean;
  autoFocus: boolean;
  disabled?: boolean;
  inputDescription?: string;
  ariaDescribedBy?: string;
  ariaPressed?: boolean;
  ariaExpanded?: boolean;
  ariaControls?: string;
  role?: string;
  tabIndex?: number;
  fontSize?: string;
  style?: React.CSSProperties;
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
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onMouseDown?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseEnter?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onMouseLeave?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  // onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onContextMenu?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
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
    event: React.AnimationEvent<HTMLButtonElement>,
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

const Button: React.FC<ButtonProps> = ({
  type,
  ariaLabel,
  ariaHidden = false,
  buttonChildren,
  buttonSize,
  buttonType,
  className,
  dashboard,
  name,
  onClick,
  onBlur,
  onKeyDown,
  autoFocus = false,
  disabled = false,
  fontSize,
  style,
  ariaDescribedBy,
  ariaPressed,
  ariaExpanded,
  ariaControls,
  role,
  tabIndex,

  ...otherProps
}) => {
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // Enhanced keyboard navigation
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!disabled && onClick) {
        onClick(event as any);
      }
    }
    onKeyDown?.(event);
  };

  const buttonId = `button-${buttonType}-${name
    .replace(/\s+/g, "-")
    .toLowerCase()}`;

  const accessibleLabel =
    ariaLabel ||
    (typeof buttonChildren === "string"
      ? buttonChildren
      : `${buttonType} button`);

  return (
    <>
      <ShadcnButton
        type={type}
        onClick={onClick}
        onBlur={onBlur}
        aria-label={accessibleLabel}
        aria-hidden={ariaHidden}
        autoFocus={autoFocus}
        disabled={disabled}
        style={{ display: "none" }}
        {...otherProps}
      >
        {buttonChildren}
      </ShadcnButton>
      <button
        id={buttonId}
        className={`${roundButtonSize} ${sizeClass} ${styles.button} ${
          BUTTON_TYPE[buttonType] || ""
        } ${className || ""}`}
        type={type}
        onClick={onClick}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        aria-label={accessibleLabel}
        aria-describedby={ariaDescribedBy}
        aria-pressed={ariaPressed}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        aria-hidden={ariaHidden}
        role={role}
        tabIndex={disabled ? -1 : (tabIndex ?? 0)}
        autoFocus={autoFocus}
        disabled={disabled}
        style={{ fontSize: fontSize, ...style }}
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
