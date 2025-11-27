import Image from "../Image";
import styles from "./VehicleMakeCard.module.scss";
import Checkbox from "../Checkbox";

interface VehicleMakeProps {
  name: string;
  logo: string;
}
const VehicleMake = ({ name, logo }: VehicleMakeProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.checkboxContainer}>
        <Checkbox
          id="1"
          label=""
          isFeed={false}
          checkedColour="#14d6ff"
          hoverColour="#ffff"
          checkedHovered="#ccf6ff"
        />
      </div>
      {logo && (
        <Image
          src={logo}
          alt={`${name} logo`}
          width={200}
          height={200}
          style={{ objectFit: "contain" }}
        />
      )}

      <div className={styles.text}>{name}</div>
    </div>
  );
};

export default VehicleMake;
