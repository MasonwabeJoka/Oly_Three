import styles from "./Pill.module.scss";

interface Styles {
  child: string;
  colour: string;
}

const Pill = ({ child, colour }: Styles) => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: colour,
      }}
    >
      {child}
    </div>
  );
};

export default Pill;
