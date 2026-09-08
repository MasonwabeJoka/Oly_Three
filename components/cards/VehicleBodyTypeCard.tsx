import Button from "../Button";
import Checkbox from "../Checkbox";
import Image from "../Image";
import styles from "./VehicleBodyTypeCard.module.scss";

interface VehicleBodyTypeCardProps {
  name: string;
  image: string;
  province: string;
  city: string;
  make: string;
}

const VehicleBodyTypeCard = ({
  name,
  image,
  make,
}: VehicleBodyTypeCardProps) => {
  const province = "Kwa-Zulu Natal";
  const city = "Durban";

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
              alt={name}
              fill
              style={{ objectFit: "cover", borderRadius: "4rem" }}
            />
          )}
        </div>
        <div className={styles.details}>
          <p className={styles.bodyType}>{`${make} ${name}s`}</p>
          <div className={styles.buttonContainer}>
            <Button
              className={`${styles.button} ${styles.all}`}
              children={
                <p className={styles.buttonChildren}>
                  {`All ${name}s`} <span className={styles.count}>9,000+</span>
                </p>
              }
              buttonVariant="normal"
              buttonSize="small"


              ariaLabel="View Button"


            />
            <Button
              className={styles.button}
              children={
                <p className={styles.buttonChildren}>
                  {province}
                  <span className={styles.count}>852</span>
                  {/* <span className={styles.count}>4,582</span> */}
                </p>
              }
              buttonVariant="normal"
              buttonSize="small"


              ariaLabel="View Button"


            />
            <Button
              className={styles.button}
              children={
                <p className={styles.buttonChildren}>
                  {city}
                  <span className={styles.count}>52</span>
                </p>
              }
              buttonVariant="normal"
              buttonSize="small"


              ariaLabel="View Button"


            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ButtonChildren = ({ name }: VehicleBodyTypeCardProps) => {
  return <></>;
};

export default VehicleBodyTypeCard;
