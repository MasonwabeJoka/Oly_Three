"use client";
import styles from "./VehicleCondition.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Select from "@/components/Select";
import Button from "@/components/Button";

const VehicleCondition = () => {
  const router = useRouter();
  const [condition, setCondition] = useState({
    exterior: "",
    interior: "",
    tyres: "",
    modifications: "",
    accidents: false,
    serviceHistory: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = target instanceof HTMLInputElement ? target.checked : false;
    setCondition((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => router.push("/sell/photos");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vehicle Condition</h1>

      <Select
        id="exterior"

        label="Exterior"
        options={[
          { label: "Excellent", value: "excellent" },
          { label: "Good", value: "good" },
          { label: "Fair", value: "fair" },
          { label: "Poor", value: "poor" },
        ]}
        initialValue="Exterior Condition"
        selectSize="large"
        ariaLabel="Exterior Condition"

        required={false}
        onChange={handleChange}
        value={null}
      />

      <Select
        id="interior"

        label="Interior"
        options={[
          { label: "Excellent", value: "excellent" },
          { label: "Good", value: "good" },
          { label: "Fair", value: "fair" },
          { label: "Poor", value: "poor" },
        ]}
        initialValue="Interior Condition"
        selectSize="large"
        ariaLabel="Interior Condition"

        required={false}
        onChange={handleChange}
        value={null}
      />

      <Select
        id="tyres"

        label="Tyres"
        options={[
          { label: "New", value: "new" },
          { label: "Good", value: "good" },
          { label: "Worn", value: "worn" },
        ]}
        initialValue="Tyres Condition"
        selectSize="large"
        ariaLabel="Tyres Condition"

        required={false}
        onChange={handleChange}
        value={null}
      />

      <Select
        id="modifications"

        label="Modified"
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        initialValue="Any Modifications"
        selectSize="large"
        ariaLabel="Modifications"

        required={false}
        onChange={handleChange}
        value={null}
      />

      <Select
        id="accidents"

        label="Accidents"
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        initialValue="Any Accidents"
        selectSize="large"
        ariaLabel="Accidents"

        required={false}
        onChange={handleChange}
        value={null}
      />

      <Select
        id="serviceHistory"

        label="Service History"
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
          { label: "Partial", value: "partial" },
          { label: "Not sure", value: "unsure" },
        ]}
        initialValue="Service History"
        selectSize="large"
        ariaLabel="Service History"

        required={false}
        onChange={handleChange}
        value={null}
      />

      <Button

        onClick={handleNext}
        children="Next"
        buttonSize="large"
        buttonVariant="primary"



        ariaLabel="Next"
      />
    </div>
  );
};

export default VehicleCondition;
