import styles from "./layout.module.scss";
export const metadata = {
  title: "Oly Dashboard",
  description: "Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
