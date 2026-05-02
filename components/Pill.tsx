import { useState } from "react";
import styles from "./Pill.module.scss";
import Icon from "./Icon";

// Assuming these props are passed to your component
interface Props {
  colour?: string;
  textColour?: string;
  textCase?: "uppercase" | "lowercase" | "capitalize" | "none";
  shadow: boolean;
  boxShadow?: string;
  withBorder?: boolean;
  borderStyle?: string;
  child: React.ReactNode;
  hoverColour?: string; // Optional hover background color
  hoverTextColour?: string; // Optional hover text color
  cancelButton?: boolean;
}

const shadowOne =
  "0px 1px 3px 0px rgba(180, 191, 203, 0.2), " +
  "0px 5px 5px 0px rgba(180, 191, 203, 0.17), " +
  "0px 11px 7px 0px rgba(180, 191, 203, 0.1), " +
  "0px 20px 8px 0px rgba(180, 191, 203, 0.03), " +
  "0px 30px 9px 0px rgba(180, 191, 203, 0)";

const Pill = ({
  colour = "#f9fcfd",
  textColour,
  textCase = "uppercase",
  shadow = false,
  boxShadow = shadowOne,
  withBorder = false,
  borderStyle = "1px solid #e4e6e7",
  child,
  hoverColour = "#14d6ff",
  hoverTextColour = "#ffffff",
  cancelButton = false,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: isHovered ? hoverColour : colour,
        cursor: "pointer",
        color: isHovered ? hoverTextColour : textColour,
        textTransform: textCase,
        boxShadow: shadow ? boxShadow : "none",
        border: withBorder ? borderStyle : "none",
        padding: "0.6rem 0.8rem",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>{child}</div>
      {cancelButton && (
        <div
          className={styles.cancelButton}
          style={{
            backgroundColor: isHovered ? "#e9fcff" : "#e4e6e7",
          }}
        >
          <Icon
            src="/icons/x.png"
            alt="Close chat icon"
            width={12}
            height={12}
          />
        </div>
      )}
    </div>
  );
};

export default Pill;
