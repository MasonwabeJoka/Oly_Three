"use client";
import styles from "./Location.module.scss";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { locations } from "@/data/LocationData";
import { FormWrapper } from "./FormWrapper";
import { useFormContext } from "react-hook-form";
import { FormDataSchema } from "../validations/formDataSchema";
import { useState } from "react";

interface Props {
  onNext: () => void;
}
const Location = ({ onNext }: Props) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isSuburbOpen, setIsSuburbOpen] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext<FormDataSchema>();

  return (
    <FormWrapper selectOpen={isLocationOpen || isCityOpen || isSuburbOpen}>
      <div className={styles.container}>
        <h2 className={styles.title}>Location</h2>
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
              error={errors.location?.province?.message}
              {...register("location.province")}
              onOpenChange={(isOpen) => setIsLocationOpen(isOpen)}
            />
          </div>
          {!isLocationOpen && (
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
                onOpenChange={(isOpen) => setIsCityOpen(isOpen)}
              />
            </div>
          )}
          {!isLocationOpen && !isCityOpen && (
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
                onOpenChange={(isOpen) => setIsSuburbOpen(isOpen)}
              />
            </div>
          )}
          {!isLocationOpen && !isCityOpen && !isSuburbOpen && (
            <div className={styles.select}>
              <Input
                className={styles.addMore}
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
          )}
        </div>
      </div>
    </FormWrapper>
  );
};
export default Location;
