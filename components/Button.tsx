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
  roundButtonSize?: "large" | "medium" | "small";

  buttonVariant?: keyof typeof BUTTON_VARIANT;
  buttonShape?: keyof typeof BUTTON_SHAPE;
  slot?: string;
  type?: "button" | "submit" | "reset";
  form?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  isPending?: boolean;
  isDisabled?: boolean;
  spinnerAriaLabel?: string;
  autoFocus?: boolean;

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
  icon: styles.icon,
};

const BUTTON_SHAPE = {
  normal: styles.normalShape,
  round: styles.round,
};

const Button = ({
  children,
  buttonSize = "large",
  roundButtonSize = "medium",
  buttonVariant = "normal",
  buttonShape = "normal",
  isPending = false,
  isDisabled = false,
  spinnerAriaLabel = "Processing...",
  type = "button",
  form,
  onClick,
  ...props
}: ButtonProps) => {
 const SIZE_CLASSES: Record<
  NonNullable<ButtonProps["buttonSize"]>,
  string
> = {
  large: props.dashboard
    ? styles.largeDashboardButton
    : styles.largeButton,
  medium: props.dashboard
    ? styles.mediumDashboardButton
    : styles.mediumButton,
  small: props.dashboard
    ? styles.smallDashboardButton
    : styles.smallButton,
  tiny: props.dashboard
    ? styles.tinyDashboardButton
    : styles.tinyButton,
};

const sizeClass =
  buttonShape === "round"
    ? ""
    : SIZE_CLASSES[buttonSize];

const ROUND_SIZE_CLASSES: Record<
  NonNullable<ButtonProps["roundButtonSize"]>,
  string
> = {
  large: props.dashboard
    ? styles.roundLargeDashboard
    : styles.roundLarge,
  medium: styles.roundMedium,
  small: styles.roundSmall,
};  

const roundButtonClass =
  buttonShape === "round"
    ? ROUND_SIZE_CLASSES[roundButtonSize]
    : "";

  return (
    <ReactAriaButton
      className={`${roundButtonClass} ${sizeClass} ${styles.button} ${
        BUTTON_VARIANT[buttonVariant] || ""
      } ${BUTTON_SHAPE[buttonShape] || ""} ${props.className || ""}`}
      type={type}
      form={form}
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
      slot={props.slot}
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
