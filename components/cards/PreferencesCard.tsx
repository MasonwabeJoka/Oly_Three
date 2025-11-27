"use client";
import styles from "./PreferencesCard.module.scss";
import RadioButton from "@/components/RadioButton";
import { PreferenceCategory } from "./../../app/(dashboard)/dashboard/settings/preferences/types";

type PreferencesCardProps = {
  preferenceCategory: string;
  preferences: PreferenceCategory['preferences'];
  onChange: (preferenceId: number, value: string) => void;
};

const PreferencesCard = ({ preferenceCategory, preferences, onChange }: PreferencesCardProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.cardWrapper}>
      <h2 className={styles.preferenceCategory}>{preferenceCategory}</h2>
        {preferences.map((preference) => (
          <fieldset key={preference.id}>
            <legend className={styles.preferenceType}>
              {preference.preferenceType}
            </legend>
            <div className={styles.preferencesContainer}>
              <p className={styles.preference}>{preference.preference}</p>
              <div className={styles.options}>
                <div className={styles.option}>
                  <RadioButton
                    className={styles.radioButton}
                    name={`${preferenceCategory}-${preference.id}`}
                    labelSide="right"
                    options={preference.options.map((opt) => ({ value: opt.value, label: opt.label }))}
                    selectedValue={preference.selectedValue}
                    onChange={(value: string) => onChange(preference.id, value)}
                  />
                </div>
              </div>
            </div>
          </fieldset>
        ))}
      </div>
    </section>
  );
};

export default PreferencesCard;