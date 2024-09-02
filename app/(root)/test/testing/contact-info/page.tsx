"use client";

import { useRouter } from "next/navigation";
import { useFormStore } from "../store/useFormStore";

export default function PersonalInfo() {
  const router = useRouter();
  const { name, updateName, nextStep } = useFormStore();

  const handleNext = () => {
    nextStep();
    router.push("/contact-info");
  };

  return (
    <div>
      <h1>Personal Information</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => updateName(e.target.value)}
          />
        </label>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}
