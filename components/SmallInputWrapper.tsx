import Input from "./Input";
import styles from "./SmallInputWrapper.module.scss";
import { ComponentProps } from "react";

interface SmallInputWrapperProps extends ComponentProps<typeof Input> {
  wrapperSize: "large" | "medium" | "small" | "xLarge";
  wrapperClass?: string;
  inputPosition?: "left" | "right" | "center";
}

const SmallInputWrapper = ({
  className,
  wrapperSize,
  wrapperClass,
  inputPosition,
  error,
  ...props
}: SmallInputWrapperProps) => {
  const dashboard = props.dashboard;

  let sizeClass = "";
  switch (wrapperSize) {
    case "medium":
      sizeClass = !dashboard ? styles.mediumInput : styles.mediumDashboardInput;
      break;
    case "small":
      sizeClass = !dashboard ? styles.smallInput : styles.smallDashboardInput;
      break;
    case "xLarge":
      sizeClass = !dashboard ? styles.xLargeInput : styles.xLargeDashboardInput;
      break;
    default:
      sizeClass = !dashboard ? styles.largeInput : styles.largeDashboardInput;
  }

  const positionClass = {
    display: "flex",
    justifyContent:
      inputPosition === "left"
        ? "flex-start"
        : inputPosition === "right"
          ? "flex-end"
          : "center",
  };

  const wrapperClasses = `${sizeClass} ${wrapperClass} ${styles.wrapper}`;

  return (
    <div className={styles.container}>
      {error && (
        <p className={`${styles.errorMessage}`} role="alert" aria-live="polite">
          {error}
        </p>
      )}
      <div className={wrapperClasses} style={positionClass}>
        <Input
          {...props}
          className={`${styles.input} ${props.className || ""}`}
        />
      </div>
    </div>
  );
};

export default SmallInputWrapper;
