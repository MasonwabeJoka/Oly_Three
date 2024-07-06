import PreferencesCard from "@/components/cards/PreferencesCard";
import styles from "./styles.module.scss";
import { preferencesData } from "@/data/PreferencesData";

const Preferences = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Preferences</h1>
      <section className={styles.preferencesContainer}>
        {preferencesData.map((preference) => (
          <PreferencesCard
            key={preference.id}
            preferenceCategory={preference.preferenceCategory}
            preferences={preference.preferences}
          />
        ))}
      </section>
    </main>
  );
};

export default Preferences;
