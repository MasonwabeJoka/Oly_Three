
import styles from "./layout.module.scss";


export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = {};
  return (
    <div>
      <div className={styles.children}>{children}</div>
    </div>
  );
}
