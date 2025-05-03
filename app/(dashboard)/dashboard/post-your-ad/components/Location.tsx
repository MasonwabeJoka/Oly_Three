"use client";
import styles from "./Location.module.scss";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { locations } from "@/data/LocationData";
import { FormWrapper } from "./FormWrapper";
import { useFormContext } from "react-hook-form";
import  { FormDataSchema}  from "../validations/formDataSchema";

const Location = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormDataSchema>();

  return (
    <FormWrapper title="Location">
      <div className={styles.container}>
        <div className={styles.selects}>
          <div className={styles.select}>
            <Select
              options={locations[0].provinces}
              initialValue="Select your province"
              selectSize="large"
              selectColourType="normal"
              label="Province"
              id="province"
              ariaLabel="Province"
              autoFocus={false}
              required={false}
              multiple={false}
              dashboard
              error={errors.location?.province?.message }
              {...register("location.province")}
            />
          </div>
          <div className={styles.select}>
            <Select
              options={locations[0].city}
              initialValue="Select your city"
              selectSize="large"
              label="City"
              id="city"
              ariaLabel="City"
              disabled={false}
              autoFocus={false}
              required={false}
              dashboard
              error={errors.location?.city?.message}
              {...register("location.city")}
            />
          </div>
          <div className={styles.select}>
            <Select
              options={locations[0].suburb}
              initialValue="Select your suburb"
              selectSize="large"
              label="Suburb"
              id="suburb"
              ariaLabel="Suburb"
              disabled={false}
              autoFocus={false}
              required={false}
              dashboard
              error={errors.location?.suburb?.message}
              {...register("location.suburb")}
            />
          </div>
          <div className={styles.select}>
            <Input
              className={styles.suburb}
              inputType="text"
              inputSize="large"
              placeholder="You can add more here"
              label="Custom Location"
              id="customLocation"
              ariaLabel="Custom Location Field"
              autoFocus={false}
              autoComplete="on"
              disabled={false}
              required={true}
              dashboard
              error={errors.location?.customLocation?.message}
              {...register("location.customLocation")}
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};
export default Location;





