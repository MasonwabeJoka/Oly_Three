import BulletPoint from "../BulletPoint";
import Checkbox from "../Checkbox";
import Image from "../Image";
import styles from "./VehicleTrimCard.module.scss";

interface VehicleTrimCardProps {
  image: string;
  trimName: string;
  engine: string;
  transmission: string;
  fuelType: string;
  driveType: string;
  trimLevel: string;
  bodyStyle: string;
  power: string;
  torque: string;
  features: string[];
  yearRange: string;
}

const VehicleTrimCard = ({ image, trimName, engine, transmission, fuelType, driveType, trimLevel, bodyStyle, power, torque, features, yearRange }: VehicleTrimCardProps) => {
  

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
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          {image && (
            <Image
              src={image}
              alt={trimName}
              fill
              style={{ objectFit: "cover", borderRadius: "2.5rem" }}
            />
          )}
        </div>
        <div className={styles.details}>

          <p className={styles.trimName}>{trimName}</p>

          <ul className={styles.trimDetails}>
            <>
              <li className={`${styles.detail} ${styles.engine}`}>
                <BulletPoint />

                <p>{engine}</p>
              </li>
              <li className={`${styles.detail} ${styles.transmission}`}>
                <BulletPoint />

                <p>{transmission}</p>
              </li>
              <li className={`${styles.detail} ${styles.fuelType}`}>
                <BulletPoint />

                <p>{fuelType}</p>
              </li>
              <li className={`${styles.detail} ${styles.driveType}`}>
                <BulletPoint />

                <p>{driveType}</p>
              </li>
              <li className={`${styles.detail} ${styles.trimLevel}`}>
                <BulletPoint />

                <p>{trimLevel}</p>
              </li>
            </>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VehicleTrimCard;
