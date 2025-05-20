import PreferencesComponent from "./components/Preferences";
import styles from "./styles.module.scss";
import { preferencesData } from "@/data/PreferencesData";
const PreferencesPage = () => {
  return (
    <main className={styles.container}>
        <h1 className={styles.title}>Preferences</h1>
      <section className={styles.preferencesContainer}>
        <PreferencesComponent />
      </section>
    </main>
  );
};

export default PreferencesPage;

