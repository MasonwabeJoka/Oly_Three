"use client";

import React from "react";
import styles from "./Button.module.scss";
import { Button as ReactAriaButton } from "react-aria-components";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  dashboard?: boolean;

  buttonSize?: "large" | "medium" | "small" | "tiny";
  buttonVariant?: keyof typeof BUTTON_VARIANT;
  buttonShape?: keyof typeof BUTTON_SHAPE;

  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  isPending?: boolean;
  isDisabled?: boolean;
  spinnerAriaLabel?: string;
  autoFocus?: boolean;

  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaDetails?: string;
  ariaPressed?: boolean;
  ariaExpanded?: boolean;
  ariaControls?: string;
}

const BUTTON_VARIANT = {
  primary: styles.primary,
  normal: styles.normal,
  outlined: styles.outlined,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  info: styles.info,
  link: styles.linkBtn,
};

const BUTTON_SHAPE = {
  normal: styles.normalShape,
  round: styles.round,
};

const Button = ({
  children,
  buttonSize = "large",
  buttonVariant = "normal",
  buttonShape = "normal",
  isPending = false,
  isDisabled = false,
  spinnerAriaLabel = "Processing...",
  onClick,
  ...props
}: ButtonProps) => {
  let sizeClass = "";
  switch (buttonSize) {
    case "medium":
      sizeClass = !props.dashboard
        ? styles.mediumButton
        : styles.mediumDashboardButton;
      break;
    case "small":
      sizeClass = !props.dashboard
        ? styles.smallButton
        : styles.smallDashboardButton;
      break;
    case "tiny":
      sizeClass = !props.dashboard
        ? styles.tinyButton
        : styles.tinyDashboardButton;
      break;
    default:
      sizeClass = !props.dashboard
        ? styles.largeButton
        : styles.largeDashboardButton;
  }

  let roundButtonSize = "";
  if (buttonShape === "round") {
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
    <ReactAriaButton
      className={`${roundButtonSize} ${sizeClass} ${styles.button} ${
        BUTTON_VARIANT[buttonVariant] || ""
      } ${props.className || ""}`}
      buttonVariant={buttonVariant}
      buttonSize={buttonSize}
      buttonShape={buttonShape}
      dashboard={props.dashboard}
      onPress={onClick}
      isDisabled={isDisabled || isPending}
      autoFocus={props.autoFocus}
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledBy}
      aria-describedby={props.ariaDescribedBy}
      aria-details={props.ariaDetails}
      aria-pressed={props.ariaPressed}
      aria-expanded={props.ariaExpanded}
      aria-controls={props.ariaControls}
    >
      {isPending ? (
        <LoadingSpinner size={4} spinnerAriaLabel={spinnerAriaLabel} />
      ) : (
        children
      )}
    </ReactAriaButton>
  );
};

export default Button;
