"use client";
import styles from "./VehicleCondition.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Select from "@/components/Select";
import Button from "@/components/Buttons";

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
        name="exterior"
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
        autoFocus={false}
        required={false}
        onChange={handleChange}
        value={null}
      />

      <Select
        id="interior"
        name="interior"
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
        autoFocus={false}
        required={false}
        onChange={handleChange}
        value={null}
      />

      <Select
        id="tyres"
        name="tyres"
        label="Tyres"
        options={[
          { label: "New", value: "new" },
          { label: "Good", value: "good" },
          { label: "Worn", value: "worn" },
        ]}
        initialValue="Tyres Condition"
        selectSize="large"
        ariaLabel="Tyres Condition"
        autoFocus={false}
        required={false}
        onChange={handleChange}
        value={null}
      />

      <Select
        id="modifications"
        name="modifications"
        label="Modified"
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        initialValue="Any Modifications"
        selectSize="large"
        ariaLabel="Modifications"
        autoFocus={false}
        required={false}
        onChange={handleChange}
        value={null}
      />

      <Select
        id="accidents"
        name="accidents"
        label="Accidents"
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        initialValue="Any Accidents"
        selectSize="large"
        ariaLabel="Accidents"
        autoFocus={false}
        required={false}
        onChange={handleChange}
        value={null}
      />

      <Select
        id="serviceHistory"
        name="serviceHistory"
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
        autoFocus={false}
        required={false}
        onChange={handleChange}
        value={null}
      />

      <Button
        type="button"
        onClick={handleNext}
        buttonChildren="Next"
        buttonSize="large"
        buttonType="primary"
        autoFocus={false}
        disabled={false}
        name="next"
        ariaLabel="Next"
      />
    </div>
  );
};

export default VehicleCondition;
