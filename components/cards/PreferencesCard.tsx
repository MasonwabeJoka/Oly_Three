"use client";
import { useState } from "react";
import styles from "./PreferencesCard.module.scss";
import RadioButton from "@/components/RadioButton";

const PreferencesCard = ({ preferenceCategory, preferences }: any) => {
  const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>(
    preferences.reduce((acc: any, curr: any) => {
      acc[curr.preferenceType] = curr.selectedValue;
      return acc;
    }, {})
  );

  const handleRadioChange = (preferenceType: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [preferenceType]: event.target.value,
    }));
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.preferenceCategory}>{preferenceCategory}</h2>
      <div className={styles.cardWrapper}>
        {preferences.map((preference: any) => (
          <fieldset key={preference.id}>
            <legend className={styles.preferenceType}>{preference.preferenceType}</legend>
            <div className={styles.preferencesContainer}>
              <p className={styles.preference}>{preference.preference}</p>
              <div className={styles.options}>
                {preference.options.map((option: any) => (
                  <div className={styles.option} key={option.id}>
                    <RadioButton
                      label={option.label}
                      name={preference.preferenceType} // Group by preference type
                      id={`${preference.id}-${option.id}`}
                      value={option.value}
                      checked={selectedValues[preference.preferenceType] === option.value}
                      minWidth={option.minWidth}
                      onChange={(e) => handleRadioChange(preference.preferenceType, e)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </fieldset>
        ))}
      </div>
    </section>
  );
};

export default PreferencesCard;
