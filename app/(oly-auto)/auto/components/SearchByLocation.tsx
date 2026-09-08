import Select from "@/components/Select";
import styles from "./SearchByLocation.module.scss";
import { locations } from "@/data/LocationData";
import Input from "@/components/Input";
import Button from "@/components/Button";
interface LocationProps {}

const Location = ({}: LocationProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <Select
          options={locations[0].provinces}
          initialValue="Select your province"
          selectSize="large"
          selectColourType="normal"
          label="Province"

          id="province"
          ariaLabel="Province"

          required={false}
        />
      </div>

      <div className={styles.field}>
        <Select
          options={locations[0].city}
          initialValue="Select your city"
          selectSize="large"
          label="City"
          id="city"

          ariaLabel="City"


          required={false}
        />
      </div>

      <div className={styles.field}>
        <Select
          options={locations[0].suburb}
          initialValue="Select your suburb"
          selectSize="large"
          label="Suburb"

          id="suburb"
          ariaLabel="Suburb"


          required={false}
        />
      </div>

      <div className={styles.field}>
        <Button
          children="Search"
          className={styles.search}
          buttonVariant="primary"
          buttonSize="large"

          type="submit"
          ariaLabel="Search Button"


        /> 
      </div>
    </div>
  );
};

export default Location;
