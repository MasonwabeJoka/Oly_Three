import styles from "./Pill.module.scss";

interface Styles {
  child: string;
  colour: string;
  textColour?: string;
  boxShadow?: string;
  shadow?: boolean;
}

const Pill = ({ child, colour, shadow, textColour = "#434b4d", boxShadow = `0px 1px 3px 0px rgba(180, 191, 203, 0.2),
0px 5px 5px 0px rgba(180, 191, 203, 0.17),
0px 11px 7px 0px rgba(180, 191, 203, 0.1),
0px 20px 8px 0px rgba(180, 191, 203, 0.03),
0px 30px 9px 0px rgba(180, 191, 203, 0)`}: Styles) => {

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: colour,
        cursor: "pointer",
        color: textColour,
        boxShadow: shadow ? boxShadow : "none",
      }}
    >
      {child}
    </div>
  );
};

export default Pill;
