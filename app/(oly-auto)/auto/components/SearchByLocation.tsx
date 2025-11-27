import Select from "@/components/Select";
import styles from "./SearchByLocation.module.scss";
import { locations } from "@/data/LocationData";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
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
          name="province"
          id="province"
          ariaLabel="Province"
          autoFocus={false}
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
          name="city"
          ariaLabel="City"
          disabled={false}
          autoFocus={false}
          required={false}
        />
      </div>

      <div className={styles.field}>
        <Select
          options={locations[0].suburb}
          initialValue="Select your suburb"
          selectSize="large"
          label="Suburb"
          name="suburb"
          id="suburb"
          ariaLabel="Suburb"
          disabled={false}
          autoFocus={false}
          required={false}
        />
      </div>

      <div className={styles.field}>
        <Button
          buttonChildren="Search"
          className={styles.search}
          buttonType="primary"
          buttonSize="large"
          name="Search Button"
          type="submit"
          ariaLabel="Search Button"
          autoFocus={false}
          disabled={false}
        /> 
      </div>
    </div>
  );
};

export default Location;
