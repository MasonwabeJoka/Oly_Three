
"use client";
import { useState } from "react";
import styles from "./PropertiesHeroSectionFieldsClient.module.scss";
import HeroSectionStepOne from "./HeroSectionStepOne";
import HeroSectionStepTwo from "./HeroSectionStepTwo";

export default function PropertiesHeroSectionFieldsClient() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className={styles.container}>
      {!showAdvanced ? (
        <HeroSectionStepOne onClick={() => setShowAdvanced(true)} />
      ) : (
        <HeroSectionStepTwo onClick={() => setShowAdvanced(false)} />
      )}
    </div>
  );
}