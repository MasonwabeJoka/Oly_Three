"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const VehicleDescription = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");

  const handleNext = () => router.push("/sell/seller");

  return (
    <main>
      <h1>Vehicle Description & Price</h1>

      <label>
        Description
        <textarea
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          placeholder="Include features, service history, upgrades..."
        />
      </label>

      <label>
        Asking Price (ZAR)
        <input
          type="number"
          value={price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrice(Number(e.target.value))
          }
        />
      </label>

      <button
        type="button"
        onClick={handleNext}
        disabled={!description || !price}
      >
        Next
      </button>
    </main>
  );
};

export default VehicleDescription;
